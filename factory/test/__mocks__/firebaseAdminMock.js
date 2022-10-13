const store = require('./storeMock')
const _ = require('lodash')

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

    async set(data){
        store.setState(this.path, data)
    }

    async update(data){
        store.setState(this.path, data, true)
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
            ref: self.ref
        }
    }

    async set(data){
        store.setState(this.path, data)
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

    delete(){
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
module.exports = {
    initializeApp: () => {},
    credential: {
        cert: () => {}
    },
    firestore(){
        return {
            collection(collName){
                if(_.isArray(collName)){
                    return Collection.buildNew(collName)
                }else if(_.isString(collName)){
                    return Collection.buildNew([collName])
                }
            },
            store
        }
    },
    storage(){
        return {
            
        }
    },
    auth(){
        return {
            async createUser({uid}){
                return {
                    user: {
                        uid
                    }
                }
            }
        }
    }
}