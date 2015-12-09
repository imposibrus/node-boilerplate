
var $ = require('jquery');

require('./plugins');

require('main.styl');

class App {
  constructor() {

  }

  log() {
    console.log('loaded');
  }
}

$(() => {

  var app = new App();

  app.log();
});
