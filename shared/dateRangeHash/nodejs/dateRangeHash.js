
//nodejs
const isNil = require('lodash/isNil')
//nodejs end



const strDate = new Date("2000-01-01").getTime();
const endDate = new Date("2100-01-01").getTime();
const maxLen = endDate - strDate;
const base64Code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-'

class DateRangeHashGenerator {
    constructor(type = 'normal', base = 36, depth = 14) {
        this.type = type
        this.depth = depth
        if (type === 'normal') {
            this.base = base
            this.divisor = Math.sqrt(this.base)
            this.encoder = this.xyEncoder
            this.decoder = this.xyDecoder
        } else if (type === 'morton') {
            this.base = 64
            this.divisor = 8
            this.encoder = this.zOrderInterleave
            this.decoder = this.zOrderDeinterleave
        }
    }

    xyEncoder(x, y) {
        return (x + y * this.divisor).toString(this.base)
    }

    xyDecoder(code) {
        const num = parseInt(code, this.base);

        const x = num % this.divisor;
        const y = Math.floor(num / this.divisor);
        return [x, y];
    }

    zOrderInterleave(x, y) {
        const B = [0x55555555, 0x33333333, 0x0F0F0F0F, 0x00FF00FF];
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
    }

    zOrderDeinterleave(code) {
        let v = base64Code.indexOf(code)
        function deinterleave(x) {
            x = x & 0x55555555;
            x = (x | (x >> 1)) & 0x33333333;
            x = (x | (x >> 2)) & 0x0F0F0F0F;
            x = (x | (x >> 4)) & 0x00FF00FF;
            x = (x | (x >> 8)) & 0x0000FFFF;
            return x;
        }

        return [
            deinterleave(v),
            deinterleave(v >> 1)
        ]
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

    hashesOverlap(hashA, hashB) {
        const lettersA = hashA.split("");
        const lettersB = hashB.split("");
        const lenA = lettersA.length;
        const lenB = lettersB.length;
        let plusOneDeep = false;
        let xa = 0,
            ya = 0,
            xb = 0,
            yb = 0;
        let innerCount = 0;

        for (let i = 0; i < Math.max(lenA, lenB); i++) {
            if (isNil(lettersA[i])) {
                if (this.type === 'normal') {
                    lettersA[i] = "0";
                } else if (this.type === 'morton') {
                    lettersA[i] = "A";
                }
            }
            if (isNil(lettersB[i])) {
                if (this.type === 'normal') {
                    lettersB[i] = "0";
                } else if (this.type === 'morton') {
                    lettersB[i] = "A";
                }
            }

            if (lettersA[i] !== lettersB[i] || plusOneDeep) {
                const [mxa, tmya] = this.decoder(lettersA[i]);
                const [mxb, tmyb] = this.decoder(lettersB[i]);
                const mya = tmya + mxa
                const myb = tmyb + mxb
                const multiplier = 1 / (this.divisor ** innerCount);
                xa += mxa * multiplier;
                ya += mya * multiplier;
                xb += mxb * multiplier;
                yb += myb * multiplier;
                plusOneDeep = true;
                innerCount++;
            }
        }
        [xa, ya, xb, yb] = [
            parseFloat(xa.toFixed(6)),
            parseFloat(ya.toFixed(6)),
            parseFloat(xb.toFixed(6)),
            parseFloat(yb.toFixed(6)),
        ]
        return !((xa > yb && ya > xb) || (xa < yb && ya < xb));
    }

    decodeHash(hash) {
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
            new Date((endStamp + strDate)),
        ];
    }

    encodeDates(str, end) {
        if (typeof str == "string" || typeof str == "number") {
            str = new Date(str);
        }
        if (typeof end == "string" || typeof end == "number") {
            end = new Date(end);
        }

        if (str > end){
            throw new Error('temporal paradox error: cannot end before it starts');
        }

        if (!(str instanceof Date) || !(end instanceof Date)) {
            throw new Error('type error: not instance of date');
        }

        const strStamp = str.getTime();
        const endStamp = end.getTime();

        let x = strStamp - strDate;
        let y = endStamp - strDate;
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

        return letters;
    }
}

//nodejs
module.exports = DateRangeHashGenerator
//nodejs end


