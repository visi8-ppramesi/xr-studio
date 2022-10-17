const {parseBufferMiddleware} = require('../utils/bufferProcessor');
const idempotencyMiddleware = require('../utils/idempotencyMiddleware');
const functions = require("firebase-functions");
const {admin} = require("../utils/initializeFirebase");
const {appBuilder} = require('../utils/initializeExpress');

const app = appBuilder();
const db = admin.firestore();

app.use(parseBufferMiddleware)
app.use(idempotencyMiddleware(['asset_id', 'contract_id', 'user_id']))

app.post('/', async (req, res) => {
    const newAssetId = req.body['asset_id']
    const newContractId = req.body['contract_id']
    const { parsedBody } = req
    const setAssetPromise = db.collection('assets').doc(newAssetId).set({
        ...parsedBody.data
    })
    const setAssetContractPromise = db.collection('assets_contracts').doc(newAssetId).set({
        contract: db.collection('contracts').doc(newContractId)
    })
    await Promise.all([
        setAssetPromise,
        setAssetContractPromise
    ])

    res.status(200).send(JSON.stringify({status: 'create new asset we good'}))
})

exports.createAsset = functions
    .region('asia-southeast2')
    .https
    .onRequest(app)