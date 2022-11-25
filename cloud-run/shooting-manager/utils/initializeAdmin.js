"use strict";

const admin = require("firebase-admin");
if(process.env.USE_DOTENV == 'true'){
    const dotenv = require("dotenv")
    dotenv.config()
}

if(process.env.MODE == 'development'){
    const serviceAccount = require(`../creds/${process.env.CREDS_FILE_NAME}`)
    const config = {
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'xr-studio-a9c5e.appspot.com'
    }
    admin.initializeApp(config);
}else if(process.env.MODE == 'production'){
    admin.initializeApp();
}

exports.admin = admin;