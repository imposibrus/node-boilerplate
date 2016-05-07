
import $ = require('jquery');
import {notySuccess} from './plugins';

require('main.styl');

class App {
  constructor() {

  }

  public log(): void {
    console.log('loaded');
  }
}

$(() => {

  let app = new App();

  app.log();

  notySuccess('success text');
});
