module.exports = function(app){
  'use strict';
  var app = app;
  var factoryName = "Check";
  var num = 0;
  return {
    start : function(req, res, next){
      console.log("factory: "+ num++);
      next();
    }
  }
};
