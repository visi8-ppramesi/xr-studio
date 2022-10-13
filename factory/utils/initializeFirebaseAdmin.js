const admin = require("firebase-admin");
const dotenv = require("dotenv")
dotenv.config()

const serviceAccount = require(`../creds/${process.env.CRED_FILE_NAME}`)
const config = {
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'comics-77200.appspot.com'
}
admin.initializeApp(config);
exports.admin = admin;