"use strict";

const { admin } = require('../utils/initializeAdmin.js')
const { getTokenId } = require('../utils/getTokenId.js')
// const { vedhg } = require('../utils/dateRangeHash.js')
const setIdIfNotSet = require("../utils/id.js")
const { decode: bufferDecoder } = require('../utils/bufferEncoder')
const isNil = require('lodash/isNil')
const isArray = require('lodash/isArray')
const isEmpty = require('lodash/isEmpty')
const omit = require('lodash/omit')
// const { v4 } = require('uuid')
const { FieldValue } = admin.firestore
const stringify = require('../utils/betterStableStringify')
const { detailedDiff: diff } = require("deep-object-diff")
const { isUserAdmin } = require('../utils/roles')
const pluralize = require("pluralize")

// function setIdIfNotSet(obj, isProcedure = false) {
//     if (isNil(obj.id)) {
//         if(isProcedure){
//             let { procedure_code: procedureCode, procedure_start: procedureStart, procedure_end: procedureEnd } = obj
//             procedureCode = procedureCode || '000'
//             const encoded = vedhg.encodeDates(procedureStart, procedureEnd)
//             obj.id = [procedureCode, encoded].join('.')
//         }else{
//             obj.id = v4()
//         }
//     }
//     return obj
// }

/*
    data structure: {
        procedures: {
            added: [

            ],
            updated: [

            ],
            deleted: [

            ]
        },
        equipments: {
            added: [

            ],
            updated: [

            ],
            deleted: [

            ]
        },
        assets: {
            added: [

            ],
            updated: [

            ],
            deleted: [

            ]
        },
        shoot: {

        }
    }
*/

module.exports = function () {
    const db = admin.firestore();
    const auth = admin.auth()

    return async (req, res) => {
        const tokenId = getTokenId(req)

        let uid;
        if (isNil(tokenId)) {
            //token is nil, exit
            res.send({ status: 401, message: "Unauthorized Access" })
            throw new Error("Unauthorized Access")
        } else {
            try {
                const decodedToken = await auth.verifyIdToken(tokenId)
                uid = decodedToken.uid
            } catch (error) {
                //token is unverifiable, exit
                res.send({ status: 401, message: "Unauthorized Access" })
                throw new Error("Unauthorized Access")
            }
        }
        let data
        try {
            data = bufferDecoder(req.body.message.data)
        } catch (error) {
            res.send({ status: 500, message: error })
            return
        }
        
        const { shoot: { id: shootId } } = data
        
        if (isNil(shootId)) {
            throw new Error("Null shoot id")
        }

        const userAdmin = await isUserAdmin(uid, db)
        const rightNow = new Date()
        const userCreatedShoot = await db
            .collection("shoots")
            .doc(data.shoot.id)
            .get()
            .then((snap) => {
                return snap.get('created_by').id === uid
            })

        if (!(userAdmin || userCreatedShoot)) {
            res.send({ status: 402, message: "Unauthorized Access" })
            throw new Error("Unauthorized Access")
        }
        const result = {
            shoot: {},
            equipments: [],
            procedures: [],
            assets: []
        }

        result.shoot.shoot_id = shootId

        const editShootWithSubcollections = async function (data) {
            const { procedures, equipments, assets, shoot } = data
            if (isNil(shoot)) {
                throw new Error("Null shoot")
            }

            const oldShootData = await db
                .collection("shoots")
                .doc(shootId)
                .get()
                .then(snap => {
                    return omit(snap.data(), [
                        'status_history',
                        'changes',
                        'assets',
                        'procedures',
                        'equipments'
                    ])
                    // const { 
                    //     status_history: grr, 
                    //     changes: uhh, 
                    //     assets: ass, 
                    //     procedures: shit, 
                    //     equipments: fuck, 
                    //     ...shootData 
                    // } = snap.data()
                    // return shootData
                })
            

            const oldData = {
                shoot: oldShootData
            }

            const { status, ...shootData } = shoot

            if(!isEmpty(shootData)){
                await db.collection("shoots").doc(shootId).set({
                    ...shootData
                }, { merge: true })
            }

            const newShootData = await db
                .collection("shoots")
                .doc(shootId)
                .get()
                .then(snap => {
                    return omit(snap.data(), [
                        'status_history',
                        'changes',
                        'assets',
                        'procedures',
                        'equipments'
                    ])
                    // const { 
                    //     status_history: grr, 
                    //     changes: uhh, 
                    //     assets: ass, 
                    //     procedures: shit, 
                    //     equipments: fuck, 
                    //     ...shootData 
                    // } = snap.data()
                    // return shootData
                })

            const forChanges = {
                shoot: {
                    ...newShootData
                },
                equipments: {},
                procedures: {},
                assets: {}
            }

            const createChanges = async function (collectionObj) {
                const collectionName = Object.keys(collectionObj)[0]
                const singularCollectionName = [ pluralize.singular(collectionName), 'id' ].join('_')
                const collection = collectionObj[collectionName]
                const { added, updated, deleted } = collection
                const promises = []

                const oldStuff = await db.collection("shoots")
                    .doc(shootId)
                    .collection(collectionName)
                    .get()
                    .then((snap) => {
                        return Object.values(snap.docs).reduce((acc, doc) => {
                            acc[doc.id] = omit(doc.data(), [
                                'changes'
                            ])
                            return acc
                        }, {})
                    })
                
                oldData[collectionName] = oldStuff

                if (!isNil(added)) {
                    const addedPromises = added.map((addObj) => {
                        setIdIfNotSet(addObj, collectionName === 'procedures')
                        const { id, ...addDuplicate } = addObj

                        result[collectionName].push({[ singularCollectionName ]: id })
                        return db
                            .collection("shoots")
                            .doc(shootId)
                            .collection(collectionName)
                            .doc(id)
                            .set({
                                ...addDuplicate
                            }).then(() => {
                                return db
                                    .collection("shoots")
                                    .doc(shootId)
                                    .collection(collectionName)
                                    .doc(id)
                                    .collection("changes")
                                    .doc("0")
                                    .set({
                                        updated_date: rightNow,
                                        diff: stringify(diff({}, addDuplicate))
                                    })
                            })
                    })
                    promises.push(...addedPromises)
                }

                if (!isNil(updated)) {
                    const updatePromises = updated.reduce((acc, updObj) => {
                        const { id, ...updDuplicate } = updObj

                        result[collectionName].push({[ singularCollectionName ]: id })
                        const changesPromise = db
                            .collection("shoots")
                            .doc(shootId)
                            .collection(collectionName)
                            .doc(id)
                            .collection("changes")
                            .get()
                            .then((snap) => {
                                const len = snap.docs.length
                                const oldData = JSON.parse(snap.docs.find(v => v.id == (len - 1).toString()).data().diff)
                                const lenStr = len.toString()
                                return db
                                    .collection("shoots")
                                    .doc(shootId)
                                    .collection(collectionName)
                                    .doc(id)
                                    .collection("changes")
                                    .doc(lenStr)
                                    .set({
                                        updated_date: rightNow,
                                        diff: stringify(diff(oldData, updDuplicate))
                                    })
                            })

                        const mainPromise = db
                            .collection("shoots")
                            .doc(shootId)
                            .collection(collectionName)
                            .doc(id)
                            .set({
                                ...updDuplicate
                            }, { merge: true })

                        acc.push(changesPromise, mainPromise)
                        return acc
                    }, [])
                    promises.push(...updatePromises)
                }

                if (!isNil(deleted)) {
                    const delPromises = deleted.map((delId) => {
                        return db
                            .collection("shoots")
                            .doc(shootId)
                            .collection(collectionName)
                            .doc(delId)
                            .collection("changes")
                            .get()
                            .then((snap) => {
                                const batch = db.batch();
                                snap.docs.forEach((doc) => {
                                    batch.delete(doc.ref);
                                });
                                return batch.commit();
                            }).then(() => {
                                return db
                                    .collection("shoots")
                                    .doc(shootId)
                                    .collection(collectionName)
                                    .doc(delId)
                                    .delete()
                            })
                    })
                    promises.push(...delPromises)
                }

                await Promise.all(promises)

                return db
                    .collection("shoots")
                    .doc(shootId)
                    .collection(collectionName)
                    .get()
                    .then((snap) => {
                        return snap.docs.reduce((acc, v) => {
                            const { changes, ...myData } = v.data()
                            acc[v.id] = myData
                            return acc
                        }, {})
                    })
            }

            const promises = []

            if (!isNil(procedures)) {
                // promises.push(...createChanges({ procedures }))
                forChanges.procedures = await createChanges({ procedures })
            }

            if (!isNil(equipments)) {
                // promises.push(...createChanges({ equipments }))
                forChanges.equipments = await createChanges({ equipments })
            }

            if (!isNil(assets)) {
                // promises.push(...createChanges({ assets }))
                forChanges.assets = await createChanges({ assets })
            }

            // const oldData = await db.collection("shoots").doc(shootId).collection('changes').get().then((snap) => {
            //     const { docs } = snap
            //     const lastIdx = Object.values(docs).length - 1
            //     const lastKey = Object.keys(docs)[lastIdx]
            //     return stringify.betterJSONParser(docs[lastKey].data().diff)
            // })

            // const newData = await db.collection("shoots").doc(shootId).get().then((snap) => {
            //     return snap.data()
            // })

            const diffObj = diff(oldData, forChanges)
            if (Object.keys(diffObj).length > 0) {
                const count = (await db.collection("shoots").doc(shootId).collection("changes").count().get()).data().count
                await db
                    .collection("shoots")
                    .doc(shootId)
                    .collection("changes")
                    .doc(count.toString())
                    .set({
                        updated_date: new Date(),
                        diff: stringify(diffObj)
                    })
            }

            if (!isNil(status)) {
                const statusObj = isArray(status) ? status : [status]
                await db.collection("shoots").doc(shootId).set({
                    status: statusObj,
                    status_history: FieldValue.arrayUnion(...statusObj.map((statusStr) => {
                        return {
                            note: "",
                            status: statusStr,
                            date: new Date(),
                            processed_by: db.collection("users").doc(uid)
                        }
                    }))
                }, { merge: true })
            }

            return promises
        }
        try {
            await editShootWithSubcollections(data)
            res.send({ status: 200, message: "shoot edited" })
        } catch (error) {
            res.send({ status: 500, message: error })
        }

        // await editShootWithSubcollections(data)
        // res.send({ status: 200, message: "we good", result })
    }
}