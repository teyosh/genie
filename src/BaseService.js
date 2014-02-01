module.exports = function(app){
  'use strict';
  var app = app;
  function Base(){
    this.app = app;
    this.serviceName = "Base";
  }
  return Base;
};
