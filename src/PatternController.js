module.exports = function (app, config) {
  var ApplicationController = app.getController("Application", true);
  var PatternController = ApplicationController.extend(function(){
    this.routes = {
      "index" : "/"
    };
  }).methods({
    getIndex : function(req, res){

    },
  });
  return PatternController;
}
