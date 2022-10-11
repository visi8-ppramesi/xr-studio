const { faker } = require('@faker-js/faker')
const Factory = require('../factory.js')
const OrderVersionFactory = require('./order-versions/orderVersions')

module.exports = class OrderFactory extends Factory{
    static collectionName = 'orders'
    constructor(){
        super('orders')
    }

    static async createData(){
        return {
            created_date: new Date(),
        }
    }

    async createSubDocs(revNum, user, privateKey, shoot){
        const childInstance = new OrderVersionFactory([this.constructor.collectionName, this.id], this)
        let previousHash = null
        let previousVersion = null
        let previousSignatures = []
        const orderFields = {}
        for(let i = 1; i < revNum; i++){
            const { refPromise, data } = await childInstance.createDoc(i, 'unpaid', previousVersion, previousHash, previousSignatures, privateKey, user.id, shoot)
            previousHash = data['previous_hash']
            previousSignatures = data['previous_signatures']
            previousVersion = ref
            Object.keys(data['order_data']).forEach((field) => {
                orderFields[field] = true
            })
            await refPromise
        }
        const { refPromise, data, ref } = await childInstance.createDoc(i, 'unpaid', previousVersion, previousHash, previousSignatures, privateKey, user.id, shoot)
        Object.keys(data['order_data']).forEach((field) => {
            orderFields[field] = true
        })
        await refPromise

        return this.db
            .collection(this.constructor.collectionName)
            .doc(this.id)
            .update({ current_order: ref, order_fields: orderFields })
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