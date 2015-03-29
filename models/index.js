
var mongoose = require('mongoose'),
    config = require('../lib/config'),
    connection = mongoose.connection,
    debug = require('../lib/debug')('node-boilerplate:db');

connection.on('error', function() {
  mongoose.disconnect();
});
connection.on('connected', function() {
  debug('MongoDB connected');
});
connection.on('disconnected', function() {
  debug('MongoDB disconnected!');
});
mongoose.connect(config.get('mongoose:url'), {server: {auto_reconnect: true}});

module.exports = {
  User: require('./User'),
  mongoose: mongoose
};

