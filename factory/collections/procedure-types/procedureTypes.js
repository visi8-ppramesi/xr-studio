const faker = require('../../utils/faker')
const Factory = require('../factory.js')

module.exports = class ProcedureTypeFactory extends Factory{
    static collectionName = 'procedure_types'
    constructor(){
        super('procedure_types')
    }

    static async createData(){
        return {
            name: faker.hacker.verb() + ' ' + faker.hacker.verb(),
            description: Array(10).fill().map(v => faker.hacker.phrase()).join(' '),
            procedure_code: Math.random().toString(36).substring(2, 5),
            procedures: [
                {
                    name: 'step 1',
                    required_fields: ['stuff', 'stuff2'],
                    optional_fields: ['stuff3', 'stuff4']
                },
                {
                    name: 'step 2',
                    required_fields: ['stuff', 'stuff2'],
                    optional_fields: ['stuff3', 'stuff4']
                },
                {
                    name: 'step 3',
                    required_fields: ['stuff', 'stuff2'],
                    optional_fields: ['stuff3', 'stuff4']
                },
            ]
        }
    }
}