
var server = require('../bin/www'),
    request = require('supertest');


describe('GET /', function() {
  it('should respond with main page', function(done) {
    request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .end(done);
  });
});

