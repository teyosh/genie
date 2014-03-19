module.exports = function (app, config) {
  var ApplicationController = app.getController("Application", true);
  var TestGetController = ApplicationController.extend(function(){
    this.params = {
      result : [":res"]
    }
    this.addBeforeAction("get", "result", function(req, res, next){
      next();
    });
  }).methods({
    getResult : function(req, res){

    },
    deleteResult : function(req, res){

    },
    putResult : function(req, res){

    },
    getResult : function(req, res){

    }
  });
  return TestGetController;
}
