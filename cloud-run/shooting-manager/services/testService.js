const { admin } = require('../utils/initializeAdmin.js')

module.exports = function(fun){
    let count = 0
    const db = admin.firestore()
    const auth = admin.auth()

    const actualFunction = function(){
        fun(...arguments)
    }

    return (function helo(){
        if(count == 0){
            //do stuff with config
            count++
            return helo()
        }else{
            const rndStr = Math.random().toString(36).substring(2)
            actualFunction[rndStr] = count
            return actualFunction
        }
    })()
}