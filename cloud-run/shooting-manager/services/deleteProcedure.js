"use strict";

const { admin } = require('../utils/initializeAdmin.js')
const { getTokenId } = require('../utils/getTokenId.js')
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

module.exports = function(){
    const db = admin.firestore();
    const auth = admin.auth()

    return async (req, res) => {
        const tokenId = getTokenId(req)

        let uid;
        if (isNil(tokenId)) {
            //token is nil, exit
            res.send({ status: 401, message: "Unauthorized Access" })
        } else {
            try {
                const decodedToken = await auth.verifyIdToken(tokenId)
                uid = decodedToken.uid
            } catch (error) {
                //token is unverifiable, exit
                res.send({ status: 401, message: "Unauthorized Access" })
            }
        }

        const deleteProcedure = async function(data){
            const { 
                shoot_id: shootId, 
                procedure_id: procedureId,
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

            const currentShoot = await db
                .collection("shoots")
                .doc(shootId)
                .get()
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

            const deletePromise = await db
                .collection("shoots")
                .doc(shootId)
                .collection("procedures")
                .doc(procedureId)
                .delete()
                .then(async () => {
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

                    return db
                        .collection("shoots")
                        .doc(shootId)
                        .collection("changes")
                        .doc(shootChangesCount.toString())
                        .set({
                            updated_date: new Date(),
                            diff: stringify(shootDiff)
                        })
                })

            return deletePromise
        }

        let data
        try {
            data = bufferDecoder(req.body.message.data)
            await deleteProcedure(data)
            res.send({ status: 200, message: "procedure deleted" })
        } catch (error) {
            console.error(error)
            res.send({ status: 500, message: error })
        }
    }
}