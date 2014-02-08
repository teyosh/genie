'use strict';
module.exports = function (app) {
  var ApplicationController = app.getController("Application", true);
  var HomeController = ApplicationController.extend(function(){
    this.routes = {
      "index" : "/home/"
    };
    this.params = {
      "name" : [":word"],
      "room" : [":roomId"]
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
    getRoom : function(req, res){
      var RoomModel = app.getModel('Check');
      var roomName = RoomModel.getRoom(req.params.roomId);
      res.send("Room is " + roomName + ".");
    },
    getName : function(req, res){
      res.send("Name is " + req.params.word);
    }
  });
  return HomeController;
}
