const { admin } = require('../utils/initializeFirebaseAdmin.js')
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash')

const db = admin.firestore();
const storage = admin.storage();
const auth = admin.auth()

module.exports = class Factory{
    static collectionName = ''
    constructor(collectionPath){
        this.db = db
        this.storage = storage
        this.auth = auth
        this.collectionPath = collectionPath
        this.children = []
        this.data = null
        this.ref = null
        this.id = null
    }

    setCollectionPath(collectionPath){
        this.collectionPath = collectionPath
    }

    static async createData(){
        return {}
    }

    static createId(){
        return 'ft-' + uuidv4()
    }

    buildNewDocRef(id = null){
        if(_.isNil(id)){
            id = this.constructor.createId()
        }
        const ref = this.buildCollectionRef().doc(id)
        return {ref, id}
    }

    buildCollectionRef(){
        let refObj = db
        if(_.isArray(this.collectionPath)){
            for(let i = 0; i < this.collectionPath.length; i++){
                if(i % 2 == 0){
                    refObj = refObj.collection(this.collectionPath[i])
                }else{
                    refObj = refObj.doc(this.collectionPath[i])
                }
            }
        }else if(typeof this.collectionPath === 'string'){
            // const id = this.constructor.createId()
            refObj = refObj.collection(this.collectionPath)
        }else{
            throw new Error('collection path type invalid')
        }
        return refObj
    }

    async createDoc(id = null){
        const data = await this.constructor.createData()
        const {ref, id: newId} = this.buildNewDocRef(id)
        this.data = data
        this.ref = ref
        this.id = newId
        return ref.set(data)
    }

    async clearCollections(){
        // try{
        //     await db.recursiveDelete(this.buildCollectionRef())
        //     return true
        // }catch(error){
        //     throw error
        // }
        const snap = await this.buildCollectionRef().get()
        if(snap.empty){
            return
        }
        const delPromises = Object.values(snap.docs).reduce((acc, doc) => {
            const ref = doc.ref
            if(ref.id.startsWith('ft-')){
                if(!_.isNil(this.constructor.subcollections) && _.isArray(this.constructor.subcollections)){
                    const innerPromises = this.constructor.subcollections.reduce((innerAcc, subcollectionFactory) => {
                        const factory = new subcollectionFactory([this.constructor.collectionName, ref.id])
                        innerAcc.push(factory.clearCollections())
                        return innerAcc
                    }, [])
                    acc.push(Promise.all(innerPromises).then(() => {
                        return ref.delete()
                    }))
                }else{
                    acc.push(ref.delete())
                }
            }
            return acc
        }, [])
        const results = await Promise.all(delPromises)
        return results
    }

    static async createDocs(instanceNum){
        console.log('creating ' + this.collectionName)
        const factories = []
        for(let i = 0; i < instanceNum; i++){
            const instance = new this()
            await instance.createDoc()
            factories.push(instance)
        }
        console.log(this.collectionName + ' created')
        return factories
    }

    async createSubDoc(child){
        const childInstance = new child([this.constructor.collectionName, this.id], this)
        await childInstance.createDoc()
        this.children.push(childInstance)
        return childInstance
    }

    async createSubDocs(children){
        return await children.map(this.createSubDoc)
    }

    async getRandomProjection(fields){
        const rdDoc = await this.getRandomDoc()
        const ref = rdDoc.ref
        return {
            ..._.pick(rdDoc.data(), fields),
            id: ref
        }
    }

    async getRandomDoc(){
        const coll = this.buildCollectionRef()
        const docs = await coll.get()
        const arr = []
        docs.forEach((doc) => {
            arr.push(doc)
        })

        return arr[Math.floor(Math.random() * arr.length)]
    }

    async getRandomValue(field){
        const coll = this.buildCollectionRef()
        const docs = await coll.get()
        const arr = []
        docs.forEach((doc) => {
            arr.push(doc.data()[field])
        })

        return arr[Math.floor(Math.random() * arr.length)]
    }

    async getRandomReference(){
        const coll = this.buildCollectionRef()
        const docs = await coll.get()
        const arr = []
        docs.forEach((doc) => {
            arr.push(doc.id)
        })

        return coll.doc(arr[Math.floor(Math.random() * arr.length)])
    }
}