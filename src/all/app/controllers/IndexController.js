module.exports = function (app, config) {
  var ApplicationController = app.getController("Application", true);
  var IndexController = ApplicationController.extend(function(){
    this.routes = {
      "index" : "/"
    };
    this.addBeforeAction("action", function(res, req, next){
      var CheckFactory = app.getFactory("Check");
      CheckFactory.start(res, req, next);
    });
    this.addBeforeAction("get", function(res, req, next){
      var CheckFactory = app.getFactory("Check");
      CheckFactory.start(res, req, next);
    });
    this.addBeforeAction("get", function(res, req, next){
      var CheckService = app.getService("Check");
      CheckService.start(res, req, next);
    });
  }).methods({
    getIndex : function(req, res){
      res.render("index", {
        title : "Hello, Genie"
      });
    },
  });
  return IndexController;
}
