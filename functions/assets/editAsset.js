const {parseBufferMiddleware} = require("../utils/bufferProcessor");
const idempotencyMiddleware = require("../utils/idempotencyMiddleware");
const functions = require("firebase-functions");
const {admin} = require("../utils/initializeFirebase");
const {appBuilder} = require("../utils/initializeExpress");

const app = appBuilder();
const db = admin.firestore();

app.use(parseBufferMiddleware);
app.use(idempotencyMiddleware("asset_id"));

app.post("/", async (req, res) => {
  const newAssetId = req.body.assetId;
  const {parsedBody} = req;
  await db.collection("assets").doc(newAssetId).set({
    ...parsedBody.data,
  });
  res.status(200).send(JSON.stringify({status: "create new asset we good"}));
});

exports.createAsset = functions
    .region("asia-southeast2")
    .https
    .onRequest(app);
