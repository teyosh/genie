#!/usr/bin/env node
var fs = require('fs'),
  exec = require('child_process').exec,
  path = require('path');

var methods = {
  init: function (path) {
    if (!path) {
      console.log('No app name given\n');
      this.comment();
    } else {
      console.log('installing Genie into ' + path);
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
  comment: function () {
    console.log('init <name> - Generate a new app called <name>');
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
