var chai = require('chai');
var expect = chai.expect;
var genie = require('../src/genie');
var FileLoader = require('../src/genie').FileLoader;
var RouteLoader = require('../src/genie').RouteLoader;
describe('RouteLoader', function() {
  var config = require('./test/app/config/test');
  var app = genie.createApplication(__dirname, config);
  var fileLoader = new FileLoader(app);
  var routeLoader = new RouteLoader(app);
  var check = {
    getPaths : [ '/:test/:id',
                 '/test/test2',
                 '/test/get/result/:res'],
    putPaths : [ '/test/test',
                 '/test/get/result/:res'],
    postPaths: [ '/:post',
                 '/test/test'],
    deletePaths: [ '/test/test',
                   '/test/get/result/:res']
  };
  describe('Load Route', function() {
    fileLoader.loadFiles(__dirname+'/test/app/controllers/', app.suffix.CONTROLLERS);
    routeLoader.load();
    it('should set router', function(){
      var getPaths = {};
      var putPaths = {};
      var postPaths = {};
      var deletePaths = {};
      app.routes.get.forEach(function(route){
        getPaths[route.path] = true;
      });
      app.routes.put.forEach(function(route){
        putPaths[route.path] = true;
      });
      app.routes.post.forEach(function(route){
        postPaths[route.path] = true;
      });
      app.routes.delete.forEach(function(route){
        deletePaths[route.path] = true;
      });
      expect(getPaths).to.have.keys(check.getPaths);
      expect(putPaths).to.have.keys(check.putPaths);
      expect(postPaths).to.have.keys(check.postPaths);
      expect(deletePaths).to.have.keys(check.deletePaths);
    });
  });
});
