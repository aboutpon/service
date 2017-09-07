var config = require('./config');
var mongoose = require('mongoose');

module.exports = function () {
  mongoose.set('debug',config.mongo.debug);
  var db = mongoose.connect(config.mongo.mongoUri);
  return db;
};
