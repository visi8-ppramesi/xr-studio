const faker = require('../../utils/faker')
const Factory = require('../factory.js')
const UserFactory = require('../users/users')

module.exports = class AssetFactory extends Factory{
    static collectionName = 'assets'
    constructor(){
        super('assets')
    }

    static async createData(){
        const userFactory = new UserFactory()
        return {
            name: faker.hacker.noun(),
            description: Array(10).fill().map(v => faker.hacker.phrase()).join(' '),
            categories: [faker.hacker.noun(), faker.hacker.noun(), faker.hacker.noun()],
            group: [],
            created_date: new Date(),
            preview_url: [
                'https://firebasestorage.googleapis.com/v0/b/xr-studio-a9c5e.appspot.com/o/assets%2F1.jpg?alt=media',
                'https://firebasestorage.googleapis.com/v0/b/xr-studio-a9c5e.appspot.com/o/assets%2F2.jpg?alt=media'
            ],
            assets_url: 'asset://visi8-server/stuff/asset/',
            user_data: await userFactory.getRandomProjection(['username', 'email'], 'creator'),
            price: Math.round(Math.random() * 100) * 100000
        }
    }
}