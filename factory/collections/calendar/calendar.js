const Factory = require('../factory.js')
const { vedhg } = require('../../utils/dateRangeHash.js')

module.exports = class CalendarFactory extends Factory{
    static collectionName = 'calendar'
    constructor(){
        super('calendar')
    }

    static async createData(startDate, endDate, eventId, eventObj){
        return {
            start_date: startDate,
            end_date: endDate,
            event_id: eventId,
            event: eventObj
        }
    }

    async createDoc(startDate, endDate, ev, { status, location }){
        const data = await this.constructor.createData(startDate, endDate, ev, { status, location })
        const hashId = 'ft-' + vedhg.encodeDates(startDate, endDate)
        const {ref, id: newId} = this.buildNewDocRef(hashId)
        this.data = data
        this.ref = ref
        this.id = newId
        return ref.set(data)
    }
}