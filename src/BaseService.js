'use strict';
module.exports = function(app){
  var BaseService = app.klass(function(){
    this.app = app;
    this.serviceName = "Base";
  }).methods({
    Config: function(type, name){
      var _type, _name;
      if(type !== undefined && name !== undefined){
        _type = type;
        _name = name;
      } else if(type !== undefined){
        _type = "Service";
        _name = type;
      } else {
        _type = "Service";
        _name = this.serviceName;
      }
      return this.app.Config(_type, _name);
    }
  });
  return BaseService;
};
