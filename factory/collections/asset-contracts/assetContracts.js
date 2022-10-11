const Factory = require('../factory.js')

module.exports = class AssetContractFactory extends Factory{
    static collectionName = 'assets'
    constructor(){
        super('assets')
    }

    static async createData(contract){
        return {
            contract: contract
        }
    }

    async createDoc(assetId, contract){
        const data = await this.constructor.createData(contract)
        const {ref, id: newId} = this.buildNewDocRef(assetId)
        this.data = data
        this.ref = ref
        this.id = newId
        return ref.set(data)
    }
}