const { exportDocument } = require('../utils/documentTraveler.js')
const { admin } = require('../utils/initializeAdmin.js')
const { detailedDiff: diff } = require("deep-object-diff")
const stringify = require('../utils/betterStableStringify')
const dataObj = {}

const db = admin.firestore()

module.exports = {
    onPreShootChange: [
        function({data, identifier}){
            const { shootId, deferred } = data
            exportDocument([
                "shoots",
                shootId,
                [
                    ["assets"],
                    ["equipments"],
                    ["procedures"]
                ]
            ]).then((result) => {
                dataObj[identifier] = result
                deferred.resolve()
            })
        }
    ],
    onPostShootChange: [
        function({data}){
            const { preShootObjId, shootId, deferred } = data
            const oldObject = dataObj[preShootObjId]
            exportDocument([
                "shoots",
                shootId,
                [
                    ["assets"],
                    ["equipments"],
                    ["procedures"]
                ]
            ]).then((result) => {
                const newObject = result
                const diffResult = diff(oldObject, newObject)
                db.collection("shoots").doc(shootId).collection("changes").count().get().then((countResult) => {
                    const count = countResult.data().count
                    db
                        .collection("shoots")
                        .doc(shootId)
                        .collection("changes")
                        .doc(count.toString())
                        .set({
                            updated_date: new Date(),
                            diff: stringify(diffResult)
                        })
                        .then(() => {
                            deferred.resolve()
                        })
                })
            })
        }
    ],
    onErrorShootChange: [
        function({data}){
            const { preShootObjId, deferred } = data
            delete dataObj[preShootObjId];
            deferred.resolve();
        }
    ]
}