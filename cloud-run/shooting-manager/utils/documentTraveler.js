const { admin } = require("./initializeAdmin")
const isNil = require("lodash/isNil")
const isEmpty = require("lodash/isEmpty")
const isArray = require("lodash/isArray")

const db = admin.firestore()

/*
    structure [collection, collectionid, ..., [[subcollection1, subcollection1id, ...], [subcollection2, subcollection2id, ...], ...]]
    example [
        shoots,
        shootid,
        [
            [equipments],
            [assets],
            [procedures]
        ]
    ]
*/

/*
    structure {
        [shoots: collection]: {
            [shoot_id: document_id]: {
                [equipments: ]
            }
        }
    }
*/

async function exportDocument(structure, parentRef = null){
    if(isNil(parentRef)){
        parentRef = db
    }
    const collection = structure.shift()
    let values = {}
    if(isArray(structure[0]) || isNil(structure[0])){
        const collData = await parentRef.collection(collection).get()
        if(!collData.empty){
            const docs = Object.values(collData.docs)
            for(let j = 0; j < docs.length; j++){
                doc = docs[j]
                let deeperData = {}
                if(isArray(structure[0])){
                    for(let k = 0; k < structure[0].length; k++){
                        const result = await exportDocument(structure[0][k], doc.ref)
                        deeperData = {
                            ...deeperData,
                            ...result
                        }
                    }
                }
                values = {
                    ...values,
                    [doc.id]: {
                        ...doc.data(),
                        ...deeperData
                    }
                }
            }
        }
    }else{
        const documentId = structure.shift()
        const deepObjects = structure.shift()
        const myRef = parentRef.collection(collection).doc(documentId)
        let deeperData = {}
        for(let i = 0; i < deepObjects.length; i++){
            const deepObject = deepObjects[i]
            const result = await exportDocument(deepObject, myRef)
            deeperData = {
                ...deeperData,
                ...result
            }
        }
        const doc = await myRef.get()
        values = {
            ...values,
            [doc.id]: {
                ...doc.data(),
                ...deeperData
            }
        }
    }
    return isEmpty(values) ? {} : {[collection]: values}
}

exports.exportDocument = exportDocument