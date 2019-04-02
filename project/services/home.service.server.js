module.exports = function (app) {

  app.get("/api/list", getAll);
  app.post("/api/create", createRecord);
  app.get("/api/read/:recordId", getById);
  app.put("/api/modify/:recordId", updateById);
  app.delete("/api/remove/:recordId", deleteById);

  var dataModel = require("../model/data/data.model.server");


  function getAll(req,res) {
    return dataModel.getAll()
      .then(function (data) {
        res.json(data);
      },function (err) {
        res.json(errJson);
      });
  }

  function createRecord(req,res) {
    const record = req.body;
    if(validityCheck(record)) {
      var timestamp = Math.floor(Date.now() / 1000);
      record.creationDate = timestamp;
      record.lastModificationDate = timestamp;
      return dataModel.createRecord(record)
        .then(function (data) {
          return res.json(data);
        }, function (err) {
          res.json({
            'message' : 'An error occured while creating the record',
            'flag' : true
          });
        });
    }else{
      return res.json({
        'message' : 'Please enter valid data and check for the type of values!',
        'flag' : true
      });
    }
  }

  function getById(req,res) {
    const recordId = req.params["recordId"];
    return dataModel.getById(recordId)
      .then(function (data) {
        if(!data){
          res.json({
            'message': 'There are no records with the given id'
          });
        }else {
          res.json(data);
        }
      },function (err) {
        res.json({
          'message' : 'An error occured while reading the record'
        });
      });
  }

  function updateById(req,res) {
    const recordId = req.params["recordId"];
    const record = req.body;
    if(validityCheck(record)){
      record.lastModificationDate = Math.floor(Date.now() /1000);
      return dataModel.updateById(recordId, record)
        .then(function (data) {
          res.json(data);
        },function (err) {
          res.json({
            'message' : 'An error occured while updating the record',
            'flag' : true
          });
        });
    }else{
      return res.json({
        'message' : 'Please enter valid data and check for the type of values!',
        'flag' : true
      });
    }

  }

  function deleteById(req,res) {
    const recordId = req.params["recordId"];
    return dataModel.deleteById(recordId)
      .then(function (data) {
        res.json(data);
      },function (err) {
        res.json({
          'message' : 'An error occured while deleting the record'
        });
      });
  }

  function validityCheck(record) {

    if(typeof record.value1 === 'string' &&
      typeof record.value2 === 'number' &&
      typeof record.value3 === 'boolean' &&
      typeof record.timestamp == 'number'){
      return true;
    }
    return false;
  }

}
