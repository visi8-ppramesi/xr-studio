"use strict";

const isNil = require('lodash/isNil')

class Store{
    constructor(ttl = 120000){
        this.state = {}
        this.expirations = {}
        this.deleter = {}
        this.ttl = ttl
    }

    lock(){
        this.locked = true
    }

    unlock(){
        this.locked = false
    }

    resetState(){
        this.state = null
        this.state = {}
    }

    clearDeleter(key){
        if(!isNil(this.deleter[key])){
            clearTimeout(this.deleter[key])
            delete this.deleter[key]
        }
    }

    checkState(key){
        const isExpired = this.expirations[key] < (new Date()).getTime()
        const isGone = isNil(this.state[key])
        if(isExpired){
            this.deleteState(key)
        }
        return !isGone && !isExpired
    }

    getState(key){
        console.log('cache hit ' + key)
        this.resetTimer(key)
        return this.state[key]
    }

    resetTimer(key){
        this.clearDeleter(key)
        this.expirations[key] = (new Date()).getTime() + this.ttl
        this.deleter[key] = setTimeout(() => {
            this.deleteState(key)
        }, this.ttl)
    }

    setState(key, value){
        if(this.locked) return
        this.lock()
        console.log('setting state ' + key)
        this.resetTimer(key)
        this.state[key] = value
        this.unlock()
    }

    deleteState(key){
        if(this.locked) return
        this.lock()
        console.log('deleting state ' + key)
        this.clearDeleter(key)
        this.state[key] = null
        delete this.state[key]
        delete this.expirations[key]
        this.unlock()
    }
}

module.exports = Store