
import * as $ from 'jquery';
import {notySuccess} from './plugins';
const newModule = require('./newModule.js');

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

  newModule();
});
