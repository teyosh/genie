'use strict';
module.exports = function(app){
  var ApplicationFactory = app.getFactory('Application', true);
  var TestFactory = ApplicationFactory.extend(function(){
    this.factoryName = "Test";
  }).methods();
  return TestFactory;
};
