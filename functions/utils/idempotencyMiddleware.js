const {admin} = require('./initializeFirebase')
const isNil = require('lodash/isNil')
const isString = require('lodash/isString')
const { v4: uuidv4 } = require('uuid');
const db = admin.firestore()

module.exports = (objectIdNames) => async (req, res, next) => {
    if(isString(objectIdNames)){
        objectIdNames = [objectIdNames]
    }
    const {parsedData} = req.body
    if(!isNil(parsedData.forceEvent) && parsedData.forceEvent){
        objectIdNames.forEach((objectIdName) => {
            const newUwuId = uuidv4()
            req.body[objectIdName] = newUwuId
        })
        next()
    }
    const event = await db.collection('events').doc(parsedData.eventId).get()
    if(event.exists){
        const promises = objectIdNames.map(async (objectIdName) => {
            let objectId = event.data(objectIdName)
            if(isNil(objectId)){
                const newObjectId = uuidv4()
                objectId = await db.collection('events').doc(parsedData.eventId).set({
                    [objectIdName]: objectId
                }, {merge: true}).then(() => {
                    req.body[objectIdName] = newObjectId
                    return newObjectId
                })
            }else{
                req.body[objectIdName] = objectId
            }
            return objectId
        })
        await Promise.all(promises)
        next()
    }else{
        res.status(200).send(JSON.stringify({status: 'event does not exist'}))
    }
}