module.exports = function (app) {
  var ApplicationController = app.getController("Application");
  var HomeController = ApplicationController.extend(function(){
    this.routes = {
      "index" : "/home/"
    };
    this.params = {
      "name" : [":word"]
    };
    this.addBeforeAction("get", function(res, req, next){
      var CheckService = app.getService("Check");
      CheckService.start(res, req, next);
    });
    this.addBeforeAction("get", function(res, req, next){
      var CheckFactory = app.getFactory("Check");
      CheckFactory.start(res, req, next);
    });
  }).methods({
    getIndex : function(req, res){
      res.send("Hello, HomeController");
    },
    getName : function(req, res){
      res.send("Name is " + req.params.word);
    }
  });
  return HomeController;
}
