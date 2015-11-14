
var noty = require('exports?noty!../bower_components/noty/js/noty/packaged/jquery.noty.packaged.js');

var notySuccess = function(text) {
      noty({
        type: 'success',
        text: text || 'Success!'
      });
    },
    notyError = function(text) {
      noty({
        type: 'error',
        text: text || 'Something went wrong...'
      });
    },
    notyAlert = function(text) {
      if(!text) {
        return false;
      }
      noty({
        type: 'alert',
        text: text
      });
    };
