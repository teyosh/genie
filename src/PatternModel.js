'use strict';
module.exports = function(app){
  var ApplicationModel = app.getModel('Application', true);
  var PatternModel = ApplicationModel.extend(function(){
    this.app = app;
    this.modelName = "Pattern";
  }).methods();
  return PatternModel;
};
