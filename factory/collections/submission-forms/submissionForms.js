const faker = require('../../utils/faker')
const Factory = require('../factory.js')
const UserFactory = require('../users/users')

module.exports = class SubmissionFormFactory extends Factory{
    static collectionName = 'submission_forms'
    constructor(){
        super('submission_forms')
    }

    static async createData(asset){
        const userFactory = new UserFactory()
        return {
            user: await userFactory.getRandomReference(),
            description: faker.lorem.paragraphs(10),
            preview_urls: 'gs://xr-studio-a9c5e.appspot.com/alan_moore.jpg',
            current_status: ['not-processed', 'not-checked'],
            status_history: [
                {
                    note: 'just created',
                    status: 'created',
                    date: new Date(),
                    processed_by: null
                }
            ],
            submission_date: new Date(),
            updated_date: new Date(),
            asset: asset,
        }
    }

    async createDoc(asset, id = null){
        const data = await this.constructor.createData(asset)
        const {ref, id: newId} = this.buildNewDocRef(id)
        this.data = data
        this.ref = ref
        this.id = newId
        return ref.set(data)
    }
}