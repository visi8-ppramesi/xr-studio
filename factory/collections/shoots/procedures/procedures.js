const Factory = require('../../factory')
const ProcedureTypeFactory = require('../../procedure-types/procedureTypes')
const { vedhg } = require('../../../utils/dateRangeHash.js')

module.exports = class ShootProcedureFactory extends Factory{
    static collectionName = 'procedures'
    constructor(parent){
        super()
        this.setCollectionPath([...parent, this.constructor.collectionName])
    }

    static async createData(typeProjection){
        const future = Math.round(Math.random() * 150000) * 100000
        const endFuture = Math.round(Math.random() * 150000) * 100000
        const start = new Date(new Date().getTime() + future)
        const end = new Date(new Date().getTime() + future + endFuture)
        return {
            status: ['created'],
            procedure_type: typeProjection.id,
            procedure_data: {
                hello: 'is it me your looking for',
                ican: 'see it in your eyes',
                i: 'can see it in your smile'
            },
            procedure_start: start,
            procedure_end: end,
            price: Math.round(Math.random() * 100) * 100
        }
    }

    async createDoc(){
        const type = new ProcedureTypeFactory()
        const typeProjection = await type.getRandomDoc()
        const data = await this.constructor.createData(typeProjection)
        const hashId = 'ft-' + [typeProjection.data().procedure_code, vedhg.encodeDates(data.procedure_start, data.procedure_end)].join('.')
        const {ref, id: newId} = this.buildNewDocRef(hashId)
        this.data = data
        this.ref = ref
        this.id = newId
        return ref.set(data)
    }
}