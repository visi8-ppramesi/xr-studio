const { vedhg } = require('./dateRangeHash.js')
const { v4 } = require("uuid")
const isNil = require('lodash/isNil')

function setIdIfNotSet(obj, isProcedure = false, debug = false) {
    if (isNil(obj.id)) {
        if(isProcedure){
            let { procedure_code: procedureCode, procedure_start: procedureStart, procedure_end: procedureEnd } = obj
            procedureCode = procedureCode || '000'
            const encoded = vedhg.encodeDates(procedureStart, procedureEnd)
            obj.id = [procedureCode, encoded].join('.')
        }else{
            obj.id = (debug ? "ft-" : "") + v4()
        }
    }
    return obj
}

module.exports = setIdIfNotSet