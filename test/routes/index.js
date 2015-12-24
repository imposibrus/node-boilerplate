
import server from '../../src/bin/www';
import request from 'supertest';


describe('GET /', () => {
  it('should respond with main page', (done) => {
    request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .end(done);
  });
});

describe('GET /404', () => {
  it('should respond with 404 error page', (done) => {
    request(server)
        .get('/404')
        .expect('Content-Type', /text\/html/)
        .expect(404)
        .end(done);
  });
});

