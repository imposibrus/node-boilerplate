
var mongoose = require('mongoose'),
    config = require('../lib/config'),
    connection = mongoose.connection/*,
    autoIncrement = require('mongoose-auto-increment')*/;

connection.on('error', function() {
  mongoose.disconnect();
});
connection.on('connected', function() {
  console.log('MongoDB connected');
});
connection.on('disconnected', function() {
  console.log('MongoDB disconnected!');
});
mongoose.connect(config.get('mongoose:url'), {server: {auto_reconnect: true}});

//autoIncrement.initialize(connection);

module.exports = {
  //Options: require('./Options'),
  //Token: require('./Token'),
  //User: require('./User'),
  //Album: require('./Album'),
  //Order: require('./Order')
};

//module.exports.Options.findOne({}).exec(function(err, Options) {
//  if(!Options) {
//    new module.exports.Options().save(function() {});
//  }
//});
