#!/usr/bin/env node
var fs = require('fs'),
  exec = require('child_process').exec,
  path = require('path');

function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function pulral(str){
  var pulralStr = "";
  if(/(a|i|u|e|o)o$/.test(str)){
    pulralStr = str + "s";
  } else if(/(s|x|sh|ch|o)$/.test(str)){
    pulralStr = str.replace(/(s|x|sh|ch|o)$/, "es");
  } else if (/(b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z)y$/.test(str)){
    pulralStr = str.replace(/y$/, "ies");
  } else if (/(f|fe)$/.test(str)){
    pulralStr = str.replace(/(f|fe)$/, "ves");
  } else {
    pulralStr = str + 's';
  }
  return pulralStr;
}

function generateContent(name, type){
  var fileName = capitalize(name);
  var filePaths = fileName.match(/([A-Z][^A-Z]+)/g),
  src = "";
  var fpath = [];
  for(var i=0; i<filePaths.length; i++){
    fpath.push(filePaths[i].replace(/^[a-z]/, function(a, b){ return b==0? a.toUpperCase() : a}));
  }
  src = path.join('./app/'+pulral( type )+'/' + fpath.join("/") + "/");
  exec('mkdir -p '+ src, function(err){
    var typeName = capitalize(type);
    var dstFile = src + fileName + typeName + '.js';
    console.log('generating '+type+' '+ dstFile);
    var patternFile = __dirname + '/../src/Pattern'+typeName+'.js';
    fs.open(dstFile, 'wx+', function(err, fd){
      if(err){
        console.log(dstFile + ' already exists');
      } else {
        var content = new Buffer(fs.readFileSync(patternFile).toString().replace(/Pattern/g, fileName));
        fs.write(fd, content, 0, content.length, null, function(err){
          console.log('Successfully created ' + dstFile);
        });
      }
    });
  });
}

var methods = {
  create: function (path) {
    if (!path) {
      console.log('No app name given\n');
      this.comment();
    } else {
      console.log('creating Genie into ' + path);
      fs.exists(path, function (exists) {
        if (exists) {
          console.log(path + ' already exists');
        } else {
          fs.mkdirSync('./' + path);
          exec('cp -R ' + __dirname + '/../src/all/ ' + path, function (err, out) {
            if (err) {
              console.log('error', err);
            } else {
              console.log('Success!');
            }
          });
        }
      });
    }
  },
  controller: function(controllerName){
    console.log(controllerName);
    if(!controllerName){
      console.log('No controller name given\n');
      this.commient();
    } else {
      generateContent(controllerName, 'controller');
    }
  },
  model: function(modelName){
    if(!modelName){
      console.log('No controller name given\n');
      this.commient();
    } else {
      generateContent(modelName, 'model');
    }
  },
  service: function(serviceName){
    if(!serviceName){
      console.log('No controller name given\n');
      this.commient();
    } else {
      generateContent(serviceName, 'service');
    }

  },
  factory: function(factoryName){
    if(!factoryName){
      console.log('No controller name given\n');
      this.commient();
    } else {
      generateContent(factoryName, 'factory');
    }
  },
  help : function(argument) {
    console.log('Genie is framework for express.');
    this.comment();
  },
  comment: function () {
    console.log('create <name> - Generate a new app called <name>');
    console.log('controller <name> - Generate a new controller called <name>');
    console.log('model <name> - Generate a new model called <name>');
    console.log('service <name> - Generate a new service called <name>');
    console.log('factory <name> - Generate a new factory called <name>');
  }
};

!(function (args) {
  var cmd = args.shift();
  if (!cmd) {
    methods.help();
  } else {
    methods[cmd] && methods[cmd].apply(methods, args);
  }
})(process.argv.slice(2));
