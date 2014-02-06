'use strict';
module.exports = function(app){
  var BaseFactory = app.getFactory('Base', true);
  var ApplicationFactory = BaseFactory.extend({
    factoryName : 'Application'
  });
  return ApplicationFactory;
}