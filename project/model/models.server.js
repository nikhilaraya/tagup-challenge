var mongoose = require("mongoose");
var connectionString = 'mongodb://localhost/nextJump';

var db = mongoose.connect(connectionString, {useMongoClient: true});
module.exports = db;

