'use strict';
module.exports = function(app){
  var ApplicationService = app.getService('Application', true);
  var CheckService = ApplicationService.extend(function(app){
    this.app = app;
    this.serviceName = "Check";
    this.config = this.getConfig();
    this.num = this.config.num;
  }).methods({
    start : function(req, res, next){
      console.log("service: "+ this.num++);
      next();
    }
  });
  return CheckService;
};
