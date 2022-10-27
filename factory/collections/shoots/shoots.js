const faker = require('../../utils/faker')
const Factory = require('../factory.js')
// const AssetFactory = require('../assets/assets')
const UserFactory = require('../users/users')
const ProcedureTypeFactory = require('../procedure-types/procedureTypes')
const ShootProcedureFactory = require('./procedures/procedures')
const ShootAssetFactory = require('./assets/assets')
const ShootEquipmentFactory = require('./equipments/equipments')

module.exports = class ShootFactory extends Factory{
    static collectionName = 'shoots'
    static subcollections = [ShootProcedureFactory, ShootAssetFactory, ShootEquipmentFactory]
    constructor(){
        super('shoots')
    }

    static async createData(order){
        // const assetFactory = new AssetFactory()
        const userFactory = new UserFactory()
        const procedureTypeFactory = new ProcedureTypeFactory()
        return {
            creation_date: new Date(),
            locked_in_start_date: new Date(new Date().setDate(new Date().getDate() + 7)),
            locaked_in_end_date: new Date(new Date().setDate(new Date().getDate() + 365)),
            location: 'main-location',
            // assets: [ 
            //     await assetFactory.getRandomProjection(['name', 'preview_url']),
            //     await assetFactory.getRandomProjection(['name', 'preview_url']),
            //     await assetFactory.getRandomProjection(['name', 'preview_url']),
            //     await assetFactory.getRandomProjection(['name', 'preview_url']),
            // ],
            order: order,
            current_statuses: ['go-ahead', 'paid'],
            status_history: [
                {
                    note: 'started',
                    status: 'unpaid',
                    date: new Date(new Date().setDate(new Date().getDate() - 365)),
                    processed_by: await userFactory.getRandomReference()
                },
                {
                    note: 'something happened',
                    status: 'unpaid',
                    date: new Date(new Date().setDate(new Date().getDate() - 200)),
                    processed_by: await userFactory.getRandomReference()
                },
                {
                    note: 'shoot paid',
                    status: 'paid',
                    date: new Date(new Date().setDate(new Date().getDate() - 100)),
                    processed_by: await userFactory.getRandomReference()
                },
                {
                    note: 'greenlit',
                    status: 'go-ahead',
                    date: new Date(new Date().setDate(new Date().getDate() - 50)),
                    processed_by: await userFactory.getRandomReference()
                },
            ],
            procedure_type: await procedureTypeFactory.getRandomReference()
        }
    }

    async createDoc(order, id = null){
        const data = await this.constructor.createData(order)
        const {ref, id: newId} = this.buildNewDocRef(id)
        const parent = [this.constructor.collectionName, newId]
        this.data = data
        this.ref = ref
        this.id = newId
        const retVal = await ref.set(data)
        const spf = new ShootProcedureFactory(parent)
        const sef = new ShootEquipmentFactory(parent)
        const saf = new ShootAssetFactory(parent)
        await spf.createDoc()
        await sef.createDoc()
        await saf.createDoc()
        return retVal
    }
}