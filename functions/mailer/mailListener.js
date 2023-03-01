/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const admin = require("firebase-admin");
const {FieldValue, Timestamp} = require("firebase-admin/firestore");
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const logs = require("./logs");
const config = require("./config");
const Templates = require("./templates");
const {setSmtpCredentials} = require("./helpers");

logs.init();

let db;
let transport;
let templates;
let initialized = false;

/**
  * Initializes Admin SDK & SMTP connection if not already initialized.
  */
async function initialize() {
  if (initialized === true) return;
  initialized = true;
  admin.initializeApp(functions.config().firebase);
  db = admin.firestore();
  transport = await transportLayer();
  if (config.templatesCollection) {
    templates = new Templates(
        admin.firestore().collection(config.templatesCollection),
    );
  }
}

async function transportLayer() {
  if (config.testing) {
    return nodemailer.createTransport({
      host: "localhost",
      port: 8132,
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  return setSmtpCredentials(config);
}

function validateFieldArray(field, array = []) {
  if (!Array.isArray(array)) {
    throw new Error(`Invalid field "${field}". Expected an array of strings.`);
  }

  if (array.find((item) => typeof item !== "string")) {
    throw new Error(`Invalid field "${field}". Expected an array of strings.`);
  }
}

function getExpireAt(startTime) {
  const now = startTime.toDate();
  const value = config.TTLExpireValue;
  switch (config.TTLExpireType) {
    case "hour":
      now.setHours(now.getHours() + value);
      break;
    case "day":
      now.setDate(now.getDate() + value);
      break;
    case "week":
      now.setDate(now.getDate() + value);
      break;
    case "month":
      now.setMonth(now.getMonth() + value);
      break;
    case "year":
      now.setFullYear(now.getFullYear() + value);
      break;
  }
  return Timestamp.fromDate(now);
}

async function preparePayload(payload) {
  const {template} = payload;

  if (templates && template) {
    if (!template.name) {
      throw new Error("Template object is missing a 'name' parameter.");
    }

    const templateRender = await templates.render(template.name, template.data);

    const mergeMessage = payload.message || {};

    const attachments = templateRender.attachments ?
       templateRender.attachments :
       mergeMessage.attachments;

    payload.message = Object.assign(mergeMessage, templateRender, {
      attachments: attachments || [],
    });
  }

  let to = [];
  let cc = [];
  let bcc = [];

  if (typeof payload.to === "string") {
    to = [payload.to];
  } else if (payload.to) {
    validateFieldArray("to", payload.to);
    to = to.concat(payload.to);
  }

  if (typeof payload.cc === "string") {
    cc = [payload.cc];
  } else if (payload.cc) {
    validateFieldArray("cc", payload.cc);
    cc = cc.concat(payload.cc);
  }

  if (typeof payload.bcc === "string") {
    bcc = [payload.bcc];
  } else if (payload.bcc) {
    validateFieldArray("bcc", payload.bcc);
    bcc = bcc.concat(payload.bcc);
  }

  if (!payload.toUids && !payload.ccUids && !payload.bccUids) {
    payload.to = to;
    payload.cc = cc;
    payload.bcc = bcc;

    return payload;
  }

  if (!config.usersCollection) {
    throw new Error("Must specify a users collection to send using uids.");
  }

  let uids = [];

  if (payload.toUids) {
    validateFieldArray("toUids", payload.toUids);
    uids = uids.concat(payload.toUids);
  }

  if (payload.ccUids) {
    validateFieldArray("ccUids", payload.ccUids);
    uids = uids.concat(payload.ccUids);
  }

  if (payload.bccUids) {
    validateFieldArray("bccUids", payload.bccUids);
    uids = uids.concat(payload.bccUids);
  }

  const toFetch = {};
  uids.forEach((uid) => (toFetch[uid] = null));

  const documents = await db.getAll(
      ...Object.keys(toFetch).map((uid) =>
        db.collection(config.usersCollection).doc(uid),
      ),
      {
        fieldMask: ["email"],
      },
  );

  const missingUids = [];

  documents.forEach((documentSnapshot) => {
    if (documentSnapshot.exists) {
      const email = documentSnapshot.get("email");

      if (email) {
        toFetch[documentSnapshot.id] = email;
      } else {
        missingUids.push(documentSnapshot.id);
      }
    } else {
      missingUids.push(documentSnapshot.id);
    }
  });

  logs.missingUids(missingUids);

  if (payload.toUids) {
    payload.toUids.forEach((uid) => {
      const email = toFetch[uid];
      if (email) {
        to.push(email);
      }
    });
  }

  payload.to = to;

  if (payload.ccUids) {
    payload.ccUids.forEach((uid) => {
      const email = toFetch[uid];
      if (email) {
        cc.push(email);
      }
    });
  }

  payload.cc = cc;

  if (payload.bccUids) {
    payload.bccUids.forEach((uid) => {
      const email = toFetch[uid];
      if (email) {
        bcc.push(email);
      }
    });
  }

  payload.bcc = bcc;

  return payload;
}

async function deliver(
    ref,
) {
  const snapshot = await ref.get();
  if (!snapshot.exists) {
    return;
  }
  let payload = snapshot.data();
  // Only attempt delivery if the payload is still in a valid delivery state.
  if (!payload.delivery || payload.delivery.state !== "PROCESSING") {
    return;
  }

  logs.attemptingDelivery(ref);
  const update = {
    "delivery.attempts": FieldValue.increment(1),
    "delivery.endTime": FieldValue.serverTimestamp(),
    "delivery.error": null,
    "delivery.leaseExpireTime": null,
  };

  try {
    payload = await preparePayload(payload);

    if (!payload.to.length && !payload.cc.length && !payload.bcc.length) {
      throw new Error(
          "Failed to deliver email. Expected at least 1 recipient.",
      );
    }

    const result = await transport.sendMail(
        Object.assign(payload.message, {
          from: payload.from,
          replyTo: payload.replyTo,
          to: config.defaultTo,
          cc: payload.cc,
          bcc: payload.bcc,
          headers: payload.headers || {},
        }),
    );
    const info = {
      messageId: result.messageId || null,
      accepted: result.accepted || [],
      rejected: result.rejected || [],
      pending: result.pending || [],
      response: result.response || null,
    };

    update["delivery.state"] = "SUCCESS";
    update["delivery.info"] = info;
    logs.delivered(ref, info);
  } catch (e) {
    update["delivery.state"] = "ERROR";
    update["delivery.error"] = e.toString();
    logs.deliveryError(ref, e);
  }

  // Wrapping in transaction to allow for automatic retries (#48)
  return admin.firestore().runTransaction((transaction) => {
    // We could check state here is still PROCESSING, but we don't
    // since the email sending will have been attempted regardless of what the
    // delivery state was at that point, so we just update the state to reflect
    // the result of the last attempt so as to not potentially cause duplicate sends.
    transaction.update(ref, update);
    return Promise.resolve();
  });
}

async function processWrite(
    change,
) {
  const ref = change.after.ref;

  // A quick check to avoid doing unnecessary transaction work.
  // If the record state is SUCCESS or ERROR we don't need to do anything
  // transactionally here since these are the 'final' delivery states.
  // Note: we still check these again inside the transaction in case the state has
  // changed while the transaction was inflight.
  if (change.after.exists) {
    const payloadAfter = change.after.data();
    // The email has already been delivered, so we don't need to do anything.
    if (
      payloadAfter &&
       payloadAfter.delivery &&
       payloadAfter.delivery.state === "SUCCESS"
    ) {
      return;
    }

    // The email has previously failed to be delivered, so we can't do anything.
    if (
      payloadAfter &&
       payloadAfter.delivery &&
       payloadAfter.delivery.state === "ERROR"
    ) {
      return;
    }
  }

  const shouldAttemptDelivery = await admin
      .firestore()
      .runTransaction(async (transaction) => {
        const snapshot = await transaction.get(ref);
        // Record no longer exists, so no need to attempt delivery.
        if (!snapshot.exists) {
          return false;
        }

        const payload = snapshot.data();

        // We expect the payload to contain a message object describing the email
        // to be sent. If it doesn't, we can't do anything.
        if (typeof payload.message !== "object") {
          logs.invalidMessage(payload.message);
          return false;
        }

        // The record has most likely just been created by a client, so we need to
        // initialize the delivery state.

        if (!payload.delivery) {
          const startTime = Timestamp.fromDate(new Date());

          const delivery = {
            startTime: Timestamp.fromDate(new Date()),
            state: "PENDING",
            attempts: 0,
            error: null,
          };

          if (config.TTLExpireType && config.TTLExpireType !== "never") {
            delivery["expireAt"] = getExpireAt(startTime);
          }

          transaction.update(ref, {
            // @ts-ignore
            delivery,
          });
          // We've updated the payload, so we need to attempt delivery, but we
          // don't want to do it in this transaction. Since the transaction will
          // update the record again the cloud function will be triggered again
          // and delivery will be attempted at that point.
          return false;
        }

        // The email has already been delivered, so we don't need to do anything.
        if (payload.delivery.state === "SUCCESS") {
          return false;
        }

        // The email has previously failed to be delivered, so we can't do anything.
        if (payload.delivery.state === "ERROR") {
          return false;
        }

        if (payload.delivery.state === "PROCESSING") {
          if (payload.delivery.leaseExpireTime.toMillis() < Date.now()) {
            // The lease has expired, so we should not attempt to deliver the email again,
            // but we set the state to ERROR so clients can see that the email failed.
            transaction.update(ref, {
              "delivery.state": "ERROR",
              // Keeping error to avoid any breaking changes in the next minor update.
              // Error to be removed for the next major release.
              "delivery.error": "Message processing lease expired.",
            });
          }
          // Already being processed, so we don't need to do anything.
          return false;
        }

        if (payload.delivery.state === "PENDING") {
          // We can attempt to deliver the email in these states, so we set the state to PROCESSING
          // and set a lease time to prevent delivery from being attempted forever.
          transaction.update(ref, {
            "delivery.state": "PROCESSING",
            "delivery.leaseExpireTime": Timestamp.fromMillis(Date.now() + 60000),
          });
          return true;
        }

        if (payload.delivery.state === "RETRY") {
          // We can attempt to deliver the email in these states, so we set the state to PROCESSING
          // and set a lease time to prevent delivery from being attempted forever.
          transaction.update(ref, {
            "delivery.state": "PROCESSING",
            "delivery.leaseExpireTime": Timestamp.fromMillis(Date.now() + 60000),
          });
          return true;
        }

        // We don't know what the state is, so we can't do anything. This should never happen.
        return false;
      });

  if (shouldAttemptDelivery) {
    await deliver(ref);
  }
}

exports.processQueue = functions
    .runWith({
      secrets: [
        "SMTP_PASSWORD",
      ],
    })
    .firestore
    .region("asia-southeast2")
    .document(config.mailCollection)
    .onWrite(
        async (
            change,
        ) => {
          await initialize();
          logs.start();

          try {
            await processWrite(change);
          } catch (err) {
            logs.error(err);
            return null;
          }

          logs.complete();
        },
    );
