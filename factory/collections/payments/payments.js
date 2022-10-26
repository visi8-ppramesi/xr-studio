const faker = require('../../utils/faker')
const Factory = require('../factory.js')
const { signMessage, stabilizeObject } = require('../../utils/crypto')

module.exports = class PaymentFactory extends Factory{
    static collectionName = 'payments'
    constructor(){
        super('payments')
    }

    static async createData(sender, receiver, forObj, status, contracts, privKey, userId){
        const amount = Math.round(Math.random() * 10000) / 100
        const toSignObj = {
            sender,
            receiver,
            created_date: new Date(),
            for: forObj,
            description: faker.lorem.paragraphs(2),
            amount: amount,
            tax: Math.round(amount * 0.15 * 100) / 100,
            total: Math.round(amount * 1.15 * 100) / 100,
            status,
            contracts
        }

        const signature = await signMessage(toSignObj, privKey, '123qweasd')
        const toReturn = stabilizeObject({
            ...toSignObj,
            signature: {userId: sender, signature}
        })

        return toReturn
    }

    async createDoc(sender, receiver, forObj, status, contracts, privKey){
        const data = await this.constructor.createData(sender, receiver, forObj, status, contracts, privKey)
        const {ref, id: newId} = this.buildNewDocRef()
        this.data = data
        this.ref = ref
        this.id = newId
        return { refPromise: ref.set(data), data, ref, id: newId }
    }
}