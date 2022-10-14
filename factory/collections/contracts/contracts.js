const faker = require('../../utils/faker')
const Factory = require('../factory.js')
const UserFactory = require('../users/users.js')
const ContractVersionFactory = require('./contract-versions/contractVersions')

module.exports = class ContractFactory extends Factory{
    static collectionName = 'contracts'
    static subcollections = [ContractVersionFactory]
    constructor(){
        super('contracts')
        this.subjects = []
    }

    static async createData(){
        const userFactory = new UserFactory()
        return {
            name: faker.hacker.noun(),
            created_date: new Date(),
            contract_fields: {
                name: true,
                start_date: true,
                end_date: true
            },
            contract_type: 'digital',
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

    async createSubDoc(version, status, previousHash, signatures){
        const childInstance = new ContractVersionFactory([this.constructor.collectionName, this.id])
        childInstance.createDoc(version, status, previousHash, signatures)
        this.children.push(childInstance)
    }

    async createSubDocs(revNum, userId, privateKey){
        console.log('creating ' + this.constructor.collectionName + ' versions')
        let previousHash = null
        let previousVersion = null
        let previousSignatures = []
        const contractFields = {}
        const childInstances = []
        for(let i = 1; i < revNum; i++){
            const newChildInstance = new ContractVersionFactory([this.constructor.collectionName, this.id])
            const { refPromise, data, ref } = await newChildInstance.createDoc(i, 'expired', previousVersion, previousHash, previousSignatures, privateKey, userId)
            previousHash = data['previous_hash']
            previousSignatures = data['signatures']
            previousVersion = ref
            Object.keys(data['contract_data']).forEach((field) => {
                contractFields[field] = true
            })
            childInstances.push(newChildInstance)
        }
        const lastChildInstance = new ContractVersionFactory([this.constructor.collectionName, this.id])
        const { refPromise, data, ref } = await lastChildInstance.createDoc(revNum, 'current', previousVersion, previousHash, previousSignatures, privateKey, userId)
        Object.keys(data['contract_data']).forEach((field) => {
            contractFields[field] = true
        })
        childInstances.push(lastChildInstance)

        await this.db
            .collection(this.constructor.collectionName)
            .doc(this.id)
            .update({ current_contract: ref, contract_fields: contractFields })
        
        console.log(this.constructor.collectionName + ' versions created')
        return childInstances
    }
}