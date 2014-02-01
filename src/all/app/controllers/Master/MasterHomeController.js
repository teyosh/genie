var util = require('util');

module.exports = function (app, config) {
  var HomeController = app.getController("Home");
  var MasterHomeController = HomeController.extend(function(){
    this.routes = {};
  }).methods({
    getIndex : function(req, res){
      res.send("master");
    }
  });

  return MasterHomeController;
};
