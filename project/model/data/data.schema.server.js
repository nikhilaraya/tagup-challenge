var mongoose = require("mongoose");
var DataSchema = mongoose.Schema({
  timestamp: Number,
  value1: String,
  value2: Number,
  value3: Boolean,
  creationDate: Number,
  lastModificationDate: Number
},{ collection: 'tagupData'});

module.exports = DataSchema;
