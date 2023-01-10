const { vedhg } = require('./dateRangeHash.js')
const { v4 } = require("uuid")
const isNil = require('lodash/isNil')

function setIdIfNotSet(obj, isProcedure = false, debug = false) {
    if (isNil(obj.id)) {
        if(isProcedure){
            let { procedure_type: procedureType, procedure_start: procedureStart, procedure_end: procedureEnd } = obj
            procedureType = procedureType || '000'
            const encoded = vedhg.encodeDates(procedureStart, procedureEnd, procedureType)
            obj.id = (debug ? "ft-" : "") + encoded
        }else{
            obj.id = (debug ? "ft-" : "") + v4()
        }
    }
    return obj
}

module.exports = setIdIfNotSet