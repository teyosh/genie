'use strict';
module.exports = function(app){
  var ApplicationFactory = app.getFactory('Application', true);
  var TestGetFactory = ApplicationFactory.extend(function(){
    this.factoryName = "TestGet";
  }).methods();
  return TestGetFactory;
};
