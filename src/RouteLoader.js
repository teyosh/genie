'use strict';
module.exports = (function(){
  var path = require('path'),
  util = require('util');
  function RouteLoader(app){
    this.app = app;
  }
  RouteLoader.prototype.load = function(){
    for(var name in this.app.controllers){
      var Controller = this.app.getController(name, true);
      if(Controller){
        var instance = new Controller();
        for(var actionName in Controller.prototype){
          var methodAction = actionName.match(/^(get|post|put|delete)(.*)/);
          if(methodAction){
            var method = methodAction[1];
            var action = methodAction[2];
            var rootPath = this.app.camelCase2Path(name);
            var actionPath = this.app.camelCase2Path(action);
            var appPath = "";
            if(instance.routes && (instance.routes[actionPath] !== undefined)){
              appPath = instance.routes[actionPath];
            } else {
              appPath = "/"+path.join(rootPath, actionPath);
            }
            if(instance.params && instance.params[actionPath]){
              var params = "";
              if(util.isArray(instance.params[actionPath])){
                params = instance.params[actionPath].join("/");
              } else {
                params = instance.params[actionPath];
              }
              appPath = path.join(appPath, params);
            }
            console.log(method+"\t"+appPath);
            if(util.isArray(instance.beforeActions[method]) || util.isArray(instance.beforeActions.action)){
              var beforeActions = (instance.beforeActions.action || []).concat((instance.beforeActions[method] || []));
              this.app[method](appPath, beforeActions, instance[actionName].bind(instance));
            } else {
              this.app[method](appPath, instance[actionName].bind(instance));
            }
          }
        }
      }
    }
  };
  return RouteLoader;
})();
