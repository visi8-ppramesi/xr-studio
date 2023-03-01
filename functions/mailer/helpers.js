const {createTransport} = require("nodemailer");
const {URL} = require("url");
const {invalidURI} = require("./logs");

function compileUrl($) {
  try {
    return new URL($);
  } catch (ex) {
    return null;
  }
}

exports.setSmtpCredentials = (config) => {
  const {smtpConnectionUri, smtpPassword} = config;

  /** Generate Url object */
  const url = compileUrl(smtpConnectionUri);

  /** return null if invalid url */
  if (!url) {
    invalidURI(smtpConnectionUri);

    return null;
  }

  /** encode uri password if exists */
  if (url.password) {
    url.password = encodeURIComponent(url.password);
  }

  /** encode secret password if exists */
  if (url.hostname && smtpPassword) {
    url.password = encodeURIComponent(smtpPassword);
  }

  const transport = createTransport(url.href);

  return transport;
};
