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
/*
    data structure: {
        shoot_id: string,
        procedure_id: string,
        procedure_data: object,
        procedure_start: date,
        procedure_end: date
    }
*/

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
    const db = admin.firestore();
    const FieldValue = admin.firestore.FieldValue;
    const auth = admin.auth()

    return async (req, res) => {
        const tokenId = getTokenId(req)

        let uid;
        if (isNil(tokenId)) {
            //token is nil, exit
            res.status(401).send({ error: "Unauthorized Access" })
        } else {
            try {
                const decodedToken = await auth.verifyIdToken(tokenId)
                uid = decodedToken.uid
            } catch (error) {
                //token is unverifiable, exit
                res.status(401).send({ error: "Unauthorized Access" })
            }
        }

        const editProcedure = async function(data){
            const batch = db.batch()
            const rightNow = new Date()
            const { 
                shoot_id: shootId, 
                procedure_id: procedureId,
                procedure_data: procedureData,
                procedure_start: procedureStart,
                procedure_end: procedureEnd,
                procedure_type: procedureType,
                status,
                debug
            } = data

            if(isNil(shootId) || isNil(procedureId)){
                throw new Error("shoot id or procedure id is empty")
            }

            
            const changesPusher = await createChangesPusher(shootId)

            // const currentCompleteData = await exportDocument([
            //     "shoots",
            //     shootId,
            //     [
            //         ["assets"],
            //         ["equipments"],
            //         ["procedures"]
            //     ]
            // ])

            const [ currentShoot, currentProcedure ] = await Promise.all([
                db
                    .collection("shoots")
                    .doc(shootId)
                    .get(),
                db
                    .collection("shoots")
                    .doc(shootId)
                    .collection("procedures")
                    .doc(procedureId)
                    .get()
            ])
            const createdBy = currentShoot.get("created_by")
            if(createdBy.id !== uid){
                const currentUserRoleSnap = await db
                    .collection("user_roles")
                    .doc(uid)
                    .get()
                if(currentUserRoleSnap.empty){
                    throw new Error("Unauthorized Access")
                }
                const currentRoles = currentUserRoleSnap.get("roles")
                if(isNil(currentRoles) || !currentRoles.includes("admin")){
                    throw new Error("Unauthorized Access")
                }
            }
            const currentStatus = currentShoot.get("status")
            if(currentStatus.includes("finished")) {
                throw new Error("shoot has been completed")
            }
            
            const cprocData = currentProcedure.data()
            // handle cases:
            // 1. procedure start or procedure end changed:
            //      - delete current procedure and create
            //        new procedure. data should be
            //        duplicated. cloud function should
            //        handle calendar automatically
            // 2. procedure data or status changed, but not dates:
            //      - update procedure data

            // 1st case
            let deleteProcedure = false
            if(
                !isNil(procedureStart) && !isNil(procedureEnd) && (
                    standardizeDate(procedureStart) !== standardizeDate(cprocData.procedure_start) || 
                    standardizeDate(procedureEnd) !== standardizeDate(cprocData.procedure_end)
                )
            ){
                const { id: newProcId } = setIdIfNotSet({
                    procedure_start: procedureStart,
                    procedure_end: procedureEnd,
                    procedure_type: procedureType,
                }, true, debug)
                const myProcedureData = procedureData || cprocData.procedure_data

                //check procedures overlap
                const calendarSnap = await db.collection("calendar").where("event.status", "array-contains", "approved").get()
                if(!calendarSnap.empty){
                    const calendarDocs = Object.values(calendarSnap.docs).map(k => k.id)
                    const overlapAcc = calendarDocs.reduce((acc, v) => acc || (vedhg.hashesOverlap(v, newProcId) && v !== procedureId), false)
                    if(overlapAcc){
                        throw new Error("Calendar overlap")
                    }
                }

                if(currentStatus.includes("approved")) {
                    batch.update(db.collection("shoots").doc(shootId), {
                        status: FieldValue.arrayRemove("approved")
                    })
                }

                const ptypePrice = await db.collection("procedure_types").get().then((ptypeSnap) => {
                    return ptypeSnap.docs.reduce((acc, ptypeDoc) => {
                        acc[ptypeDoc.id] = ptypeDoc.get("price")
                        return acc
                    }, {})
                })

                const newPrice = processors.calculateTotalDailyPrice(procedureStart, procedureEnd, formatters.ceil(vedhg.getIntervalLength(newProcId, "days"), 2), ptypePrice[procedureType])
                batch.set(db.collection("shoots").doc(shootId).collection("procedures").doc(newProcId), {
                    created_date: rightNow,
                    price: newPrice,
                    procedure_type: db.collection("procedure_types").doc(procedureType),
                    procedure_start: new Date(procedureStart),
                    procedure_end: new Date(procedureEnd),
                    procedure_data: {
                        ...myProcedureData
                    }
                })
                deleteProcedure = true
            }else{//2nd case
                batch.set(db.collection("shoots").doc(shootId).collection("procedures").doc(procedureId), {
                    ...omitBy({
                        procedure_data: procedureData,
                        status,
                    }, isEmpty)
                })
            }

            return await batch.commit().then(() => {
                let deletePromise = Promise.resolve(true)
                if(deleteProcedure){
                    deletePromise = db
                        .collection("shoots")
                        .doc(shootId)
                        .collection("procedures")
                        .doc(procedureId)
                        .delete()
                }
                const changes = changesPusher()
                return Promise.all([deletePromise, changes])
            })
        }

        let data
        try {
            data = bufferDecoder(req.body.message.data)
            const result = await editProcedure(data)
            res.status(200).send({ message: "shoot created", result })
        } catch (error) {
            console.error(error)
            res.status(400).send({ error: error.message })
            return
        }
    }
}