import dotenv from 'dotenv'

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }
}

const noop = () => { };
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock(), writable: true });
Object.defineProperty(window, 'URL', {
    value: {
        createObjectURL(url){
            return url
        },
        revokeObjectURL(){

        }
    }
})

process.env = {
    ...process.env,
    ...dotenv.config().parsed
}