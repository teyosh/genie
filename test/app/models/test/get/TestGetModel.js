'use strict';
module.exports = function(app){
  var ApplicationModel = app.getModel('Application', true);
  var TestGetModel = ApplicationModel.extend(function(){
    this.app = app;
    this.modelName = "TestGet";
  }).methods();
  return TestGetModel;
};
