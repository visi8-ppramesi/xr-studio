const Factory = require("./factory")
const faker = require('../utils/faker')

module.exports = class AssetCategoryFactory extends Factory{
    static collectionName = 'asset_categories'
    constructor(){
        super('asset_categories')
    }

    static async createData(){
        return {
            name: faker.hacker.noun(),
        }
    }
}