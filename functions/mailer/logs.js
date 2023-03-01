/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const config = require("./config");
const {logger} = require("firebase-functions");

const obfuscatedConfig = Object.assign({}, config, {
  smtpConnectionUri: "<omitted>",
  smtpPassword: "<omitted>",
});

exports.obfuscatedConfig = obfuscatedConfig;

exports.init = function() {
  logger.log("Initializing extension with configuration", obfuscatedConfig);
};

exports.start = function() {
  logger.log(
      "Started execution of extension with configuration",
      obfuscatedConfig,
  );
};

exports.error = function(err) {
  logger.log("Unhandled error occurred during processing:", err);
};

exports.complete = function() {
  logger.log("Completed execution of extension");
};

exports.attemptingDelivery = function(ref) {
  logger.log(`Attempting delivery for message: ${ref.path}`);
};

exports.delivered = function(
    ref,
    info,
) {
  logger.log(
      `Delivered message: ${ref.path} successfully. messageId: ${info.messageId} accepted: ${info.accepted.length} rejected: ${info.rejected.length} pending: ${info.pending.length}`,
  );
};

exports.deliveryError = function(
    ref,
    e,
) {
  logger.error(`Error when delivering message=${ref.path}: ${e.toString()}`);
};

exports.missingDeliveryField = function(ref) {
  logger.error(`message=${ref.path} is missing 'delivery' field`);
};

exports.missingUids = function(uids) {
  logger.log(
      `The following uids were provided, however a document does not exist or has no 'email' field: ${uids.join(
          ",",
      )}`,
  );
};

exports.noPartialAttachmentSupport = function() {
  logger.warn("partial attachments are not handled and will be ignored");
};

exports.registeredPartial = function(name) {
  logger.log(`registered partial '${name}'`);
};

exports.partialRegistered = function(name) {
  logger.log(`registered partial '${name}'`);
};

exports.templatesLoaded = function(names) {
  logger.log(`loaded templates (${names})`);
};

exports.invalidMessage = function(message) {
  logger.warn(
      `message '${message}' is not a valid object - please add as an object or firestore map, otherwise you may experience unexpected results.`,
  );
};

exports.checkingMissingTemplate = function(name) {
  logger.log(`checking missing template '${name}'`);
};

exports.foundMissingTemplate = function(name) {
  logger.log(`template '${name}' has been found`);
};

exports.invalidURI = function(uri) {
  logger.warn(
      `invalid url: '${uri}' , please reconfigure with a valid SMTP connection URI`,
  );
};
