'use strict';
module.exports = function(app){
  var BaseFactory = app.getFactory('Base', true);
  var ApplicationFactory = BaseFactory.extend(function(){
    this.factoryName = 'Application';
  }).methods({
    start : function(){
      console.log("supr factory: "+ this.num++);
    }
  });
  return ApplicationFactory;
}