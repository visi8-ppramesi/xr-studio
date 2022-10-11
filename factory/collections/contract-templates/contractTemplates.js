const { faker } = require('@faker-js/faker')
const Factory = require('../factory.js')

module.exports = class ContractTemplateFactory extends Factory{
    static collectionName = 'contract_templates'
    constructor(){
        super('contract_templates')
    }

    static async createData(){
        return {
            name: faker.hacker.verb() + ' ' + faker.hacker.verb(),
            contract_text: faker.lorem.paragraphs(10),
            contract_data_fields: Array(10).fill().map(v => faker.hacker.noun()),
            contract_file_url: 'gs://xr-studio-a9c5e.appspot.com/contract-template.docx'
        }
    }
}