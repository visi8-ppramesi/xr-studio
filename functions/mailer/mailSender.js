const functions = require("firebase-functions");
const {admin} = require("../utils/initializeFirebase");
const sanitizeHtml = require("sanitize-html");
const crypto = require("crypto");
const config = require("./config");

exports.mailSender = functions
    .region("asia-southeast2")
    .runWith({
      maxInstances: 5,
    })
    .https
    .onCall(async (data, context) => {
      const ipAddress = context.rawRequest.ip;
      const rightMeow = Math.round(new Date() / (1000 * 60)).toString();
      const ipNowHash = crypto.createHash("md5").update(ipAddress + rightMeow).digest("base64");
      const db = admin.firestore();
      const limiterSnapPromise = db
          .collection(config.mailCollection)
          .where("limiter_hash", "==", ipNowHash)
          .get();

      const userRoleSnapPromise = db
          .collection("user_roles")
          .doc(context.auth.uid)
          .get();

      const [limiterSnap, userRoleSnap] = await Promise.all([limiterSnapPromise, userRoleSnapPromise]);
      const roles = userRoleSnap.get("roles");

      if (limiterSnap.empty || (roles && Array.isArray(roles) && roles.includes("admin"))) {
        const {subject, text, email, name, html} = data;
        const emailObj = {
          limiter_hash: ipNowHash,
          from: `${name} <${email}>`,
          replyTo: email,
          message: {
            subject: subject,
            text: text,
          },
        };
        if (html) {
          emailObj.message.html = sanitizeHtml(html);
        }
        const result = await db
            .collection(config.mailCollection)
            .add(emailObj);

        return result;
      } else {
        throw new functions.https.HttpsError("limiter-error", "You are only allowed to send contact us email every 60 seconds!");
      }
    });
