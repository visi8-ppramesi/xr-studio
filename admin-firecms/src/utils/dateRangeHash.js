


//browser
import isNil from 'lodash/isNil'
import every from "lodash/every";
import sortBy from "lodash/sortBy";
//browser end

const strDate = new Date("2000-01-01").getTime();
const endDate = new Date("2100-01-01").getTime();
const maxLen = endDate - strDate;
const base64Code =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-";

const processHash = function (hash, defaultLen = 14) {
    if(hash.startsWith('ft-') && hash.length > defaultLen) {
        hash = hash.substr(3)
    }

    const splitted = hash.split('.')
    if(splitted.length >= 2) {
        return splitted[1]
    }else{
        return hash
    }
}
let string = null
const checkStackable = function(hashA, hashB, masks) {
    function getStackCode(hash){
        const hashArr = hash.split('.');
        if(hashArr.length > 2){
            return parseInt(hashArr[hashArr.length - 1]);
        }else{
            return null;
        }
    }

    hashA = getStackCode(hashA);
    hashB = getStackCode(hashB);
    if(isNil(hashA) || isNil(hashB)){
        throw new Error('stackable code missing');
    }
    const p = (2 ** masks) - 1
    return hashA !== hashB && (hashA + hashB) < p && ((hashA | hashB) ^ p) !== 0;
}

const checkStackableArray = function(hashArr, masks) {
    function getStackCode(hash){
        const hashArr = hash.split('.');
        if(hashArr.length > 2){
            return parseInt(hashArr[hashArr.length - 1]);
        }else{
            return null;
        }
    }

    hashArr = hashArr.map(v => getStackCode(v))

    if(hashArr.map(isNil).reduce((acc, v) => acc || v, false)){
        throw new Error('stackable code missing');
    }

    const p = (2 ** masks) - 1
    let orAcc = true
    for(let i = 1; i < hashArr.length; i++){
        orAcc &&= (hashArr[i] + hashArr[i - 1]) < p
    }
    
    return orAcc && (hashArr.reduce((acc, v) => acc | v, 0) ^ p) !== 0;
}

const xyEncBuilder = function(self){
    const encoder = function(x, y){
        const index = x + y * this.divisor
        return this.base <= 36 ? index.toString(this.base) : base64Code[index];
    }.bind(self)
    const decoder = function(code){
        const num = this.base <= 36 ? parseInt(code, this.base) : base64Code.indexOf(code);
    
        const x = num % this.divisor;
        const y = Math.floor(num / this.divisor);
        return [x, y];
    }.bind(self)
    return {encoder, decoder}
}

const verticalEncBuilder = function(self){
    const encoder = function(x, y){
        const index = y + x * this.divisor
        return this.base <= 36 ? index.toString(this.base) : base64Code[index];
    }.bind(self)
    const decoder = function(code){
        const num = this.base <= 36 ? parseInt(code, this.base) : base64Code.indexOf(code);
    
        const y = num % this.divisor;
        const x = Math.floor(num / this.divisor);
        return [x, y];
    }.bind(self)
    return {encoder, decoder}
}

const mortonEncBuilder = function (self) {
    const encoder = function (x, y) {
        const B = [0x55555555, 0x33333333, 0x0f0f0f0f, 0x00ff00ff];
        const S = [1, 2, 4, 8];

        x = (x | (x << S[3])) & B[3];
        x = (x | (x << S[2])) & B[2];
        x = (x | (x << S[1])) & B[1];
        x = (x | (x << S[0])) & B[0];

        y = (y | (y << S[3])) & B[3];
        y = (y | (y << S[2])) & B[2];
        y = (y | (y << S[1])) & B[1];
        y = (y | (y << S[0])) & B[0];

        let z = x | (y << 1);
        return base64Code[z];
    }.bind(self)
    const decoder = function (code) {
        let v = base64Code.indexOf(code);
        function deinterleave(x) {
            x = x & 0x55555555;
            x = (x | (x >> 1)) & 0x33333333;
            x = (x | (x >> 2)) & 0x0f0f0f0f;
            x = (x | (x >> 4)) & 0x00ff00ff;
            x = (x | (x >> 8)) & 0x0000ffff;
            return x;
        }

        return [deinterleave(v), deinterleave(v >> 1)];
    }.bind(self)
    return { encoder, decoder }
}

class DateRangeHashGenerator {
    constructor(type = 'normal', base = 36, depth = 14) {
        this.type = type
        this.depth = depth
        let encoding;
        if (type === "normal") {
            this.base = base;
            this.divisor = Math.sqrt(this.base);
            encoding = xyEncBuilder(this)
        } else if (type === "morton") {
            this.base = 64;
            this.divisor = 8;
            encoding = mortonEncBuilder(this)
        } else if (type === 'vertical') {
            this.base = base;
            this.divisor = Math.sqrt(this.base);
            encoding = verticalEncBuilder(this);
        }
        this.encoder = encoding.encoder
        this.decoder = encoding.decoder
    }

    getFreeSpots(datesArray, minLength){
        const isSorted = every(datesArray, (v, idx, arr) => {
            return idx === 0 || String(arr[idx - 1]) <= String(v);
        })
        if(!isSorted){
            datesArray = sortBy(datesArray);
        }
        const availableDates = []
    
        for(let i = 1; i < datesArray.length; i++){
            let { ya, xb } = this.calculateHashesValues(datesArray[i - 1], datesArray[i]);
            const evDiff = xb - ya
            if(evDiff > minLength){
                availableDates.push(this.encodeDates(ya, xb))
            }
        }
    
        return availableDates;
    }



    getIntervalLength(hash, unit = "unix") {
        hash = processHash(hash);
        const letters = hash.split("");
        let divisor;
        switch(unit){
            case "unix":
                divisor = 1;
                break;
            case "seconds":
                divisor = 1000;
                break;
            case "minutes":
                divisor = 60 * 1000;
                break;
            case "hours":
                divisor = 60 * 60 * 1000;
                break;
            case "days":
                divisor = 24 * 60 * 60 * 1000;
                break;
            case "months":
                divisor = 30 * 24 * 60 * 60 * 1000;
                break;
            default:
                divisor = 1;
                break;
        }
        return letters.reduce(
            (acc, v, idx) =>
            (acc +=
                this.decoder(v)[1] * Math.floor(maxLen / this.divisor ** (idx + 1))),
            0
        ) / divisor;
    }

    getHashLetter(x, y, myMaxLen) {
        const blockSize = myMaxLen / this.divisor;
        const xBucket = Math.floor(x / blockSize);
        const xRemainder = x % blockSize;
        const yBucket = Math.floor(y / blockSize);
        const yRemainder = y % blockSize;

        const map = this.encoder(xBucket, yBucket);
        return [map, blockSize, [xRemainder, yRemainder]];
    }

    calculateHashesValues(hashA, hashB){
        hashA = processHash(hashA);
        hashB = processHash(hashB);
        const lettersA = hashA.split("");
        const lettersB = hashB.split("");
        const lenA = lettersA.length;
        const lenB = lettersB.length;
        let xa = 0,
            ya = 0,
            xb = 0,
            yb = 0;
    
        for (let i = 0; i < Math.max(lenA, lenB); i++) {
            if (isNil(lettersA[i])) {
                if (this.type === "normal" || this.type === "vertical") {
                    lettersA[i] = "0";
                } else if (this.type === "morton") {
                    lettersA[i] = "A";
                }
            }
            if (isNil(lettersB[i])) {
                if (this.type === "normal" || this.type === "vertical") {
                    lettersB[i] = "0";
                } else if (this.type === "morton") {
                    lettersB[i] = "A";
                }
            }
    
            const [mxa, tmya] = this.decoder(lettersA[i]);
            const [mxb, tmyb] = this.decoder(lettersB[i]);
            const mya = tmya + mxa;
            const myb = tmyb + mxb;
            const multiplier = maxLen / (this.divisor ** (i + 1));
            xa += mxa * multiplier;
            ya += mya * multiplier;
            xb += mxb * multiplier;
            yb += myb * multiplier;
        }
    
        [xa, ya, xb, yb] = [
            parseInt(xa) + strDate,
            parseInt(ya) + strDate,
            parseInt(xb) + strDate,
            parseInt(yb) + strDate,
        ];
    
        return { xa, ya, xb, yb }
    }
  
    hashesOverlap(hashA, hashB) {
        const { xa, ya, xb, yb } = this.calculateHashesValues(hashA, hashB)
        return !((xa > yb && ya > xb) || (xa < yb && ya < xb));
    }

    decodeHash(hash) {
        hash = processHash(hash);
        const letters = hash.split("");
        const [strStamp, endStamp] = letters.reduce((acc, v, idx) => {
            if (isNil(acc[0])) {
                acc[0] = 0;
            }
            if (isNil(acc[1])) {
                acc[1] = 0;
            }
            const [x, y] = this.decoder(v);
            acc[0] += x * Math.floor(maxLen / this.divisor ** (idx + 1));
            acc[1] += y * Math.floor(maxLen / this.divisor ** (idx + 1));
            return acc;
        }, []);
        return [
            new Date((strStamp + strDate)),
            new Date((endStamp + strStamp + strDate + 1)),
        ];
    }

    encodeDates(str, end, option = string) {
        if (typeof str == "string" || typeof str == "number") {
            str = new Date(str);
        }
        if (typeof end == "string" || typeof end == "number") {
            end = new Date(end);
        }

        if (str > end) {
            throw new Error('temporal paradox error: cannot end before it starts');
        }

        if (!(str instanceof Date) || !(end instanceof Date)) {
            throw new Error('type error: not instance of date');
        }

        const strStamp = str.getTime();
        const endStamp = end.getTime();

        let x = strStamp - strDate;
        let y = endStamp - strStamp - 1;
        let letters = "";
        let localMaxLen = maxLen;

        for (let i = 0; i < this.depth; i++) {
            const [letter, newBlockSize, remainders] = this.getHashLetter(
                x,
                y,
                localMaxLen
            );
            letters += letter;
            x = remainders[0];
            y = remainders[1];
            localMaxLen = newBlockSize;
        }
        
        const codeArray = [letters]
        if(!isNil(option)){
            switch(option){
                case "rent_non_xr_studio":
                    codeArray.unshift("001");
                    codeArray.push(8)
                    break;
                case "rent_xr_studio":
                    codeArray.unshift("002");
                    codeArray.push(8)
                    break;
                case "rent_studio_art_setup_non_xr":
                    codeArray.unshift("003");
                    codeArray.push(4)
                    break;
                case "rent_studio_rehearsal":
                    codeArray.unshift("004");
                    codeArray.push(3)
                    break;
                case "rent_studio_art_setup_xr":
                    codeArray.unshift("005");
                    codeArray.push(4)
                    break;
            }
        }

        return codeArray.join(".");
    }
}
const hedhg = new DateRangeHashGenerator("normal", 64);
const vedhg = new DateRangeHashGenerator("vertical", 64);
const medhg = new DateRangeHashGenerator("morton", 64);



//browser
export default DateRangeHashGenerator;
export { hedhg, vedhg, medhg, checkStackable, checkStackableArray };
//browser end
