module.exports = function(app){
  'use strict';
  var app = app;
  function Check(){
    this.app = app;
    this.serviceName = "Check";
    this.num = 0;
  }
  Check.prototype = {
    start : function(req, res, next){
      console.log("service: "+ this.num++);
      next();
    }
  };
  return Check;
};
