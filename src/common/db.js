/**
 * Module dependencies
 * @private
 */
const mongoose = require('mongoose');
const config = require('./config');

/**
 * Module variables
 * @private
 */

let db;

// Use native promise
mongoose.Promise = global.Promise;

const afterConnectCallback = function afterConnectCallback(err) {
  if (err) {
    console.error('Could not connect to Mongodb!');
    process.exit(1);
  } else {
    mongoose.set('debug', true);
  }
};

const onConnectionError = function onConnectionError(err) {
    console.error('mongodbConnectionError', err);
    process.exit(1);
};

/**
 * Module exports
 * @public
 */

module.exports = function connect() {
  if (mongoose.connection.readyState !== 1) {
    db = mongoose.connect(config.db.uri, config.db.options, afterConnectCallback);
    mongoose.connection.on('error', onConnectionError);
  } else {
    db = mongoose;
  }
  return db;
};
