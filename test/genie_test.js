var chai = require('chai');
var expect = chai.expect;
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when not present', function(){
      expect([1,2].indexOf(4)).to.equal(-1);
    });
  });
});
