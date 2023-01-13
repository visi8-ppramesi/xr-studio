const Factory = require("./factory")
const faker = require('../utils/faker')

module.exports = class EquipmentTypeFactory extends Factory{
    static collectionName = 'equipment_types'
    constructor(){
        super('equipment_types')
    }

    static async createData(){
        return {
            manufacturer_name: faker.hacker.noun(),
            models: [
                faker.hacker.noun(),
                faker.hacker.noun(),
                faker.hacker.noun(),
                faker.hacker.noun(),
                faker.hacker.noun(),
            ],
        }
    }
}