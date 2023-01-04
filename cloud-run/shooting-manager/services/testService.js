const { decode: bufferDecoder } = require('../utils/bufferEncoder')
const { getTokenId } = require('../utils/getTokenId.js')

module.exports = function(){
    return function(req, res) {
        console.log(req.body)
        const tokenId = getTokenId(req)
        const data = bufferDecoder(req.body.message.data)
        res.send(JSON.stringify({decoded: data, token: tokenId}));
    } 
}