//browser
import stringify from "fast-json-stable-stringify";
import isObject from "lodash/isObject";
import isArray from "lodash/isArray";
import isNil from "lodash/isNil";
import isString from "lodash/isString";
const webcrypto = window.crypto;
//browser end

const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const stabilizeObject = (obj) => {
  return JSON.parse(stringify(obj));
};

const enc = new TextEncoder();
const dec = new TextDecoder();

const hash = async (obj) => {
  if (isObject(obj) || isArray(obj)) {
    obj = stringify(obj);
  }

  const enc = new TextEncoder();
  const hashBytes = await webcrypto.subtle.digest("SHA-256", enc.encode(obj));
  return Buffer.from(hashBytes).toString("base64");
};

const buffToBase64 = (buff) => Buffer.from(buff).toString("base64");

const base64ToBuf = (b64) => new Uint8Array(Buffer.from(b64, "base64"));

const getPasswordKey = async (password) =>
  webcrypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveKey",
  ]);

const deriveKey = async (passwordKey, salt, keyUsage) =>
  webcrypto.subtle.deriveKey(
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
    const encryptedDataBuff = base64ToBuf(encryptedData);
    const salt = encryptedDataBuff.slice(0, SALT_LENGTH);
    const iv = encryptedDataBuff.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const data = encryptedDataBuff.slice(SALT_LENGTH + IV_LENGTH);
    const passwordKey = await getPasswordKey(password);
    const aesKey = await deriveKey(passwordKey, salt, ["decrypt"]);
    const decryptedContent = await webcrypto.subtle.decrypt(
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
};

const encrypt = async (secretData, password) => {
  try {
    const salt = webcrypto.getRandomValues(new Uint8Array(SALT_LENGTH));
    const iv = webcrypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const passwordKey = await getPasswordKey(password);
    const aesKey = await deriveKey(passwordKey, salt, ["encrypt"]);
    const encryptedContent = await webcrypto.subtle.encrypt(
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
    const base64Buff = buffToBase64(buff);
    return base64Buff;
  } catch (e) {
    console.log(`Error - ${e}`);
    return "";
  }
};

const signMessage = async (message, privKey, pass = null) => {
  if (!isNil(pass) && isString(privKey)) {
    privKey = await decrypt(privKey, pass);
  }
  if (isString(privKey)) {
    privKey = JSON.parse(privKey);
  }
  if (isObject(message) || isArray(message)) {
    message = stringify(message);
  }

  const encoded = enc.encode(message);
  const keyObject = await webcrypto.subtle.importKey(
    "jwk",
    privKey,
    { name: "ECDSA", namedCurve: "P-384" },
    true,
    ["sign"]
  );
  const signature = await webcrypto.subtle.sign(
    { name: "ECDSA", hash: { name: "SHA-384" } },
    keyObject,
    encoded
  );
  return Buffer.from(signature).toString("base64");
};

const verifySignature = async (message, signature, publicKey) => {
  if (isString(publicKey)) {
    publicKey = JSON.parse(publicKey);
  }
  if (isString(signature)) {
    signature = Buffer.from(signature, "base64");
  }
  if (isObject(message) || isArray(message)) {
    message = stringify(message);
  }

  const encoded = enc.encode(message);
  const keyObject = await webcrypto.subtle.importKey(
    "jwk",
    publicKey,
    { name: "ECDSA", namedCurve: "P-384" },
    true,
    ["verify"]
  );
  const verified = await webcrypto.subtle.verify(
    { name: "ECDSA", hash: { name: "SHA-384" } },
    keyObject,
    signature,
    encoded
  );
  return verified;
};

const generateKey = (pass) =>
  new Promise((resolve, reject) => {
    webcrypto.subtle
      .generateKey(
        {
          name: "ECDSA",
          namedCurve: "P-384",
        },
        true,
        ["sign", "verify"]
      )
      .then((keyPair) => {
        const publicPromise = webcrypto.subtle
          .exportKey("jwk", keyPair.publicKey)
          .then((pubKey) => {
            return Buffer.from(JSON.stringify(pubKey)).toString("base64");
          });
        const privatePromise = webcrypto.subtle
          .exportKey("jwk", keyPair.privateKey)
          .then((pKey) => {
            const stringifiedPrivateKey = JSON.stringify(pKey);
            return encrypt(stringifiedPrivateKey, pass);
          });
        return Promise.all([publicPromise, privatePromise]);
      })
      .then((keyPair) => {
        resolve(keyPair);
      })
      .catch(reject);
  });

//browser
export {
  generateKey,
  encrypt,
  decrypt,
  hash,
  verifySignature,
  signMessage,
  stabilizeObject,
};
//browser end
