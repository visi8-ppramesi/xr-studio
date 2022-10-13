const cloneDeep = require('lodash/cloneDeep')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const dataPath = path.resolve('test', 'result', 'generatedData.json')
let initData = {}
if(fs.existsSync(dataPath)){
    const genData = fs.readFileSync(dataPath, {encoding: 'utf-8'})
    if(genData.length > 0){
        initData = JSON.parse(genData)
    }
}

class Store{
    constructor(initState = null, indices = null){
        const state = initState || {}
        this.initState = cloneDeep(state)
        this.state = cloneDeep(state)
        this.locked = false
        this.indices = indices
    }

    lock(){
        this.locked = true
    }

    unlock(){
        this.locked = false
    }

    resetState(){
        this.state = cloneDeep(this.initState)
    }

    getState(paths){
        let data = this.state[paths[0]]
        if(_.isNil(data)){
            return null
        }
        for(let i = 1; i < paths.length; i++){
            if(paths[i] === '*'){
                if(i === paths.length - 1){
                    return data
                }
                const keys = Object.keys(data)
                let group = {}
                keys.forEach((key) => {
                    group = { ...group, ...data[key][paths[i + 1]] }
                })
                data = group
                i += 1
            }else{
                if(data[paths[i]]){
                    data = data[paths[i]]
                }else{
                    return null
                }
            }
        }
        return data;
    }

    setState(paths, value, merge = false){
        if(this.locked) return
        if(!this.state[paths[0]]){
            this.state[paths[0]] = {}
        }
        let data = this.state[paths[0]]
        for(let i = 1; i < paths.length - 1; i++){
            if(!data[paths[i]]){
                data[paths[i]] = {}
            }
            data = data[paths[i]]
        }
        if(merge && typeof value == 'object' && !Array.isArray(value)){
            data[paths[paths.length - 1]] = {
                ...data[paths[paths.length - 1]], 
                ...value
            }
        }else{
            data[paths[paths.length - 1]] = value
        }
    }

    deleteState(paths){
        if(this.locked) return
        let data = this.state[paths[0]]
        for(let i = 1; i < paths.length - 1; i++){
            if(data[paths[i]]){
                data = data[paths[i]]
            }else{
                return
            }
        }
        delete data[paths[paths.length - 1]]
    }

    getIndex(index){
        return this.indices[index]
    }
}

module.exports = new Store(initData);