
import * as noty from 'noty';

let notySuccess = function(text) {
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
      if (!text) {
        return false;
      }
      noty({
        type: 'alert',
        text: text
      });
    };

export {notySuccess, notyError, notyAlert};
