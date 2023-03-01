const isNil = require("lodash/isNil")
const isObject = require("lodash/isObject")
const isArray = require("lodash/isArray")
const isString = require("lodash/isString")

const createCheckFunction = function(role){
    return async function(user, dbInstance){
        if(isNil(user)){
            return false
        }
    
        if(isObject(user)){
            if('uid' in user){
                user = user.uid
            }else{
                return false
            }
        }
    
        if(isString(user)){
            const isAdmin = await dbInstance.collection("user_roles").doc(user).get().then((snap) => {
                const roles = snap.get('roles')
                if(!isNil(roles) && isArray(roles)){
                    return roles.includes(role)
                }else{
                    return false
                }
            })
    
            return isAdmin
        }else{
            return false
        }
    }
}

exports.createCheckFunction = createCheckFunction
exports.isUserAdmin = createCheckFunction("admin")
exports.isUserCreator = createCheckFunction("creator")
exports.isUserClient = createCheckFunction("client")