
const Noty = require('noty');

require('noty.css');

let notySuccess = function(text) {
        new Noty({
            type: 'success',
            text: text || 'Success!'
        }).show();
    },
    notyError = function(text) {
        new Noty({
            type: 'error',
            text: text || 'Something went wrong...'
        }).show();
    },
    notyAlert = function(text) {
        if (!text) {
            return false;
        }

        new Noty({
            type: 'alert',
            text: text
        }).show();
    };

module.exports = {notySuccess, notyError, notyAlert};
