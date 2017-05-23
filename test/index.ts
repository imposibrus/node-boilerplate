
import * as server from '../src/bin/www';
import * as request from 'supertest';

describe('GET /', function() {
  it('should respond with main page', function() {
    return request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200);
  });
});

describe('GET /404', function() {
  it('should respond with 404 error page', function() {
    return request(server)
        .get('/404')
        .expect('Content-Type', /text\/html/)
        .expect(404);
  });
});
