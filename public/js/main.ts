
import * as $ from 'jquery';
import {notySuccess} from './plugins';
import * as newModule from './newModule.js';

import 'main.styl';

class App {
  constructor() {

  }

  public log(): void {
    console.log('loaded');
  }
}

$(() => {
  const app = new App();

  app.log();

  notySuccess('success text');

  newModule();
});
