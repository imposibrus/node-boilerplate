
var $ = require('jquery'),
    {notySuccess} = require('./plugins');

require('main.styl');

class App {
  constructor() {

  }

  log() {
      notySuccess('loaded');
  }
}

$(() => {

  var app = new App();

  app.log();
});
