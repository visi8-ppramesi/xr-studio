const crypto = require('crypto')
const _ = require('lodash')
const stringify = require('fast-json-stable-stringify');

const stabilizeObject = (obj) => {
    JSON.parse(stringify(obj))
}

const enc = new TextEncoder();
const dec = new TextDecoder();

const hash = async (obj) => {
    if(_.isObject(obj) || _.isArray(obj)){
        obj = stringify(obj)
    }

    const enc = new TextEncoder()
    const hashBytes = await crypto.webcrypto.subtle.digest('SHA-256', enc.encode(obj))
    return Buffer.from(hashBytes).toString("base64")
}

const buff_to_base64 = (buff) => Buffer.from(buff).toString('base64')

const base64_to_buf = (b64) => new Uint8Array(Buffer.from(b64, 'base64'))

const getPasswordKey = async (password) =>
    crypto.webcrypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
        "deriveKey",
    ]);

const deriveKey = async (passwordKey, salt, keyUsage) =>
    crypto.webcrypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 250000,
            hash: "SHA-256",
        },
        passwordKey,
        { name: "AES-GCM", length: 256 },
        false,
        keyUsage
    );

const decrypt = async (encryptedData, password) => {
    try {
        const encryptedDataBuff = base64_to_buf(encryptedData);
        const salt = encryptedDataBuff.slice(0, 16);
        const iv = encryptedDataBuff.slice(16, 16 + 12);
        const data = encryptedDataBuff.slice(16 + 12);
        const passwordKey = await getPasswordKey(password);
        const aesKey = await deriveKey(passwordKey, salt, ["decrypt"]);
        const decryptedContent = await crypto.webcrypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            aesKey,
            data
        );
        return dec.decode(decryptedContent);
    } catch (e) {
        console.log(`Error - ${e}`);
        return "";
    }
}

const encrypt = async (secretData, password) => {
    try {
        const salt = crypto.webcrypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.webcrypto.getRandomValues(new Uint8Array(12));
        const passwordKey = await getPasswordKey(password);
        const aesKey = await deriveKey(passwordKey, salt, ["encrypt"]);
        const encryptedContent = await crypto.webcrypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            aesKey,
            enc.encode(secretData)
        );

        const encryptedContentArr = new Uint8Array(encryptedContent);
        let buff = new Uint8Array(
            salt.byteLength + iv.byteLength + encryptedContentArr.byteLength
        );
        buff.set(salt, 0);
        buff.set(iv, salt.byteLength);
        buff.set(encryptedContentArr, salt.byteLength + iv.byteLength);
        const base64Buff = buff_to_base64(buff);
        return base64Buff;
    } catch (e) {
        console.log(`Error - ${e}`);
        return "";
    }
}

const signMessage = async (message, privKey, pass = null) => {
    if(!_.isNil(pass) && _.isString(privKey)){
        privKey = await decrypt(privKey, pass)
    }
    if(_.isString(privKey)){
        privKey = JSON.parse(privKey)
    }
    if(_.isObject(message) || _.isArray(message)){
        message = stringify(message)
    }

    const encoded = enc.encode(message)
    const keyObject = await crypto.webcrypto.subtle.importKey('jwk', privKey, { name: "ECDSA", namedCurve: "P-384" }, true, ['sign'])
    const signature = await crypto.webcrypto.subtle.sign({ name: "ECDSA", hash: { name: "SHA-384" }}, keyObject, encoded)
    return signature
}

const verifySignature = async (message, signature, publicKey) => {
    if(_.isString(publicKey)){
        publicKey = JSON.parse(publicKey)
    }

    const encoded = enc.encode(message)
    const keyObject = await crypto.webcrypto.subtle.importKey('jwk', publicKey, { name: "ECDSA", namedCurve: "P-384" }, true, ['verify'])
    const verified = await crypto.webcrypto.subtle.verify({ name: "ECDSA", hash: { name: "SHA-384" }}, keyObject, signature, encoded)
    return verified
}

exports.generateKey = (pass) => new Promise((resolve, reject) => {
    crypto.webcrypto.subtle.generateKey(
        {
            name: "ECDSA",
            namedCurve: "P-384"
        },
        true,
        ["sign", "verify"]
    ).then((keyPair) => {
        const publicPromise = crypto.webcrypto.subtle.exportKey('jwk', keyPair.publicKey).then((pubKey) => {
            return JSON.stringify(pubKey)
        })
        const privatePromise = crypto.webcrypto.subtle.exportKey('jwk', keyPair.privateKey).then((pKey) => {
            const stringifiedPrivateKey = JSON.stringify(pKey)
            return encrypt(stringifiedPrivateKey, pass)
        })
        return Promise.all([publicPromise, privatePromise])
    }).then((keyPair) => {
        resolve(keyPair)
    }).catch(reject)
})

exports.encrypt = encrypt
exports.decrypt = decrypt
exports.hash = hash
exports.verifySignature = verifySignature
exports.signMessage = signMessage
exports.stabilizeObject = stabilizeObject