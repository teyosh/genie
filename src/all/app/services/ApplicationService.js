'use strict';
module.exports = function(app){
  var BaseService = app.getService('Base', true);
  var ApplicationService = BaseService.extend(function(app){
    this.app = app;
    this.serviceName = "Application";
  }).methods({
    start : function(){
      console.log('supr service:'+ this.num++);
    }
  });
  return ApplicationService;
};