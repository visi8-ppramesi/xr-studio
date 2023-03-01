"use strict";

const { admin } = require('../utils/initializeAdmin.js')
const { getTokenId } = require('../utils/getTokenId.js')
const { formatters, processors } = require('../utils/formatters.js')
const { exportDocument } = require("../utils/documentTraveler")
const { vedhg } = require('../utils/dateRangeHash.js')
const setIdIfNotSet = require("../utils/id.js")
const { decode: bufferDecoder } = require('../utils/bufferEncoder')
const { detailedDiff: diff } = require("deep-object-diff")
const isNil = require('lodash/isNil')
const omitBy = require("lodash/omitBy")
const isEmpty = require("lodash/isEmpty")
// const { v4 } = require('uuid')
const stringify = require('../utils/betterStableStringify')
const createChangesPusher = require("./utils/changesPusher.js")

const standardizeDate = function(date){
    let dateCp = date
    if(!isNil(date.toDate) && typeof date.toDate === "function"){
        dateCp = date.toDate()
    }else if(!(date instanceof Date)){
        dateCp = new Date(date)
    }

    return dateCp.getTime()
}

module.exports = function(){
    const db = admin.firestore()

    return async function(req, res){
        const { roles } = req

        if(!roles.includes("admin")){
            res.status(400).send({ error: "Not an admin!" })
            return
        }

        const editStudioTour = async function(data){
            const { shoot_tour_id: oldTourId, tour_start_date: startDate, tour_end_date: endDate, debug } = data
            let { contact_email: notes, status } = data

            if(isNil(startDate) || isNil(endDate)){
                throw new Error("Date invalid!")
            }

            const oldTourSnap = await db
                .collection("studio_tours")
                .doc(oldTourId)
                .get()

            const oldTourData = oldTourSnap.get()
            const {
                tour_start_date: oldStartDate, 
                tour_end_date: oldEndDate,
                notes: oldNotes, 
                status: oldStatus,
                requested_by: requestor,
                contact_email: contactEmail
            } = oldTourData
            if(isNil(notes)){
                notes = oldNotes
            }
            if(isNil(status)){
                status = oldStatus
            }

            try{
                const { id: newTourId } = setIdIfNotSet(data, true, debug)
                const batcher = db.batch()
                let deleteTour = false
                if(//case 1: there's change on date
                    !isNil(startDate) && !isNil(endDate) && (
                        standardizeDate(startDate) !== standardizeDate(oldStartDate) || 
                        standardizeDate(endDate) !== standardizeDate(oldEndDate)
                    )
                ){
                    const calendarSnap = await db.collection("calendar").where("event.status", "array-contains", "approved").get()
                    if(!calendarSnap.empty){
                        const calendarDocs = Object.values(calendarSnap.docs).map(k => k.id)
                        let overlapAcc = false;
                        overlapAcc ||= calendarDocs.reduce((acc, v) => acc || (vedhg.hashesOverlap(v, newTourId) && v !== oldTourId), false)
                        if(overlapAcc){
                            throw new Error("Calendar overlap")
                        }
                    }

                    batcher.set(db.collection("studio_tours").doc(newTourId), {
                        tour_start_date: startDate, 
                        tour_end_date: endDate,
                        notes: notes, 
                        status: status,
                        requested_by: requestor,
                        contact_email: contactEmail
                    })
                    deleteTour = true
                }else{//case 2: there's only status, or notes or whatevs
                    batcher.update(db.collection("studio_tours").doc(oldTourId), {
                        status, notes
                    })
                }
                return await batcher.commit().then(() => {
                    let deletePromise = Promise.resolve(true)
                    if(deleteTour){
                        deletePromise = db
                            .collection("studio_tours")
                            .doc(oldTourId)
                            .delete()
                    }
                    return deletePromise
                })
            }catch(err){
                throw err
            }
        }

        let data
        try {
            data = bufferDecoder(req.body.message.data)
            const result = await editStudioTour(data)
            res.status(200).send({ message: "studio tour edited", result })
        } catch (error) {
            console.error(error)
            res.status(400).send({ error: error.message })
            return
        }
    }
}