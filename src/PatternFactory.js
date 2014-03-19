'use strict';
module.exports = function(app){
  var ApplicationFactory = app.getFactory('Application', true);
  var PatternFactory = ApplicationFactory.extend(function(){
    this.factoryName = "Pattern";
  }).methods();
  return PatternFactory;
};
