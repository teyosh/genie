var chai = require('chai');
var expect = chai.expect;
var genie = require('../src/genie');
var FileLoader = require('../src/genie').FileLoader;
describe('FileLoader', function() {
  var config = require('./test/app/config/test');
  var app = genie.createApplication(__dirname, config);
  var fileLoader = new FileLoader(app);
  describe('Load controller files', function() {
    fileLoader.loadFiles(__dirname+'/test/app/controllers/', app.suffix.CONTROLLERS);
    it('should set controllers', function(){
      var checkMethods = [
        "Application",
        "Base",
        "Test",
        "TestGet"
      ];
      expect(app.controllers).to.have.keys(checkMethods);
    });
  });

  describe('Load model files', function() {
    fileLoader.loadFiles(__dirname+'/test/app/models/', app.suffix.MODELS);
    it('should set models', function(){
      var checkMethods = [
        "Application",
        "Base",
        "Test",
        "TestGet"
      ];
      expect(app.models).to.have.keys(checkMethods);
    });
  });

  describe('Load service files', function() {
    fileLoader.loadFiles(__dirname+'/test/app/services/', app.suffix.SERVICES);
    it('should set services', function(){
      var checkMethods = [
        "Application",
        "Base",
        "Test",
        "TestGet"
      ];
      expect(app.services).to.have.keys(checkMethods);
    });
  });

  describe('Load factory files', function() {
    fileLoader.loadFiles(__dirname+'/test/app/factories/', app.suffix.FACTORIES);
    it('should set factories', function(){
      var checkMethods = [
        "Application",
        "Base",
        "Test",
        "TestGet"
      ];
      expect(app.factories).to.have.keys(checkMethods);
    });
  });
});
