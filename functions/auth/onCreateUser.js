const functions = require("firebase-functions");
const {admin} = require("../utils/initializeFirebase");

const db = admin.firestore();

exports.onCreateUser = functions
    .region("asia-southeast2")
    .auth
    .user()
    .onCreate((user) => {
      const uid = user.uid;
      const setRolePromise = db.collection("user_roles").doc(uid).set({roles: ["user", "client"]});
      const setEmailVerified = db.collection("users")
          .doc(uid)
          .set({email_verified_at: null}, {merge: true});
      const counterUpdate = db.collection("settings").doc("user_counter")
          .update({value: admin.firestore.FieldValue.increment(1)});
      return Promise.all([setRolePromise, setEmailVerified, counterUpdate]);
    });
