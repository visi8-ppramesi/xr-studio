// const faker = require('../../utils/faker')
const Factory = require('../factory.js')

const procedures = {
    "rent_non_xr_studio": {
        name: "Non XR Studio Rent",
        description: "General purpose studio time without XR",
        items_included: [
            {
                name: "studio_rent",
                description: "Studio Rent",
                price: 1.5e7
            }
        ],
        procedure_code: "001",
        procedures: [
            {
                name: "registration",
                required_fields: [
                    {
                        name: "start_date",
                        label: "Start Date",
                        type: "datepicker"
                    },
                    {
                        name: "end_date",
                        label: "End Date",
                        type: "datepicker"
                    }
                ],
                optional_fields: [
                    {
                        name: "notes",
                        label: "Notes",
                        type: "textarea"
                    }
                ]
            }
        ],
        stackable: 8,
        price: 1.5e7,
        price_unit: 'per day'
    },
    "rent_xr_studio": {
        name: "XR Studio Rent",
        description: "Studio time with XR",
        items_included: [
            {
                name: "studio_rent",
                description: "Studio Rent",
                price: 1.5e7
            },
            {
                name: "xr_equipments",
                description: "XR Equipments Rent",
                price: 1.15e8
            },
            {
                name: "xr_assets_management",
                description: "XR Management",
                price: 5e6
            }
        ],
        procedure_code: "002",
        procedures: [
            {
                name: "registration",
                required_fields: [
                    {
                        name: "start_date",
                        type: "datepicker"
                    },
                    {
                        name: "end_date",
                        type: "datepicker"
                    }
                ],
                optional_fields: [
                    {
                        name: "notes",
                        label: "Notes",
                        type: "textarea"
                    }
                ]
            }
        ],
        stackable: 8,
        price: 1.35e8,
        price_unit: 'per day'
    },
    "rent_studio_art_setup_non_xr": {
        name: "Studio Rent for Art Setup",
        description: "Studio time for setting up art",
        items_included: [
            {
                name: "studio_rent",
                description: "Studio Rent",
                price: 1.5e7
            }
        ],
        procedure_code: "003",
        procedures: [
            {
                name: "registration",
                required_fields: [
                    {
                        name: "start_date",
                        type: "datepicker"
                    },
                    {
                        name: "end_date",
                        type: "datepicker"
                    }
                ],
                optional_fields: [
                    {
                        name: "notes",
                        label: "Notes",
                        type: "textarea"
                    }
                ]
            }
        ],
        stackable: 4,
        price: 1.5e7,
        price_unit: 'per day'
    },
    "rent_studio_rehearsal": {
        name: "Studio Rent for Shoot Rehearsal",
        description: "Studio time for rehearsal. Cost includes XR assets management.",
        items_included: [
            {
                name: "studio_rent",
                description: "Studio Rent",
                price: 1.5e7
            },
            {
                name: "xr_assets_management",
                description: "XR Management",
                price: 5e6
            }
        ],
        procedure_code: "004",
        procedures: [
            {
                name: "registration",
                required_fields: [
                    {
                        name: "start_date",
                        type: "datepicker"
                    },
                    {
                        name: "end_date",
                        type: "datepicker"
                    }
                ],
                optional_fields: [
                    {
                        name: "notes",
                        label: "Notes",
                        type: "textarea"
                    }
                ]
            }
        ],
        stackable: 3,
        price: 2.5e7,
        price_unit: 'per day'
    },
    "rent_studio_art_setup_xr": {
        name: "Studio Rent for Art Setup",
        description: "Studio time for setting up art",
        items_included: [
            {
                name: "studio_rent",
                description: "Studio Rent",
                price: 1.5e7
            }
        ],
        procedure_code: "005",
        procedures: [
            {
                name: "registration",
                required_fields: [
                    {
                        name: "start_date",
                        type: "datepicker"
                    },
                    {
                        name: "end_date",
                        type: "datepicker"
                    }
                ],
                optional_fields: [
                    {
                        name: "notes",
                        label: "Notes",
                        type: "textarea"
                    }
                ]
            }
        ],
        stackable: 4,
        price: 1.5e7,
        price_unit: 'per day'
    }
}

module.exports = class ProcedureTypeFactory extends Factory{
    static collectionName = 'procedure_types'
    constructor(){
        super('procedure_types')
    }

    static async createData(type){
        if(type in procedures){
            return procedures[type]
        }else{
            throw new Error('procedure not found')
        }
        // return {
        //     name: faker.hacker.verb() + ' ' + faker.hacker.verb(),
        //     description: Array(10).fill().map(v => faker.hacker.phrase()).join(' '),
        //     procedure_code: Math.random().toString(36).substring(2, 5),
        //     procedures: [
        //         {
        //             name: 'step 1',
        //             required_fields: ['stuff', 'stuff2'],
        //             optional_fields: ['stuff3', 'stuff4']
        //         },
        //         {
        //             name: 'step 2',
        //             required_fields: ['stuff', 'stuff2'],
        //             optional_fields: ['stuff3', 'stuff4']
        //         },
        //         {
        //             name: 'step 3',
        //             required_fields: ['stuff', 'stuff2'],
        //             optional_fields: ['stuff3', 'stuff4']
        //         },
        //     ]
        // }
    }

    async createDoc(procName){
        const data = await this.constructor.createData(procName)
        const {ref, id: newId} = this.buildNewDocRef(procName)
        this.data = data
        this.ref = ref
        this.id = newId
        return ref.set(data)
    }

    static async createDocs(){
        console.log('creating ' + this.collectionName)
        const procNames = Object.keys(procedures)
        const factories = []
        for(let i = 0; i < procNames.length; i++){
            const instance = new this()
            await instance.createDoc(procNames[i])
            factories.push(instance)
        }
        console.log(this.collectionName + ' created')
        return factories
    }
}