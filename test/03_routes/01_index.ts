import * as request from 'supertest';
import {describe, it} from 'mocha';

import server from '../../src/bin/www';

describe('GET /', () => {
    it('should respond with main page', () => {
        return request(server)
            .get('/')
            .expect('Content-Type', /application\/json/)
            .expect({status: 200, message: 'it is alive!'})
            .expect(200);
    });
});

describe('GET /404', () => {
    it('should respond with 404 error page', () => {
        return request(server)
            .get('/404')
            .expect('Content-Type', /application\/json/)
            .expect({status: 404, message: 'Not Found', error: {}})
            .expect(404);
    });
});

describe('API', () => {
    describe('GET /api/404', () => {
        it('should respond with 404 error page', () => {
            return request(server)
                .get('/api/404')
                .expect('Content-Type', /application\/json/)
                .expect({status: 404, message: 'Not Found', error: {}})
                .expect(404);
        });
    });
});
