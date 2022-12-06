const AssetFactory = require('../../assets/assets')
const Factory = require('../../factory')

module.exports = class ShootAssetFactory extends Factory{
    static collectionName = 'assets'
    constructor(parent){
        super()
        console.log('shoot asset', [...parent, this.constructor.collectionName])
        this.setCollectionPath([...parent, this.constructor.collectionName])
    }

    static async createData(){
        const asset = new AssetFactory()
        const assetProjection = await asset.getRandomProjection(['id', 'name', 'preview_url'])
        const assetId = assetProjection.id
        return {
            asset: assetProjection,
            asset_id: assetId,
            price: Math.round(Math.random() * 100) * 100
        }
    }
}