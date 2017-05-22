
const server = require('../../src/bin/www'),
    request = require('supertest');


describe('GET /', () => {
    it('should respond with main page', () => {
        return request(server)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200);
    });
});

describe('GET /404', () => {
    it('should respond with 404 error page', () => {
        return request(server)
            .get('/404')
            .expect('Content-Type', /text\/html/)
            .expect(404);
    });
});

