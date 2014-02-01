var util = require('util');
module.exports = function(app){
  var base = app.klass(function(){
    this.beforeActions = {};
  }).methods({
    addBeforeAction: function(act, func){
      if(!func){
        func = act;
        act = "*";
      }
      var _act = [];
      if(util.isArray(act)){
        _act = act;
      } else {
        _act = [act];
      }
      (util.isArray(act)? act : [act]).forEach(function(act){
        if(this.beforeActions[act] == undefined){
          this.beforeActions[act] = [];
        }
        this.beforeActions[act].push(func);
      }.bind(this));
    }
  });
  return base;
};
