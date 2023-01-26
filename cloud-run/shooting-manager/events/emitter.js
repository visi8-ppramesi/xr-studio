const emitter = require("mitt");
const { v4 } = require("uuid");
const onShootChangeHandlers = require("./onShootChange")

const events = {
    onShootChangeHandlers
}

class SpecialEmitter{
    constructor() {
        this.mitt = emitter();
        Object.values(events).forEach((eventHandlers) => {
            Object.keys(eventHandlers).forEach((key) => {
                if(typeof eventHandlers[key] === "function"){
                    this.on(key, eventHandlers[key])
                }else if(Array.isArray(eventHandlers[key])){
                    eventHandlers[key].forEach((fun) => {
                        this.on(key, fun)
                    })
                }
            })
        });
    }
    emit(event, data) {
        const identifier = v4();
        this.mitt.emit(event, {data, identifier})
        return identifier
    }
    on(event, handler) {
        this.mitt.on(event, handler);
    }
    off(event, handler) {
        this.mitt.off(event, handler);
    }
    clear() {
        this.mitt.all.clear()
    }
}

module.exports = new SpecialEmitter();