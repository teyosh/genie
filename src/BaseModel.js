'use strict';
module.exports = function(app){
  var BaseModel = app.klass(function(){
    this.app = app;
    this.modelName = "Base";
  }).methods({
    getConfig: function(type, name){
      var _type, _name;
      if(type !== undefined && name !== undefined){
        _type = type;
        _name = name;
      } else if(type !== undefined){
        _type = "Model";
        _name = type;
      } else {
        _type = "Model";
        _name = this.modelName;
      }
      return this.app.getConfig(_type, _name);
    }
  });
  return BaseModel;
};