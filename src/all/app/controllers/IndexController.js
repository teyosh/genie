module.exports = function (app, config) {
  var ApplicationController = app.getController("Application");
  var IndexController = ApplicationController.extend(function(){
    this.routes = {
      "index" : "/"
    };
  }).methods({
    getIndex : function(req, res){
      res.render("index", {
        title : "Hello, Genie"
      });
    },
  });
  return IndexController;
}
