'user strict';
var extend = require('extend');
module.exports = function(app){
  'use strict';
  var app = app;
  var BaseFactory = function(){
    this.app = app;
  };
  BaseFactory.factoryName = "Base";
  BaseFactory.extend = function(childFactory, from){
    var from = from || this;
    if(!childFactory.super_){
      childFactory.super_ = {};
    }
    extend(childFactory.super_, from);
    var res = extend(from, childFactory);
    return res;
  };
  BaseFactory.getConfig = function(type, name){
    var _type, _name;
    if(type !== undefined && name !== undefined){
      _type = type;
      _name = name;
    } else if(type !== undefined){
      _type = "Factory";
      _name = type;
    } else {
      _type = "Factory";
      _name = this.factoryName;
    }
    return app.getConfig(_type, _name);
  }
  return BaseFactory;
};
