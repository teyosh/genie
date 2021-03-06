'use strict';
var fs = require('fs'),
path = require('path'),
http = require('http'),
FileLoader = require('./FileLoader'),
RouteLoader = require('./RouteLoader'),
express = require('express'),
util = require('util');

var paths = {
  CONTROLLERS : 'controllers',
  MODELS : 'models',
  SERVICES : 'services',
  FACTORIES : 'factories'
};
var suffix = {
  CONTROLLERS : 'Controller',
  MODELS : 'Model',
  SERVICES : 'Service',
  FACTORIES : 'Factory'
};

global.q = require('q');
global.klass = require('klass');
var getEnv = function(){
  return process.env.NODE_ENV || 'development';
};
var getPort = function(){
  return process.argv.port || process.env.PORT || '3000';
};

var isFunction = function(func){
  return typeof func === 'function';
};
var isArray = util.isArray;
var isDate = util.isDate;
var isString = function(val){
  return typeof val === 'string';
};
var isObject = function(val){
  return val != null && typeof val === 'object';
};
var isDefined = function(val){
  return typeof val !== undefined;
};




var createApplication = function(baseDir, config){
  var app = express(),
  appDir = app.appDir = path.join(baseDir, '/app');
  app.klass = require('klass');
  app.q = require('q');
  app.models = {
    Base : require('./BaseModel')(app)
  };
  app.controllers = {
    Base : require('./BaseController')(app)
  };
  app.services = {
    Base : require('./BaseService')(app)
  };
  app.factories = {
    Base : new require('./BaseFactory')(app)()
  };
  app.factoryObjects = {
    Base : require('./BaseFactory')(app)
  };
  app.suffix = suffix;
  app.paths = paths;
  var fileLoader = new FileLoader(app);
  var routeLoader = new RouteLoader(app);

  app.factory = function(name, factoryFunc){
    var FactoryFunc = factoryFunc;
    if(isArray(FactoryFunc) || isObject(FactoryFunc)){
      app.factories[name] = factoryFunc;
    } else if(isFunction(FactoryFunc)){
      app.factories[name] = new FactoryFunc();
      app.factoryObjects[name] = FactoryFunc;
    }
    return app.factories[name];
  };

  app.service = function(name, serviceFunc){
    if(isFunction(serviceFunc)){
      app.services[name] = serviceFunc;
    }
    return app.services[name];
  };

  app.Config = function(type, name){
    var _config = {};
    if(config[type] && config[type][name]){
      for(var key in config[type][name]){
        _config[key] = config[type][name][key];
      }
    }
    return _config;
  };


  var getServiceModelController = function(type, name, objectOnly){
    var Func = function(app){this.app = app;};
    var object = app[type+"s"];
    if(isFunction(object[name])){
      Func = object[name];
    } else {
      if(type === 'model'){
        Func = fileLoader.loadModel(name + suffix.MODELS) || Func;
      }
      if(type === 'service'){
        Func = fileLoader.loadService(name + suffix.SERVICES) || Func;
      }
      if(type === 'controller'){
        Func = fileLoader.loadController(name + suffix.CONTROLLERS) || Func;
      }
    }
    if(objectOnly){
      return Func;
    } else {
      var instance = new Func(app);
      if(!isDefined(instance.serviceName)){
        instance[type+"Name"] = name;
      }
      return instance;
    }

  }

  app.getController = function(name, objectOnly){
    return getServiceModelController('controller', name, objectOnly);
  };

  app.getModel = function(name, objectOnly){
    return getServiceModelController('model', name, objectOnly);
  };

  app.getService = function(name, objectOnly){
    return getServiceModelController('service', name, objectOnly);
  };

  app.getFactory = function(name, objectOnly){
    var factory;
    if(objectOnly){
      if(!app.factoryObjects[name]){
        fileLoader.loadFactory(name + suffix.FACTORIES);
      }
      factory = app.factoryObjects[name];
    } else {
      if(!app.factories[name]){
        fileLoader.loadFactory(name + suffix.FACTORIES);
      }
      factory = app.factories[name];
    }
    if(!isDefined(factory.factoryName)){
      factory.factoryName = name;
    }
    return factory;
  };

  app.camelCase2Path = function(val){
    return val.replace(/[A-Z]/g, function(a, b){return b===0? a.toLowerCase() : "/"+a.toLowerCase();});
  };


  var server;
  app.init = function(){
    fileLoader.loadControllers(path.join(appDir,paths.CONTROLLERS), suffix.CONTROLLERS);
    fileLoader.loadServices(path.join(appDir,paths.SERVICES), suffix.SERVICES);
    fileLoader.loadFactories(path.join(appDir,paths.FACTORIES), suffix.FACTORIES);
    fileLoader.loadModels(path.join(appDir,paths.MODELS), suffix.MODELS);
    routeLoader.load();
    app.set('views', appDir+'/views');
    if(!app.get('view engine')){
      app.set('view engine', 'twig');
    }
    server = http.createServer(app);
    return server;
  };


  app.listen = function(port){
    port = port || getPort();
    (server || http.createServer(app)).listen(port, function(){
      console.log('listening on port ' + port);
    });
  };
  return app;
};


module.exports = express;
module.exports.getEnv = getEnv;
module.exports.getPort = getPort;
module.exports.createApplication = createApplication;
module.exports.isDate = isDate;
module.exports.isArray = isArray;
module.exports.isFunction = isFunction;
module.exports.isString = isString;
module.exports.isObject = isObject;
module.exports.isDefined = isDefined;
module.exports.FileLoader = FileLoader;
module.exports.RouteLoader = RouteLoader;
