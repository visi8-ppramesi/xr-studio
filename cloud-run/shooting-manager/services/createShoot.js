"use strict";

const { admin } = require('../utils/initializeAdmin.js')
const { getTokenId } = require('../utils/getTokenId.js')
const { formatters, processors } = require('../utils/formatters.js')
const setIdIfNotSet = require("../utils/id.js")
const { decode: bufferDecoder } = require('../utils/bufferEncoder')
const isNil = require('lodash/isNil')
const stringify = require('../utils/betterStableStringify');
const { vedhg } = require('../utils/dateRangeHash.js');
const createChangesPusher = require("./utils/changesPusher.js")

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

        const createShootWithSubcollections = async function (data) {
            const batch = db.batch();
            const { procedures, equipments, assets, shoot, debug } = data

            if (isNil(shoot)) {
                throw new Error("Null shoot")
            }

            //check procedures overlap
            if (!isNil(procedures)) {
                const calendarSnap = await db.collection("calendar").where("event.status", "array-contains", "approved").get()
                if(!calendarSnap.empty){
                    const calendarDocs = Object.values(calendarSnap.docs).map(k => k.id)
                    let overlapAcc = false;
                    for (const procedure of procedures) {
                        const { id } = setIdIfNotSet(procedure, true, debug)
                        overlapAcc ||= calendarDocs.reduce((acc, v) => acc || vedhg.hashesOverlap(v, id), false)
                    }
                    if(overlapAcc){
                        throw new Error("Calendar overlap")
                    }
                }
            }

            const status = ["initialized", "unpaid"]
            const retVal = {
                shoot: {},
                equipments: [],
                procedures: [],
                assets: []
            }

            //create shoot first
            const { id, ...shootDuplicate } = setIdIfNotSet(shoot, null, debug)
            const changesPusher = await createChangesPusher(shoot.id)
            const rightNow = new Date()
            batch.set(db.collection("shoots").doc(shoot.id), {
                location: 'main-location',
                created_date: rightNow,
                created_by: db.collection('users').doc(uid),
                ...shootDuplicate
            })

            retVal.shoot.shoot_id = id

            //add equipments
            if (!isNil(equipments)) {
                status.push("with_equipments")
                for (const equipment of equipments) {
                    const { id: equipmentId, ...equipmentDuplicate } = setIdIfNotSet(equipment, null, debug)
                    batch.set(db.collection("shoots").doc(shoot.id).collection("equipments").doc(equipmentId), {
                        ...equipmentDuplicate,
                        created_date: rightNow,
                        equipment_id: db.collection("equipments").doc(equipment.equipment_id)
                    })
                    retVal.equipments.push({ equipment_id: equipmentId })
                }
            }

            //add procedures
            if (!isNil(procedures)) {
                status.push("with_procedures")
                const ptypePrice = await db.collection("procedure_types").get().then((ptypeSnap) => {
                    return ptypeSnap.docs.reduce((acc, ptypeDoc) => {
                        acc[ptypeDoc.id] = ptypeDoc.get("price")
                        return acc
                    }, {})
                })
                for (const procedure of procedures) {
                    const { id: procedureId, procedure_start: procedureStart, procedure_end: procedureEnd, ...procedureDuplicate } = setIdIfNotSet(procedure, true, debug)
                    
                    const procPrice = processors.calculateTotalDailyPrice(procedureStart, procedureEnd, formatters.ceil(vedhg.getIntervalLength(procedureId, "days"), 2), ptypePrice[procedure.procedure_type])
                    batch.set(db.collection("shoots").doc(shoot.id).collection("procedures").doc(procedureId), {
                        ...procedureDuplicate,
                        procedure_start: new Date(procedureStart),
                        procedure_end: new Date(procedureEnd),
                        created_date: rightNow,
                        procedure_type: db.collection("procedure_types").doc(procedure.procedure_type),
                        price: procPrice
                    })
                    retVal.procedures.push({ procedure_id: procedureId })
                }
            }

            //add assets
            if (!isNil(assets)) {
                status.push("with_assets")
                for (const asset of assets) {
                    const { id: assetId, ...assetDuplicate } = setIdIfNotSet(asset, null, debug)
                    batch.set(db.collection("shoots").doc(shoot.id).collection("assets").doc(assetId), {
                        ...assetDuplicate,
                        created_date: rightNow,
                        asset_id: db.collection("assets").doc(asset.asset_id),
                    })
                    retVal.assets.push({ asset_id: assetId })
                }
            }

            await batch.commit().then(() => {
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
                }, { merge: true })
                const changes = changesPusher()
                return Promise.all([statusPromise, changes])
            })
            return retVal
        }
        try {
            const data = bufferDecoder(req.body.message.data)
            const result = await createShootWithSubcollections(data)
            res.status(200).send({ message: "shoot created", result })
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}