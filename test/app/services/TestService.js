'use strict';
module.exports = function(app){
  var ApplicationService = app.getService('Application', true);
  var TestService = ApplicationService.extend(function(app){
    this.app = app;
    this.serviceName = "Test";
  }).methods();
  return TestService;
};
