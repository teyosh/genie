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
        var instance = new Controller(this.app);
        for(var actionName in Controller.prototype){
          var methodAction = actionName.match(/^(get|post|put|delete)(.*)/);
          if(methodAction){
            var method = methodAction[1];
            var action = methodAction[2];
            var rootPath = this.app.camelCase2Path(name);
            var actionPath = this.app.camelCase2Path(action);
            var appPath = "";
            var appParamPath = "";
            if(instance.routes && (instance.routes[actionPath] !== undefined)){
              appPath = instance.routes[actionPath];
            } else {
              appPath = "/"+path.join(rootPath, actionPath);
            }
            if(instance.params && instance.params[actionPath]){
              var params = "";
              if(util.isArray(instance.params[actionPath])){
                params = instance.params[actionPath].join("/");
              } else if(typeof instance.params[actionPath] === "string"){
                params = instance.params[actionPath];
              } else {
                if(instance.params[actionPath].action){
                  if(util.isArray(instance.params[actionPath].action)){
                    params = instance.params[actionPath].action.join("/");
                  } else if(typeof instance.params[actionPath].action === "string"){
                    params = instance.params[actionPath].action;
                  }
                }
                if(instance.params[actionPath][method]){
                  if(util.isArray(instance.params[actionPath][method])){
                    params = instance.params[actionPath][method].join("/");
                  } else if(typeof instance.params[actionPath][method] === "string"){
                    params = instance.params[actionPath][method];
                  }
                }
              }
              appParamPath = path.join(appPath, params);
            } else {
              appParamPath = appPath;
            }
            console.log(method+"\t"+appParamPath);
            var beforeActions = [];
            if(instance.beforeActions.action && instance.beforeActions.action['*']){
              beforeActions = beforeActions.concat(instance.beforeActions.action['*']);
            }
            if(instance.beforeActions.action && instance.beforeActions.action[appPath]){
              beforeActions = beforeActions.concat(instance.beforeActions.action[appPath]);
            }
            var act = method;
            if(instance.beforeActions[act] && instance.beforeActions[act]['*']){
              beforeActions = beforeActions.concat(instance.beforeActions[act]['*']);
            }
            if(instance.beforeActions[act] && instance.beforeActions[act][appPath]){
              beforeActions = beforeActions.concat(instance.beforeActions[act][appPath]);
            }
            if(beforeActions.length){
              this.app[method](appParamPath, beforeActions, instance[actionName].bind(instance));
            } else {
              this.app[method](appParamPath, instance[actionName].bind(instance));
            }
          }
        }
      }
    }
  };
  return RouteLoader;
})();
