const functions = require("firebase-functions");
const {admin} = require("../utils/initializeFirebase");

const db = admin.firestore();

exports.onStudioTourCreate = functions
    .region("asia-southeast2")
    .firestore
    .document("/studio_tours/{studioTourId}")
    .onCreate((snap, ctx) => {
      const {studioTourId} = ctx.params;
      const studioTour = snap.data();
      const studioTourRef = db.collection("studio_tours").doc(studioTourId);
      const shootStatus = ["unapproved"];
      const calendarPromise = db
          .collection("calendar")
          .doc(studioTourId)
          .set({
            start_date: studioTour.tour_start_date,
            end_date: studioTour.tour_end_date,
            event_id: studioTourRef,
            event: {
              location: "main-location",
              status: shootStatus,
            },
          });

      return calendarPromise;
    });

exports.onStudioTourUpdate = functions
    .region("asia-southeast2")
    .firestore
    .document("/studio_tours/{studioTourId}")
    .onUpdate((snap, ctx) => {
      const isEqual = require("lodash/isEqual");
      const {status, location} = snap.after.data();
      const {status: oldStatus, location: newLocation} = snap.before.data();
      const studioTourId = ctx.params.studioTourId;

      const studioTourRef = db
          .collection("studio_tours")
          .doc(studioTourId);

      if (!isEqual(status, oldStatus)) {
        return db.runTransaction((t) => {
          return t.get(
              db
                  .collection("calendar")
                  .where("event_id", "==", studioTourRef),
          ).then((innerSnap) => {
            const loc = newLocation ? newLocation : location;
            Object.values(innerSnap.docs).forEach((doc) => {
              const myRef = doc.ref;
              t.set(myRef, {
                event: {
                  status: Array.isArray(status) ? status : [status],
                  location: loc,
                },
              }, {merge: true});
            });
          });
        });
      } else {
        return Promise.resolve(true);
      }
    });

exports.onStudioTourDelete = functions
    .region("asia-southeast2")
    .firestore
    .document("/studio_tours/{studioTourId}")
    .onDelete((snap, ctx) => {
      const {studioTourId} = ctx.params;
      return db
          .collection("calendar")
          .doc(studioTourId)
          .delete();
    });
