const store = require('./storeMock')
const _ = require('lodash')
const startCase = require('lodash/startCase')
const remove = require("lodash/remove")
const isEqual = require("lodash/isEqual")
const partial = require("lodash/partial")
const curry = require("lodash/curry")
// const { state } = require('./storeMock')

const isSomething = (obj, type) => Object.prototype.toString.call(obj).indexOf(startCase(type)) > -1

// function getFunctionName(){
//     let callerName
//     try{throw new Error()}catch(e){
//         const split = e.stack.split('\n')
//         const fnameLoc = e.stack.indexOf('getFunctionName')
//         let counter = 0
//         for(let i = 0; i < split.length; i++){
//             counter += split[i].length
//             if(fnameLoc < counter){
//                 const callerNameArr = split[i + 1].substring(7).split(' ')
//                 callerNameArr.pop()
//                 callerName = callerNameArr.join(' ')
//                 break
//             }
//         }
//     }
//     return callerName
// }

// class Test{
//     constructor(myName){
//         this.myName = myName
//     }

//     static createTest(){
//         return new this(getFunctionName())
//     }
// }

// const test = Test.createTest()
// console.log(test.myName)

class FieldValue{
    constructor(obj, type){
        this.obj = obj
        this.type = type
    }

    static arrayUnion(){
        return new this([...arguments], 'arrayUnion')
    }

    static arrayRemove(){
        return new this([...arguments], 'arrayRemove')
    }
}

class Collection{
    constructor(path){
        this.path = path
    }

    get ref(){
        return this
    }

    async get(){
        const data = store.getState(this.path)
        if(_.isNil(data)){
            return {
                empty: true
            }
        }

        const docs = Object.keys(data).map((key) => {
            const myDoc = new Doc([...this.path, key])
            return {
                data(){
                    return data[key]
                },
                id: key,
                ref: myDoc.ref
            }
        })
        return {
            docs,
            forEach(fun){return docs.forEach(fun)},
            map(fun){return docs.map(fun)},
            reduce(fun){return docs.reduce(fun)},
            empty: false
        }
    }

    async set(data, opts = {}){
        opts.merge = opts.merge || false
        store.setState(this.path, data, opts.merge)
    }

    async update(data){
        store.setState(this.path, data, true)
    }

    count(){
        const self = this
        return {
            async get(){
                return {
                    data(){
                        const data = store.getState(self.path);
                        const count = (() => {
                            if(isSomething(data, 'Array')){
                                return data.length
                            }else if(isSomething(data, 'Object')){
                                return Object.keys(data).length
                            }else{
                                return null
                            }
                        })();
                        return {
                            count
                        }
                    }
                }
            }
        }
    }

    static buildNew(path){
        return new this(path)
    }

    where(){
        return this
    }

    delete(){
        store.deleteState(this.path)
    }
}

class Doc{
    constructor(path){
        this.path = path
    }

    get id(){
        return this.path[this.path.length - 1]
    }

    get ref(){
        return this
    }

    async get(){
        const self = this
        return {
            data(){
                return store.getState(self.path)
            },
            id: this.path[this.path.length - 1],
            ref: self.ref,
            get(field){
                try{
                    return store.getState(self.path)[field]
                }catch(e){
                    return null
                }
            }
        }
    }

    async set(data, opts = {}){
        opts.merge = opts.merge || false
        Object.keys(data).map((key) => {
            if(data[key] instanceof FieldValue){
                const currentData = store.getState([...this.path, key]) || []
                switch(data[key].type){
                    case 'arrayUnion': {
                        data[key] = [...new Set([...currentData, ...data[key].obj])]
                        break
                    }
                    case 'arrayRemove': {
                        currentData.forEach(toRemove => {
                            remove(currentData, partial(isEqual, toRemove))
                        })
                        data[key] = currentData
                    }
                    default: {
                        break
                    }
                }
            }
        })
        store.setState(this.path, data, opts.merge)
    }

    async update(data){
        store.setState(this.path, data, true)
    }

    async delete(){
        store.deleteState(this.paths)
    }

    static buildNew(path){
        return new this(path)
    }

    async delete(){
        store.deleteState(this.path)
    }
}

Doc.prototype.collection = function(collName){
    const newPath = [...this.path]
    newPath.push(collName)
    return Collection.buildNew(newPath)
}

Collection.prototype.doc = function(docId){
    const newPath = [...this.path]
    newPath.push(docId)
    return Doc.buildNew(newPath)
}
const firestore = function(){
    return {
        collection(collName){
            if(_.isArray(collName)){
                return Collection.buildNew(collName)
            }else if(_.isString(collName)){
                return Collection.buildNew([collName])
            }
        },
        recursiveDelete(ref){
            store.deleteState(ref.path)
        },
        batch(){
            const funcsArr = []
            return {
                create(documentRef, data){
                    //implement later

                },
                set(documentRef, data){
                    funcsArr.push(() => {
                        return documentRef.set(data)
                    })
                },
                update(documentRef, data){
                    funcsArr.push(() => {
                        return documentRef.update(data)
                    })
                },
                delete(documentRef){
                    funcsArr.push(() => {
                        return documentRef.delete()
                    })
                },
                async commit(){
                    return Promise.all(funcsArr.map(v => v()))
                }
            }
        },
        store
    }
}
firestore.FieldValue = FieldValue

module.exports = {
    initializeApp: () => {},
    credential: {
        cert: () => {}
    },
    firestore,
    storage(){
        return {
            
        }
    },
    auth(){
        return {
            async createUser({uid}){
                return {
                    uid
                }
            },
            async deleteUser(uid){
                return true
            },
            async verifyIdToken(token){
                return {
                    uid: 'test-user-uid'
                }
            }
        }
    }
}