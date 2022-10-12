const faker = require('../../../utils/faker')
const Factory = require('../../factory.js')
const { hash, signMessage, stabilizeObject } = require('../../../utils/crypto')
const _ = require('lodash')

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = class OrderVersionFactory extends Factory{
    static collectionName = 'order_versions'
    constructor(parent){
        super()
        this.setCollectionPath([...parent, this.constructor.collectionName])
    }

    static async createPlainData(){
        const items = [
            faker.hacker.noun(),
            faker.hacker.noun(),
            faker.hacker.noun(),
            faker.hacker.noun(),
            faker.hacker.noun()
        ]
        let total = 0
        const itemizedPrice = items.reduce((acc, v) => {
            acc[v] = Math.floor(Math.random() * 10000) / 100
            total += acc[v]
            return acc
        }, {})
        return {
            items: items,
            itemized_price: itemizedPrice,
            total_price: Math.round(total * 100) / 100,
            tax: 0,
            payment_method: 'credit-card',
            location: 'test'
        }
    }

    static async createData(version, status, previousVersion, previousHash, previousSignatures, privKey, userId, shoot = null){
        const plainData = await this.createPlainData()
        const currentHash = await hash(plainData)
        const toSign = {
            ...plainData, 
            current_hash: currentHash, 
            version, 
            status, 
            signatures: [...previousSignatures]
        }
        if(!_.isNil(previousHash)){
            toSign['previous_hash'] = previousHash
        }
        if(!_.isNil(previousVersion)){
            toSign['previous_version'] = previousVersion
        }
        if(!_.isNil(shoot)){
            toSign['shoot'] = shoot
        }
        const signature = await signMessage(toSign, privKey, '123qweasd')

        const toReturn = {
            ...plainData, 
            current_hash: currentHash, 
            version, 
            status, 
            signatures: [...previousSignatures, {signature, userId}]
        }
        if(!_.isNil(previousHash)){
            toReturn['previous_hash'] = previousHash
        }
        if(!_.isNil(previousVersion)){
            toReturn['previous_version'] = previousVersion
        }
        if(!_.isNil(shoot)){
            toReturn['shoot'] = shoot
        }

        return stabilizeObject(toReturn)
    }

    async createDoc(version, status, previousVersion, previousHash, previousSignatures, privKey, userId, shoot = null){
        const data = await this.constructor.createData(version, status, previousVersion, previousHash, previousSignatures, privKey, userId, shoot)
        const {ref, id: newId} = this.buildNewDocRef()
        this.data = data
        this.ref = ref
        this.id = newId
        return { refPromise: await ref.set(data), data, ref, id: newId }
    }
}