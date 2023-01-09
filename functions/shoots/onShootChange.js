const functions = require("firebase-functions");
const { admin } = require("../utils/initializeFirebase");

const db = admin.firestore();

exports.onShootChange = functions
    .region("asia-southeast2")
    .firestore
    .document("/shoots/{shootId}")
    .onUpdate((snap, ctx) => {
        const { status, location } = snap.after.data()
        const { status: oldStatus, location: oldLocation } = snap.before.data()
        const shootId = ctx.params.shootId

        const shootRef = db
            .collection("shoots")
            .doc(shootId)
        
        if(status != oldStatus || location != oldLocation){
            return db.runTransaction((t) => {
                t.get(
                    db
                        .collection("calendar")
                        .where("event_id", "==", shootRef)
                ).then((innerSnap) => {
                    Object.values(innerSnap.docs).forEach((doc) => {
                        const myRef = doc.ref
                        t.update(myRef, {
                            event: {
                                status,
                                location
                            }
                        })
                    })
                })
            })
        }else{
            return Promise.resolve(true)
        }
    });