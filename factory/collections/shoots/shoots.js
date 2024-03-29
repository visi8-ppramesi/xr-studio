const faker = require('../../utils/faker')
const Factory = require('../factory.js')
// const AssetFactory = require('../assets/assets')
const UserFactory = require('../users/users')
const ProcedureTypeFactory = require('../procedure-types/procedureTypes')
const ShootProcedureFactory = require('./procedures/procedures')
const ShootAssetFactory = require('./assets/assets')
const ShootEquipmentFactory = require('./equipments/equipments')
const CalendarFactory = require('../calendar/calendar')
const { vedhg } = require('../../utils/dateRangeHash.js')

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
        const randomDays = Math.floor(Math.random() * 120)
        const lockedStart = new Date(new Date().setDate(new Date().getDate() + randomDays + 7))
        const lockedEnd = new Date(new Date().setDate(new Date().getDate() + randomDays + 14))
        return {
            created_by: userFactory.buildNewDocRef("GmfvJltNOZdviM9nMW59fhqc3g53").ref,
            created_date: new Date(),
            locked_in_start_date: lockedStart,
            locked_in_end_date: lockedEnd,
            locked_in_hash: vedhg.encodeDates(lockedStart, lockedEnd),
            location: 'main-location',
            // assets: [ 
            //     await assetFactory.getRandomProjection(['name', 'preview_url']),
            //     await assetFactory.getRandomProjection(['name', 'preview_url']),
            //     await assetFactory.getRandomProjection(['name', 'preview_url']),
            //     await assetFactory.getRandomProjection(['name', 'preview_url']),
            // ],
            order: order,
            status: ['go-ahead', 'paid', 'approved'],
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
                {
                    note: 'greenlit',
                    status: 'approved',
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
        // const cal = new CalendarFactory()
        // const calPromise = cal.createDoc(
        //     data.locked_in_start_date,
        //     data.locked_in_end_date,
        //     ref,
        //     {
        //         status: data.status,
        //         location: data.location
        //     }
        // )

        const spf = new ShootProcedureFactory(parent)
        const sef = new ShootEquipmentFactory(parent)
        const saf = new ShootAssetFactory(parent)
        const spfPromise = spf.createDoc()
        const sefPromise = sef.createDoc()
        const safPromise = saf.createDoc()
        await Promise.all([
            // calPromise,
            spfPromise,
            sefPromise,
            safPromise
        ])
        return retVal
    }
}