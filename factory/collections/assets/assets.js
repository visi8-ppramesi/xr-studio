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
            preview_url: 'gs://xr-studio-a9c5e.appspot.com/alan_moore.jpg',
            assets_url: 'gs://xr-studio-a9c5e.appspot.com/alan_moore.jpg',
            user_data: await userFactory.getRandomProjection(['username', 'email'], 'creator'),
        }
    }
}