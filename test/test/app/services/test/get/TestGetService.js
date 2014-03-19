'use strict';
module.exports = function(app){
  var ApplicationService = app.getService('Application', true);
  var TestGetService = ApplicationService.extend(function(app){
    this.app = app;
    this.serviceName = "TestGet";
  }).methods();
  return TestGetService;
};
