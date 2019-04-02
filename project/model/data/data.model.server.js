var mongoose = require("mongoose");
var DataSchema = require("./data.schema.server");
var DataModel = mongoose.model("DataModel", DataSchema);

DataModel.getAll = getAll;
DataModel.createRecord = createRecord;
DataModel.getById = getById;
DataModel.updateById = updateById;
DataModel.deleteById = deleteById;

module.exports = DataModel;

function getAll() {
  return DataModel.find();
}

function getById(recordId) {
  return DataModel.findOne({_id: recordId});
}

function createRecord(record) {
  return DataModel.create(record);
}

function updateById(recordId, record) {
  return DataModel.update({_id: recordId}, record);
}

function deleteById(recordId) {
  return DataModel.deleteOne({_id: recordId});
}
