const faker = require('../../utils/faker')
const Factory = require('../factory.js')
const UserFactory = require('../users/users.js')
const OrderVersionFactory = require('./order-versions/orderVersions')

module.exports = class OrderFactory extends Factory{
    static collectionName = 'orders'
    constructor(){
        super('orders')
        this.subjects = []
    }

    static async createData(){
        const userFactory = new UserFactory()
        return {
            created_date: new Date(),
            subjects: [
                await userFactory.getRandomReference(),
                await userFactory.getRandomReference()
            ]
        }
    }

    async createDoc(id = null){
        const data = await this.constructor.createData()
        const {ref, id: newId} = this.buildNewDocRef(id)
        this.subjects = data.subjects
        this.data = data
        this.ref = ref
        this.id = newId
        return ref.set(data)
    }

    async createSubDocs(revNum, userId, privateKey, shoot){
        let previousHash = null
        let previousVersion = null
        let previousSignatures = []
        const orderFields = {}
        const childInstances = []
        for(let i = 1; i < revNum; i++){
            const newChildInstance = new OrderVersionFactory([this.constructor.collectionName, this.id])
            const { refPromise, data, ref } = await newChildInstance.createDoc(i, 'unpaid', previousVersion, previousHash, previousSignatures, privateKey, userId, shoot)
            previousHash = data['previous_hash']
            previousSignatures = data['signatures']
            previousVersion = ref

            childInstances.push(newChildInstance)
        }
        const lastChildInstance = new OrderVersionFactory([this.constructor.collectionName, this.id])
        const { refPromise, data, ref } = await lastChildInstance.createDoc(revNum, 'unpaid', previousVersion, previousHash, previousSignatures, privateKey, userId, shoot)

        childInstances.push(lastChildInstance)

        await this.db
            .collection(this.constructor.collectionName)
            .doc(this.id)
            .update({ current_order: ref, order_fields: orderFields })

        return childInstances
    }

    // async createHistoriedOrders(revNum, user, privateKey, shoot){
    //     const childInstance = new OrderVersionFactory([this.constructor.collectionName, this.id], this)
    //     let previousHash = null
    //     let previousVersion = null
    //     let previousSignatures = []
    //     const orderFields = {}
    //     for(let i = 1; i < revNum; i++){
    //         const { refPromise, data } = await childInstance.createDoc(i, 'expired', previousVersion, previousHash, previousSignatures, privateKey, user.id, shoot)
    //         previousHash = data['previous_hash']
    //         previousSignatures = data['previous_signatures']
    //         previousVersion = ref
    //         Object.keys(data['order_data']).forEach((field) => {
    //             orderFields[field] = true
    //         })
    //         await refPromise
    //     }
    //     const { refPromise, data, ref } = await childInstance.createDoc(i, 'current', previousVersion, previousHash, previousSignatures, privateKey, user.id, shoot)
    //     Object.keys(data['order_data']).forEach((field) => {
    //         orderFields[field] = true
    //     })
    //     await refPromise

    //     return this.db
    //         .collection(this.constructor.collectionName)
    //         .doc(this.id)
    //         .update({ current_order: ref, order_fields: orderFields })
    // }
}