'use strict';
module.exports = function(app){
  var BaseModel = app.getModel('Base', true);
  var ApplicationModel = BaseModel.extend(function(app){
    this.app = app;
    this.modelName = "Application";
  });
  return ApplicationModel;
};