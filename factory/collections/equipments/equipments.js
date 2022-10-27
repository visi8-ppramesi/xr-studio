const faker = require('../../utils/faker')
const Factory = require('../factory.js')

module.exports = class EquipmentFactory extends Factory{
    static collectionName = 'equipments'
    constructor(){
        super('equipments')
    }

    static async createData(){
        return {
            name: faker.hacker.noun(),
            preview_url: Math.random() > 0.5 ? 
                "https://firebasestorage.googleapis.com/v0/b/xr-studio-a9c5e.appspot.com/o/equipments%2Fcamera.jpeg?alt=media" :
                "https://firebasestorage.googleapis.com/v0/b/xr-studio-a9c5e.appspot.com/o/equipments%2Flight.jpg?alt=media",
            categories: [faker.hacker.noun(), faker.hacker.noun()],
            price: Math.round(Math.random() * 100) / 100,
            model:faker.hacker.verb(),
            manufacturer: faker.hacker.noun(),
            description: faker.hacker.noun(),
            on_inventory: Math.round(Math.random() * 100),
        }
    }
}