'use strict';
module.exports = function (app, config) {
  var BaseController = app.getController("Base", true);
  var ApplicationController = BaseController.extend(function(app){
    this.app = app;
    this.serviceName = "Application";
  });
  return ApplicationController;
}
