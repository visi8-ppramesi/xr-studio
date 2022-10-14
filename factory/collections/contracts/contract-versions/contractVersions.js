const faker = require('../../../utils/faker')
const Factory = require('../../factory.js')
const { hash, signMessage, stabilizeObject } = require('../../../utils/crypto')
const _ = require('lodash')

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = class ContractVersionFactory extends Factory{
    static collectionName = 'contract_versions'
    constructor(parent){
        super()
        this.setCollectionPath([...parent, this.constructor.collectionName])
    }

    static async createPlainData(){
        let totalTextAggr = []
        const data = Array(5 + Math.floor(Math.random() * 15)).fill().reduce((acc, v, idx) => {
            let val
            const which = Math.floor(Math.random() * 4)
            switch(which){
                case 0:
                    val = Math.floor(Math.random() * 1000)
                    break;
                case 1:
                    val = randomDate(new Date('1989'), new Date('2022'))
                    break;
                case 2:
                    val = faker.hacker.phrase()
                    break;
                case 3:
                    val = Math.random() > 0.5
                    break;
            }
            const name = faker.hacker.verb() + faker.hacker.verb()
            totalTextAggr.push(name)
            totalTextAggr.push(val)
            acc[name.split(/[^((a-z)|(A-Z))]/).join('')] = val
            return acc
        }, {})
        return {
            contract_text: totalTextAggr.map(v => v.toString()).join(' ') + ' ' + faker.lorem.paragraph(),
            contract_data: data,
            file_urls: ['gs://xr-studio-a9c5e.appspot.com/alan_moore.jpg'],
        }
    }

    static async createData(version, status, previousVersion, previousHash, previousSignatures, privKey, userId){
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

        const stabilizedObject = stabilizeObject(toReturn)

        if(!_.isNil(previousVersion)){
            stabilizedObject['previous_version'] = previousVersion
        }

        return stabilizedObject
    }

    async createDoc(version, status, previousVersion, previousHash, previousSignatures, privKey, userId){
        const data = await this.constructor.createData(version, status, previousVersion, previousHash, previousSignatures, privKey, userId)
        const {ref, id: newId} = this.buildNewDocRef()
        this.data = data
        this.ref = ref
        this.id = newId
        return { refPromise: await ref.set(data), data, ref, id: newId }
    }
}