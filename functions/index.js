const {onShootChange, onProcedureCreate, onProcedureDelete} = require("./shoots/onShootChange");
exports.onShootChange = onShootChange;
exports.onProcedureCreate = onProcedureCreate;
exports.onProcedureDelete = onProcedureDelete;

const {onCreateUser} = require("./auth/onCreateUser");
const {onDeleteUser} = require("./auth/onDeleteUser");
exports.onCreateUser = onCreateUser;
exports.onDeleteUser = onDeleteUser;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
