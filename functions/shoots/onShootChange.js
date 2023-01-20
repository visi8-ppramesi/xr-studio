const functions = require("firebase-functions");
const {admin} = require("../utils/initializeFirebase");

const db = admin.firestore();

exports.onShootChange = functions
    .region("asia-southeast2")
    .firestore
    .document("/shoots/{shootId}")
    .onUpdate((snap, ctx) => {
      const isEqual = require("lodash/isEqual");
      const {status, location} = snap.after.data();
      const {status: oldStatus, location: oldLocation} = snap.before.data();
      const shootId = ctx.params.shootId;

      const shootRef = db
          .collection("shoots")
          .doc(shootId);

      if (!isEqual(status, oldStatus) || location != oldLocation) {
        return db.runTransaction((t) => {
          return t.get(
              db
                  .collection("calendar")
                  .where("event_id", "==", shootRef),
          ).then((innerSnap) => {
            Object.values(innerSnap.docs).forEach((doc) => {
              const myRef = doc.ref;
              t.set(myRef, {
                event: {
                  status,
                  location,
                },
              }, {merge: true});
            });
          });
        });
      } else {
        return Promise.resolve(true);
      }
    });

exports.onProcedureCreate = functions
    .region("asia-southeast2")
    .firestore
    .document("/shoots/{shootId}/procedures/{procedureId}")
    .onCreate(async (snap, ctx) => {
      const {procedureId, shootId} = ctx.params;
      const shootRef = db.collection("shoots").doc(shootId);
      const shootRes = await shootRef.get();
      const shootStatus = shootRes.get("status") || ["initialized", "unpaid"];
      const procedure = snap.data();
      const calendarPromise = db
          .collection("calendar")
          .doc(procedureId)
          .set({
            start_date: procedure.procedure_start,
            end_date: procedure.procedure_end,
            event_id: shootRef,
            event: {
              location: "main-location",
              status: shootStatus,
            },
          });

      return calendarPromise;
    });

exports.onProcedureDelete = functions
    .region("asia-southeast2")
    .firestore
    .document("/shoots/{shootId}/procedures/{procedureId}")
    // eslint-disable-next-line no-unused-vars
    .onDelete((snap, ctx) => {
      const {procedureId} = ctx.params;
      return db
          .collection("calendar")
          .doc(procedureId)
          .delete();
    });
