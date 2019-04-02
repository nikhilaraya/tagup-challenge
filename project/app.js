module.exports = function (app) {

  var db = require("./model/models.server");
  require("./services/home.service.server")(app);
};
