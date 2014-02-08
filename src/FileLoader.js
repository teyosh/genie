'use strict';
module.exports = (function(){
  var util = require('util'),
  fs = require('fs'),
  path = require('path');

  function FileLoader(app){
    this.app = app;
    this.suffix = app.suffix;
    this.src = app.paths;
  }

  FileLoader.prototype.loadFiles = function(src, suffix){
    var files = fs.readdirSync(src);
    files.forEach(function(file){
      var loadPath = path.join(src, file);
      try {
        var stat = fs.statSync(loadPath);
        if(stat.isDirectory()){
          this.loadFiles(loadPath, suffix);
        } else if(stat.isFile()){
          if(/\.js$|\.json$/.test(file)){
            if(this["load"+suffix]){
              this["load"+suffix](file, src, suffix);
            }
          }
        }
      } catch (e) {
        console.log("Error", e.stack);
        throw e;
      }
    }.bind(this));
  };

  FileLoader.prototype.load = function(file, src, suffix){
    var suffixReg = new RegExp(suffix+".*");
    var name = file.replace(suffixReg, "");
    var filepath = "";
    if(name.match(/^[A-Z]/g).length > 1){
      filepath = this.app.camelcase2path(name);
    }
    src = src || path.join(this.app.appDir, filepath);
    return {
      name : name,
      func : require(path.join(src, file))(this.app)
    };
  };


  FileLoader.prototype.loadControllers = function(src){
    this.loadFiles(src, this.suffix.CONTROLLERS);
  };

  FileLoader.prototype.loadController = function(file, src){
    src = src || path.join(this.app.appDir,this.src.CONTROLLERS);
    var loadFn = this.load(file, src, this.suffix.CONTROLLERS);
    if(!this.app.controllers[loadFn.name]){
      this.app.controllers[loadFn.name] = loadFn.func;
    }
    return this.app.controllers[loadFn.name];
  };

  FileLoader.prototype.loadModels = function(src){
    this.loadFiles(src, this.suffix.MODELS);
  };

  FileLoader.prototype.loadModel = function(file, src){
    src = src || path.join(this.app.appDir,this.src.MODELS);
    var loadFn = this.load(file, src, this.suffix.MODELS);
    if(!this.app.models[loadFn.name]){
      this.app.models[loadFn.name] = loadFn.func;
    }
    return this.app.models[loadFn.name];
  };

  FileLoader.prototype.loadServices = function(src){
    this.loadFiles(src, this.suffix.SERVICES);
  };

  FileLoader.prototype.loadService = function(file, src){
    src = src || path.join(this.app.appDir,this.src.SERVICES);
    var loadFn = this.load(file, src, this.suffix.SERVICES);
    return this.app.service(loadFn.name, loadFn.func);
  };

  FileLoader.prototype.loadFactories = function(src){
    this.loadFiles(src, this.suffix.FACTORIES);
  };

  FileLoader.prototype.loadFactory = function(file, src){
    src = src || path.join(this.app.appDir, this.src.FACTORIES);
    var loadFn = this.load(file, src, this.suffix.FACTORIES);
    return this.app.factory(loadFn.name, loadFn.func);
  };
  return FileLoader;
})();
