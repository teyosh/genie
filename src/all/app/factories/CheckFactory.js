'use strict';
module.exports = function(app){
  var ApplicationFactory = app.getFactory('Application', true);
  var CheckFactory = ApplicationFactory.extend(function(){
    this.factoryName = "Check";
    this.num = 0;
  }).methods({
    start : function(req, res, next){
      this.supr();
      console.log("factory: "+ this.num++);
      next();
    }
  });
  return CheckFactory;
};
