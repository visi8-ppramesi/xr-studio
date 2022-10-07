const admin = require("firebase-admin");

if(process.env.USE_DOTENV == 'true'){
    const dotenv = require("dotenv")
    dotenv.config()
}

if(process.env.MODE == 'development'){
    const serviceAccount = require(`../creds/${process.env.CRED_FILE_NAME}`)
    const config = {
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'comics-77200.appspot.com'
    }
    admin.initializeApp(config);
}else if(process.env.MODE == 'production'){
    admin.initializeApp();
}

exports.admin = admin;