const Factory = require('../factory.js')
const { vedhg } = require('../../utils/dateRangeHash.js')

module.exports = class CalendarFactory extends Factory{
    static collectionName = 'calendar'
    constructor(){
        super('calendar')
    }

    static async createData(startDate, endDate, ev){
        return {
            start_date: startDate,
            end_date: endDate,
            event: ev
        }
    }

    async createDoc(startDate, endDate, ev, id = null){
        const data = await this.constructor.createData(startDate, endDate, ev)
        const hashId = 'ft-' + vedhg.encodeDates(startDate, endDate)
        const {ref, id: newId} = this.buildNewDocRef(hashId)
        this.data = data
        this.ref = ref
        this.id = newId
        return ref.set(data)
    }
}