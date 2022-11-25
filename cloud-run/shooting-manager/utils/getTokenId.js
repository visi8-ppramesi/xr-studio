"use strict";

const isNil = require('lodash/isNil')

exports.getTokenId = function(request){
    const authHeader = request.header('Authorization')
    if(isNil(authHeader)){ return null }
    if(!authHeader.startsWith('Bearer ')){ return null }

    return authHeader.substring(7)
}