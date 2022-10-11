const { faker } = require('@faker-js/faker')
const Factory = require('../factory.js')
const ContractVersionFactory = require('./contract-versions/contractVersions')

module.exports = class ContractFactory extends Factory{
    static collectionName = 'contracts'
    constructor(){
        super('contracts')
    }

    static async createData(){
        return {
            name: faker.hacker.noun(),
            created_date: new Date(),
            contract_fields: {
                name: true,
                start_date: true,
                end_date: true
            },
            contract_type: 'digital'
        }
    }

    async createSubDoc(version, status, previousHash, signatures){
        const childInstance = new ContractVersionFactory([this.constructor.collectionName, this.id], this)
        childInstance.createDoc(version, status, previousHash, signatures)
        this.children.push(childInstance)
    }

    async createHistoriedContracts(revNum, user, privateKey){
        const childInstance = new ContractVersionFactory([this.constructor.collectionName, this.id], this)
        let previousHash = null
        let previousVersion = null
        let previousSignatures = []
        const contractFields = {}
        for(let i = 1; i < revNum; i++){
            const { refPromise, data, ref } = await childInstance.createDoc(i, 'expired', previousVersion, previousHash, previousSignatures, privateKey, user.id)
            previousHash = data['previous_hash']
            previousSignatures = data['previous_signatures']
            previousVersion = ref
            Object.keys(data['contract_data']).forEach((field) => {
                contractFields[field] = true
            })
            await refPromise
        }
        const { refPromise, data, ref } = await childInstance.createDoc(i, 'current', previousVersion, previousHash, previousSignatures, privateKey, user.id)
        Object.keys(data['contract_data']).forEach((field) => {
            contractFields[field] = true
        })
        await refPromise

        return this.db
            .collection(this.constructor.collectionName)
            .doc(this.id)
            .update({ current_contract: ref, contract_fields: contractFields })
    }
}