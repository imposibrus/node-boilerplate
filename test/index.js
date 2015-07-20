
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

describe('GET /404', function() {
  it('should respond with 404 error page', function(done) {
    request(server)
        .get('/404')
        .expect('Content-Type', /text\/html/)
        .expect(404)
        .end(done);
  });
});

