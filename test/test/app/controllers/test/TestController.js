module.exports = function (app, config) {
  var ApplicationController = app.getController("Application", true);
  var TestController = ApplicationController.extend(function(){
    this.routes = {
      "index" : "/"
    };
    this.params = {
      "index" : {
        get : [":test", ":id"],
        post : [":post"]
      }
    }
  }).methods({
    getIndex : function(req, res){

    },
    postIndex : function(req, res){

    },
    getTest2 : function(req, res){

    },
    postTest : function(req, res){

    },
    deleteTest : function(req, res){

    },
    putTest : function(req, res){

    }
  });
  return TestController;
}
