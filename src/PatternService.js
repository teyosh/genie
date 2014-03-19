'use strict';
module.exports = function(app){
  var ApplicationService = app.getService('Application', true);
  var PatternService = ApplicationService.extend(function(app){
    this.app = app;
    this.serviceName = "Pattern";
  }).methods();
  return PatternService;
};
