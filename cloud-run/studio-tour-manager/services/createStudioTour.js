"use strict";

const { admin } = require('../utils/initializeAdmin.js')
const setIdIfNotSet = require("../utils/id.js")
const { decode: bufferDecoder } = require('../utils/bufferEncoder')
const isNil = require('lodash/isNil')
const omitBy = require('lodash/omitBy')
const { vedhg } = require('../utils/dateRangeHash.js');

module.exports = function(){
    const db = admin.firestore()

    return async function(req, res){
        const { uid } = req
        const requestor = !isNil(uid) ? db.collection("users").doc(uid) : null
        const createStudioTour = async function(data){
            const { tour_start_date: startDate, tour_end_date: endDate, notes, debug } = data
            let { contact_email: contactEmail, location } = data
            location = location ?? "main-location"
            if(isNil(contactEmail)){
                if(isNil(uid)){
                    throw new Error("Contact email is missing!")
                }
                const userSnap = await db
                    .collection("users")
                    .doc(uid)
                    .get()

                contactEmail = userSnap.get("email")
                if(isNil(contactEmail)){
                    throw new Error("Contact email is missing!")
                }
            }
            if(isNil(startDate) || isNil(endDate)){
                throw new Error("Date invalid!")
            }
            try{
                const calendarSnap = await db.collection("calendar").where("event.status", "array-contains", "approved").get()
                if(!calendarSnap.empty){
                    const calendarDocs = Object.values(calendarSnap.docs).map(k => k.id)
                    let overlapAcc = false;
                    const { id } = setIdIfNotSet(data, true, debug)
                    overlapAcc ||= calendarDocs.reduce((acc, v) => acc || vedhg.hashesOverlap(v, id), false)
                    if(overlapAcc){
                        throw new Error("Calendar overlap")
                    }
                }
                const status = "unapproved"
                return db
                    .collection("studio_tours")
                    .doc(data.id)
                    .set(omitBy({
                        status,
                        tour_start_date: startDate, 
                        tour_end_date: endDate,
                        location,
                        notes,
                        requested_by: requestor,
                        contact_email: contactEmail
                    }, isNil))
            }catch(err){
                throw err
            }
        }

        try {
            const data = bufferDecoder(req.body.message.data)
            const result = await createStudioTour(data)
            res.status(200).send({ message: "studio tour created", result })
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}