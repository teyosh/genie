'use strict';
module.exports = function(app){
  var ApplicationFactory = app.getFactory('Application');
  var CheckFactory = ApplicationFactory.extend({
    factoryName : "Check",
    num : 0,
    start : function(req, res, next){
      var config = this.getConfig();
      console.log(config);
      console.log("factory: "+ this.num++);
      next();
    }
  });
  return CheckFactory;
};
