const {parseBufferMiddleware} = require("../utils/bufferProcessor");
const idempotencyMiddleware = require("../utils/idempotencyMiddleware");
const functions = require("firebase-functions");
const {admin} = require("../utils/initializeFirebase");
const {appBuilder} = require("../utils/initializeExpress");
const {v4} = require("uuid");

const app = appBuilder();
const db = admin.firestore();

app.use(parseBufferMiddleware);
app.use(idempotencyMiddleware(["shoot_id", "user_id"]));

// eslint-disable-next-line no-unused-vars
app.post("/", async (req, res) => {
  const shootId = req.body["shoot_id"];
  // eslint-disable-next-line no-unused-vars
  const userId = req.body["user_id"];
  const {parsedBody} = req;
  const rightNowHex = new Date().getTime().toString(16);
  const uuid = [rightNowHex, v4()].join("-").split("-").slice(0, 5).join("-");

  const shootsCollection = db.collection("shoots").doc(shootId).set({
    ...parsedBody.data["shoot_data"], // placeholder
  });

  const procData = {
    ...parsedBody.data["procedure_data"], // placeholder
  };

  const newShootProc = db
      .collection("shoots").doc(shootId)
      .collection("procedures").doc(uuid)
      .set(procData);

  // eslint-disable-next-line no-unused-vars
  const changes = db
      .collection("shoots").doc(shootId)
      .collection("procedures").doc(uuid)
      .collection("changes").doc("0")
      .set({
        data: JSON.stringify(procData),
        updated_date: new Date(),
      });

  await Promise.all([shootsCollection, newShootProc]);
});

exports.createAsset = functions
    .region("asia-southeast2")
    .https
    .onRequest(app);
