'user strict';
module.exports = function(app){
  var BaseFactory = app.klass(function(){
    this.app = app
    this.factoryName = 'Base';
  }).methods({
    Config: function(type, name){
      var _type, _name;
      if(type !== undefined && name !== undefined){
        _type = type;
        _name = name;
      } else if(type !== undefined){
        _type = "Factory";
        _name = type;
      } else {
        _type = "Factory";
        _name = this.factoryName;
      }
      return this.app.Config(_type, _name);
    }
  });
  return BaseFactory;
};