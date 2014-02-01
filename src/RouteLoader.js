module.exports = (function(){
  var path = require('path'),
  util = require('util');
  function RouteLoader(app){
    this.app = app;
  };
  RouteLoader.prototype.load = function(){
    for(var name in this.app.controllers){
      var controller = this.app.controllers[name];
      if(controller){
        var instance = new controller();
        for(var actionName in controller.prototype){
          var methodAction = actionName.match(/^(get|post|put|delete)(.*)/);
          if(methodAction){
            var method = methodAction[1];
            var action = methodAction[2]
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
            console.log(appPath);
            if(util.isArray(instance.beforeActions[method])){
              this.app[method](appPath, instance.beforeActions[method], instance[actionName]);
            } else {
              this.app[method](appPath, instance[actionName]);
            }
          }
        }
      };
    }
  };
  return RouteLoader;
})();
