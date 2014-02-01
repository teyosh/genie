var util = require('util');

module.exports = function (app, config) {
  var BaseController = app.getController("Base");
  var ApplicationController = BaseController.extend();
  return ApplicationController;
}
