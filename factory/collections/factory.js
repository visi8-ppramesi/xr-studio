const { admin } = require('../utils/initializeFirebaseAdmin.js')
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash')

const db = admin.firestore();
const storage = admin.storage();
const auth = admin.auth()

module.exports = class Factory{
    static collectionName = ''
    constructor(collectionPath, parent = null){
        this.db = db
        this.storage = storage
        this.auth = auth
        this.parent = parent
        this.collectionPath = collectionPath
        this.children = []
        this.data = null
        this.ref = null
        this.id = null
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

    static async createDocs(instanceNum){
        const factories = []
        for(let i = 0; i < instanceNum; i++){
            const instance = new this()
            instance.createDoc()
            factories.push(instance)
        }
        return factories
    }

    async createSubDoc(child){
        const childInstance = new child([this.constructor.collectionName, this.id], this)
        childInstance.createDoc()
        this.children.push(childInstance)
        return childInstance
    }

    async createSubDocs(children){
        return children.map(this.createSubDoc)
    }

    async getRandomProjection(fields){
        const rdDoc = this.getRandomDoc()
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