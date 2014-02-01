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
  config = config || {};
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
    Base : require('./BaseFactory')(app)
  };
  app.suffix = suffix;
  app.paths = paths;
  var fileLoader = new FileLoader(app);
  var routeLoader = new RouteLoader(app);

  app.factory = function(name, factoryFunc){
    if(isArray(factoryFunc) || isObject(factoryFunc)){
      app.factories[name] = factoryFunc;
    } else {
      //factorymethod;
    }
    return app.factories[name];
  };

  app.service = function(name, serviceFunc){
    if(isFunction(serviceFunc)){
      app.services[name] = serviceFunc;
    } else {
      //serviceFunc;
    }
    return app.services[name];
  };

  app.getConfig = function(type, name){
    var _config = {};
    if(config[type] && config[type][name]){
      for(var key in config[type][name]){
        _config[key] = config[type][name][key];
      }
    }
    return _config;
  };


  app.getController = function(name){
    return app.controllers[name] || fileLoader.loadController(name + suffix.CONTROLLERS);
  };

  app.getModel = function(name){
    return app.models[name];
  };

  app.getService = function(name){
    var serviceFunc = function(app){this.app = app;};
    if(isFunction(app.services[name])){
      serviceFunc = app.services[name];
    } else {
      serviceFunc = fileLoader.loadService(name + suffix.SERVICES) || serviceFunc;
    }
    return new serviceFunc(app);
  };

  app.getFactory = function(name){
    return app.factories[name] || fileLoader.loadFactory(name + suffix.FACTORIES);
  };

  app.camelCase2Path = function(val){
    return val.replace(/[A-Z]/g, function(a, b){return b==0? a.toLowerCase() : "/"+a.toLowerCase();});
  };



  app.init = function(){
    fileLoader.loadControllers(path.join(appDir,paths.CONTROLLERS), suffix.CONTROLLERS);
    fileLoader.loadServices(path.join(appDir,paths.SERVICES), suffix.SERVICES);
    fileLoader.loadFactories(path.join(appDir,paths.FACTORIES), suffix.FACTORIES);
    fileLoader.loadModels(path.join(appDir,paths.MODELS), suffix.MODELS);
    app.use(express.favicon());
    if(getEnv() == 'development'){
      app.use(express.logger('dev'));
    }
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(app.router);
    routeLoader.load();
    app.set('views', appDir+'/views');
    app.set('view engine', 'twig');
  };


  app.listen = function(port){
    http.createServer(app).listen((port || getPort()), function(){
      console.log('listening on port ' + getPort());
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

