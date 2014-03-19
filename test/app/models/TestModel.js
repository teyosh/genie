'use strict';
module.exports = function(app){
  var ApplicationModel = app.getModel('Application', true);
  var TestModel = ApplicationModel.extend(function(){
    this.app = app;
    this.modelName = "Test";
  }).methods();
  return TestModel;
};
