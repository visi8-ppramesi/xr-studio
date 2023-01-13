const Factory = require("./factory")
const faker = require('../utils/faker')

module.exports = class EquipmentCategoryFactory extends Factory{
    static collectionName = 'equipment_categories'
    constructor(){
        super('equipment_categories')
    }

    static async createData(){
        return {
            name: faker.hacker.noun(),
        }
    }
}