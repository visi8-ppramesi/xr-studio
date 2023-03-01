const { vedhg } = require('./dateRangeHash.js')
const { v4 } = require("uuid")
const isNil = require('lodash/isNil')

function setIdIfNotSet(obj, debug = false) {
    if (isNil(obj.id)) {
        let { tour_start_date: startDate, tour_end_date: endDate } = obj
        procedureType = "studio_tour"
        const encoded = vedhg.encodeDates(startDate, endDate, procedureType)
        obj.id = (debug ? "ft-" : "") + encoded
    }
    return obj
}

module.exports = setIdIfNotSet