'use strict';
var util = require('util');
module.exports = function(app){
  var BaseController = app.klass(function(){
    this.app = app;
    this.beforeActions = {};
  }).methods({
    addBeforeAction: function(act, func){
      if(!func){
        func = act;
        act = "action";
      }
      var _act = [];
      if(util.isArray(act)){
        _act = act;
      } else {
        _act = [act];
      }
      (util.isArray(act)? act : [act]).forEach(function(act){
        if(this.beforeActions[act] === undefined){
          this.beforeActions[act] = [];
        }
        this.beforeActions[act].push(func);
      }.bind(this));
    },
    getConfig: function(type, name){
      var _type, _name;
      if(type !== undefined && name !== undefined){
        _type = type;
        _name = name;
      } else if(type !== undefined){
        _type = "Controller";
        _name = type;
      } else {
        _type = "Controller";
        _name = this.factoryName;
      }
      return this.app.getConfig(_type, _name);
    }
  });
  return BaseController;
};