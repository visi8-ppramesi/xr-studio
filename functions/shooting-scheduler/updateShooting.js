const {parseBufferMiddleware} = require('../utils/bufferProcessor');
const idempotencyMiddleware = require('../utils/idempotencyMiddleware');
const functions = require("firebase-functions");
const {admin} = require("../utils/initializeFirebase");
const {appBuilder} = require('../utils/initializeExpress');

const app = appBuilder();
const db = admin.firestore();

app.use(parseBufferMiddleware)
app.use(idempotencyMiddleware(['shoot_id', 'user_id']))

app.post('/', async (req, res) => {
    
})

exports.createAsset = functions
    .region('asia-southeast2')
    .https
    .onRequest(app)