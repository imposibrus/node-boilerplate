
var server = require('../bin/www'),
    request = require('supertest'),
    models = require('../models');


describe('GET /', function() {
  it('should respond with main page', function(done) {
    request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .end(done);
  });
});



//before(function(done) {
//  models.Token.remove({}).exec(function() {
//    models.User.remove({}).exec(function() {
//      models.Order.remove({}).exec(function() {
//        models.Album.remove({}).exec(done);
//      });
//    });
//  });
//});


//var code = '',
//    token = '',
//    album_id = '',
//    recipient_id = '';

//describe('POST /api/login', function() {
//  it('should send code', function(done) {
//    request(server)
//        .post('/api/login')
//        .send({phone: '1234567890'})
//        .expect('Content-Type', /json/)
//        .expect(200)
//        .end(function(err, res) {
//          if(err) {
//            return done(err);
//          }
//
//          res.body.status.should.be.equal(200);
//          res.body.should.have.property('user');
//          res.body.user.should.have.properties(['id', 'phone']);
//          res.body.should.have.property('code');
//          code = res.body.code;
//          done();
//        });
//  });
//});
//
//describe('POST /api/code', function() {
//  it('should accept code', function(done) {
//    request(server)
//        .post('/api/code')
//        .send({phone: '1234567890', code: code})
//        .expect('Content-Type', /json/)
//        .expect(200)
//        .end(function(err, res) {
//          if(err) {
//            return done(err);
//          }
//
//          res.body.status.should.be.equal(200);
//          res.body.should.have.property('token');
//          token = res.body.token;
//          done();
//        });
//  });
//});
//
//describe('POST /api/albums/new', function() {
//  it('should create new album', function(done) {
//    request(server)
//        .post('/api/albums/new')
//        .send({token: token, title: 'my test album'})
//        .expect('Content-Type', /json/)
//        .expect(200)
//        .end(function(err, res) {
//          if(err) {
//            return done(err);
//          }
//
//          res.body.status.should.be.equal(200);
//          res.body.should.have.property('album_id');
//          album_id = res.body.album_id;
//          done();
//        });
//  });
//});
//
//describe('POST /api/upload/draft', function() {
//  it('should upload photos to album', function(done) {
//    request(server)
//        .post('/api/upload/draft')
//        .query({token: token, album_id: album_id})
//        .attach('photo', '/home/imposibrus/Pictures/image.png')
//        .expect('Content-Type', /json/)
//        .expect(200)
//        .end(function(err, res) {
//          if(err) {
//            return done(err);
//          }
//
//          res.body.status.should.be.equal(200);
//          res.body.should.have.properties(['album_id', 'files']);
//          res.body.files.length.should.be.equal(1);
//          done();
//        });
//  });
//});
//
//describe('POST /api/recipients/new', function() {
//  it('should create new recipient', function(done) {
//    request(server)
//        .post('/api/recipients/new')
//        .query({token: token})
//        .send({
//          name: 'name',
//          surname: 'surname',
//          company: 'company',
//          street: 'street',
//          house: 'house',
//          postal_code: 'postal_code',
//          city: 'city',
//          region: 'region',
//          country: 'country'
//        })
//        .expect('Content-Type', /json/)
//        .expect(200)
//        .end(function(err, res) {
//          if(err) {
//            return done(err);
//          }
//
//          res.body.status.should.be.equal(200);
//          res.body.should.have.property('user');
//          res.body.user.recipients.length.should.be.equal(1);
//          recipient_id = res.body.user.recipients[0].id;
//          done();
//        });
//  });
//});
//
//describe('POST /api/orders/new', function() {
//  it('should upload photos to album', function(done) {
//    request(server)
//        .post('/api/orders/new')
//        .query({token: token, album_id: album_id})
//        .send({recipient_id: recipient_id})
//        .expect('Content-Type', /json/)
//        .expect(200)
//        .end(function(err, res) {
//          if(err) {
//            return done(err);
//          }
//
//          res.body.status.should.be.equal(200);
//          res.body.should.have.property('order');
//          res.body.order.should.have.properties({
//            album: album_id,
//            //user: '',
//            recipient: recipient_id
//            //status: '',
//            //number: 1
//          });
//          done();
//        });
//  });
//});



