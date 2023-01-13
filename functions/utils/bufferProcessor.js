const stringify = require("fast-json-stable-stringify");
const isObject = require("lodash/isObject");
const isArray = require("lodash/isArray");

const parseBuffer = function(buff, base = "base64") {
  try {
    return JSON.parse(Buffer.from(buff, base).toString());
  } catch (err) {
    // eslint-disable-next-line no-useless-catch
    console.error(err);
    throw err;
  }
};

const bufferizeObject = function(obj) {
  if (isObject(obj) || isArray(obj)) {
    return Buffer.from(stringify(obj));
  } else {
    throw new Error("Not object or array");
  }
};

const parseBufferMiddleware = function(req, res, next) {
  try {
    const parsedData = parseBuffer(req.body.message.data);
    req.body.parsedData = parsedData;
    next();
  } catch (err) {
    console.error("error: " + err);
    res.status(500).send(JSON.stringify({status: "buffer parse failed"}));
  }
};

exports.parseBuffer = parseBuffer;
exports.bufferizeObject = bufferizeObject;
exports.parseBufferMiddleware = parseBufferMiddleware;
