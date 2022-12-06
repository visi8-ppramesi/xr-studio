"use strict";

const { admin } = require('../utils/initializeAdmin.js')
const { getTokenId } = require('../utils/getTokenId.js')
const { vedhg } = require('../utils/dateRangeHash.js')
const { decode: bufferDecoder } = require('../utils/bufferEncoder')
const { diff } = require("deep-object-diff")
const isNil = require('lodash/isNil')
const { v4 } = require('uuid')
const stringify = obj => JSON.stringify(obj, (k, v) => {if(v === undefined){return null}; return v})//require('../utils/betterStableStringify')

function setIdIfNotSet(obj, isProcedure = false) {
    if (isNil(obj.id)) {
        if(isProcedure){
            let { procedure_code: procedureCode, procedure_start: procedureStart, procedure_end: procedureEnd } = obj
            procedureCode = procedureCode || '000'
            const encoded = vedhg.encodeDates(procedureStart, procedureEnd)
            obj.id = [procedureCode, encoded].join('.')
        }else{
            obj.id = v4()
        }
    }
    return obj
}

/*
    data structure: {
        procedures: [
            {
                status: ["initialized", "unpaid"],
                procedure_type: db.collection("procedure_types").doc("something"),
                procedure_start: new Date(),
                procedure_end: new Date(),
                price: 100_000_000
            },
            {
                status: ["initialized", "unpaid"],
                procedure_type: db.collection("procedure_types").doc("something"),
                procedure_start: new Date(),
                procedure_end: new Date(),
                price: 100_000_000
            }
        ],
        equipments: [
            {
                equipment: {
                    id: "something",
                    name: "asdfasdf"
                },
                equipment_id: db.collection("equipments").doc("something"),
                quantity: 100,
                price_item: 1000000,
                total_price: 100 * 1000000
            },
        ],
        assets: [
            {
                asset: {
                    id: "something",
                    name: "asdfasdf"
                },
                asset_id: db.collection("assets").doc("something"),
                price: 100_000_000,
            }
        ],
        shoot: {
            
        }
    }
*/

module.exports = function () {
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

        const createShootWithSubcollections = async function (data) {
            const { procedures, equipments, assets, shoot } = data

            if (isNil(shoot)) {
                throw new Error("Null shoot")
            }

            const status = ["initialized", "unpaid"]
            const promises = []
            const retVal = {
                shoot: {},
                equipments: [],
                procedures: [],
                assets: []
            }

            //create shoot first
            const { id, ...shootDuplicate } = setIdIfNotSet(shoot)
            const rightNow = new Date()
            await db.collection("shoots").doc(shoot.id).set({
                location: 'main-location',
                created_date: rightNow,
                created_by: db.collection('users').doc(uid),
                ...shootDuplicate
            })
            const forChanges = {
                shoot: {
                    created_date: rightNow,
                    location: 'main-location',
                    created_by: db.collection('users').doc(uid),
                    status,
                    ...shootDuplicate
                },
                equipments: {},
                procedures: {},
                assets: {}
            }

            retVal.shoot.shoot_id = id

            //add equipments
            if (!isNil(equipments)) {
                status.push("with_equipments")
                for (const equipment of equipments) {
                    const { id, ...equipmentDuplicate } = setIdIfNotSet(equipment)
                    const promise = db.collection("shoots").doc(shoot.id).collection("equipments").doc(equipment.id).set({
                        created_date: rightNow,
                        ...equipmentDuplicate
                    })
                    promises.push(promise)
                    retVal.equipments.push({ equipment_id: equipment.id })

                    const changesPromise = db
                        .collection("shoots")
                        .doc(shoot.id)
                        .collection("equipments")
                        .doc(equipment.id)
                        .collection("changes")
                        .doc("0")
                        .set({
                            updated_date: new Date(),
                            diff: stringify(diff({}, equipmentDuplicate))
                        })
                    promises.push(changesPromise)

                    forChanges.equipments[id] = {
                        created_date: rightNow,
                        ...equipmentDuplicate
                    }
                }
            }

            //add procedures
            if (!isNil(procedures)) {
                status.push("with_procedures")
                for (const procedure of procedures) {
                    const { id, ...procedureDuplicate } = setIdIfNotSet(procedure, true)
                    const promise = db.collection("shoots").doc(shoot.id).collection("procedures").doc(procedure.id).set({
                        created_date: rightNow,
                        ...procedureDuplicate
                    })
                    promises.push(promise)
                    retVal.procedures.push({ procedure_id: procedure.id })

                    const changesPromise = db
                        .collection("shoots")
                        .doc(shoot.id)
                        .collection("procedures")
                        .doc(procedure.id)
                        .collection("changes")
                        .doc("0")
                        .set({
                            updated_date: new Date(),
                            diff: stringify(diff({}, procedureDuplicate))
                        })
                    promises.push(changesPromise)

                    forChanges.procedures[id] = {
                        created_date: rightNow,
                        ...procedureDuplicate
                    }
                }
            }

            //add assets
            if (!isNil(assets)) {
                status.push("with_assets")
                for (const asset of assets) {
                    const { id, ...assetDuplicate } = setIdIfNotSet(asset)
                    const promise = db.collection("shoots").doc(shoot.id).collection("assets").doc(asset.id).set({
                        created_date: rightNow,
                        ...assetDuplicate
                    })
                    promises.push(promise)
                    retVal.assets.push({ asset_id: asset.id })

                    const changesPromise = db
                        .collection("shoots")
                        .doc(shoot.id)
                        .collection("assets")
                        .doc(asset.id)
                        .collection("changes")
                        .doc("0")
                        .set({
                            updated_date: new Date(),
                            diff: stringify(diff({}, assetDuplicate))
                        })
                    promises.push(changesPromise)

                    forChanges.assets[id] = {
                        created_date: rightNow,
                        ...assetDuplicate
                    }
                }
            }

            const statusPromise = db.collection("shoots").doc(shoot.id).set({
                status,
                status_history: [
                    {
                        note: "Shoot initialized",
                        status: 'initialized',
                        date: new Date(),
                        processed_by: db.collection("users").doc(uid)
                    }
                ]
            }, { merge: true }).then(() => {
                return db
                    .collection("shoots")
                    .doc(shoot.id)
                    .collection("changes")
                    .doc("0")
                    .set({
                        updated_date: new Date(),
                        diff: stringify(diff({}, forChanges))
                    })
            })
            promises.push(statusPromise)

            await Promise.all(promises)
            return retVal
        }

        const data = bufferDecoder(req.body.message.data)
        const result = await createShootWithSubcollections(data)
        res.send({ status: 200, message: "shoot created", result })
    }
}