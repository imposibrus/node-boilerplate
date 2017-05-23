
import * as Noty from 'noty';

import 'noty.css';

const notySuccess = (text) => {
      new Noty({
        type: 'success',
        text: text || 'Success!',
      }).show();
    },
    notyError = (text) => {
      new Noty({
        type: 'error',
        text: text || 'Something went wrong...',
      }).show();
    },
    notyAlert = (text) => {
      if (!text) {
        return false;
      }

      new Noty({
        type: 'alert',
        text,
      }).show();
    };

export {notySuccess, notyError, notyAlert};
