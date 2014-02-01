module.exports = function(app){
  'use strict';
  var app = app;
  var factoryName = "Base";
  return {
    getFactoryName : function(){
      return factoryName;
    }
  }
};
