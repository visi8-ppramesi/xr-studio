const { exportDocument } = require("../../utils/documentTraveler")
const stringify = require('../../utils/betterStableStringify')
const { detailedDiff: diff } = require("deep-object-diff")
const { admin } = require('../../utils/initializeAdmin.js')

const db = admin.firestore();

async function createChangesPusher(shootId){
    const getData = async function(){
        return await exportDocument([
            "shoots",
            shootId,
            [
                ["assets"],
                ["equipments"],
                ["procedures"]
            ]
        ])
    }
    const getDataPromise = getData()
    const countPromise = db.collection("shoots").doc(shootId).collection("changes").count().get()
    const [oldData, shootCount] = await Promise.all([getDataPromise, countPromise]) 
    const pusher = async function(){
        const newData = await getData()
        const diffResult = diff(oldData, newData)
        const count = shootCount.data().count
        return db
            .collection("shoots")
            .doc(shootId)
            .collection("changes")
            .doc(count.toString())
            .set({
                updated_date: new Date(),
                diff: stringify(diffResult)
            })
    }
    return pusher
}

module.exports = createChangesPusher