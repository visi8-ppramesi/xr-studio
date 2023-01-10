"use strict";

const { admin } = require('../utils/initializeAdmin.js')
const { getTokenId } = require('../utils/getTokenId.js')
const { exportDocument } = require("../utils/documentTraveler")
// const { vedhg } = require('../utils/dateRangeHash.js')
const setIdIfNotSet = require("../utils/id.js")
const { decode: bufferDecoder } = require('../utils/bufferEncoder')
const { detailedDiff: diff } = require("deep-object-diff")
const isNil = require('lodash/isNil')
const omitBy = require("lodash/omitBy")
const isEmpty = require("lodash/isEmpty")
// const { v4 } = require('uuid')
const stringify = require('../utils/betterStableStringify')
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
    // const storage = admin.storage();
    const auth = admin.auth()

    return async (req, res) => {
        const tokenId = getTokenId(req)

        let uid;
        if (isNil(tokenId)) {
            //token is nil, exit
            res.send({ status: 401, message: "unauthorized" })
            throw new Error("unauthorized")
        } else {
            try {
                const decodedToken = await auth.verifyIdToken(tokenId)
                uid = decodedToken.uid
            } catch (error) {
                //token is unverifiable, exit
                res.send({ status: 401, message: "unauthorized" })
                throw new Error("unauthorized")
            }
        }

        const editProcedure = async function(data){
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

            const currentCompleteData = await exportDocument([
                "shoots",
                shootId,
                [
                    ["assets"],
                    ["equipments"],
                    ["procedures"]
                ]
            ])

            const currentProcedure = await db
                .collection("shoots")
                .doc(shootId)
                .collection("procedures")
                .doc(procedureId)
                .get()
            
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
                const myStatus = status || cprocData.status
                const myData = data || cprocData.data

                await db
                    .collection("shoots")
                    .doc(shootId)
                    .collection("procedures")
                    .doc(newProcId)
                    .set({
                        status: myStatus,
                        created_date: rightNow,
                        procedure_type: db.collection("procedure_types").doc(procedureType),
                        procedure_start: procedureStart,
                        procedure_end: procedureEnd,
                        procedure_data: {
                            ...myData
                        }
                    })
                    .then(() => {
                        return db
                            .collection("shoots")
                            .doc(shootId)
                            .collection("procedures")
                            .doc(procedureId)
                            .delete()
                    })
            }else{//2nd case
                await db
                    .collection("shoots")
                    .doc(shootId)
                    .collection("procedures")
                    .doc(procedureId)
                    .set({
                        ...omitBy({
                            procedure_data: procedureData,
                            status,
                        }, isEmpty)
                    }, { merge: true })
            }
            const changedCompleteData = await exportDocument([
                "shoots",
                shootId,
                [
                    ["assets"],
                    ["equipments"],
                    ["procedures"]
                ]
            ])

            const shootDiff = diff(currentCompleteData, changedCompleteData)
            
            const shootChangesCount = (await db.collection("shoots").doc(shootId).collection("changes").count().get()).data().count

            await db
                .collection("shoots")
                .doc(shootId)
                .collection("changes")
                .doc(shootChangesCount.toString())
                .set({
                    updated_date: new Date(),
                    diff: stringify(shootDiff)
                })
        }

        let data
        try {
            data = bufferDecoder(req.body.message.data)
            const result = await editProcedure(data)
            res.send({ status: 200, message: "shoot created", result })
        } catch (error) {
            console.error(error)
            res.send({ status: 500, message: "shoot edit failed", error })
            return
        }
    }
}