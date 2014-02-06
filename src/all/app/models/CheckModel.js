'use strict';
module.exports = function(app){
  var ApplicationModel = app.getModel('Application', true);
  var CheckModel = ApplicationModel.extend(function(){
    this.app = app;
    this.modelName = "Check";
    this.rooms = ['Apple', 'Orange', 'Grape'];
  }).methods({
    getRoom : function(id){
      console.log(this.rooms);
      return this.rooms[id];
    }
  });
  return CheckModel;
};
