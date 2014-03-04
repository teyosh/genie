'use strict';
var util = require('util');
module.exports = function(app){
  var BaseController = app.klass(function(){
    this.app = app;
    this.beforeActions = {};
  }).methods({
    addBeforeAction: function(act, path, func){
      if(typeof func === 'undefined'){
        if(typeof path === 'function'){
          func = path;
          path = "*";
        }
        if(typeof act === 'function'){
          func = act;
          act = 'action';
        }
      }
      var _act = [],
      _path = [];
      if(util.isArray(act)){
        _act = act;
      } else {
        _act = [act];
      }
      if(util.isArray(path)){
        _path = path;
      } else {
        _path = [path];
      }
      (util.isArray(act)? act : [act]).forEach(function(act, num){
        if(this.beforeActions[act] === undefined){
          this.beforeActions[act] = {};
        }
        var path = _path[num]? _path[num] : '*';
        if(this.beforeActions[act][path] === undefined){
          this.beforeActions[act][path] = [];
        }
        this.beforeActions[act][path].push(func);
      }.bind(this));
    },
    Config: function(type, name){
      var _type, _name;
      if(type !== undefined && name !== undefined){
        _type = type;
        _name = name;
      } else if(type !== undefined){
        _type = "Controller";
        _name = type;
      } else {
        _type = "Controller";
        _name = this.controllerName;
      }
      return this.app.Config(_type, _name);
    }
  });
  return BaseController;
};