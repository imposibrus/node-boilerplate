
const SessionFlashExtension = require('./extensions/SessionFlashExtension'),
    basename = require('./filters/basename');

module.exports = function(env, nunjucks) {
    SessionFlashExtension(env, nunjucks);
    basename(env);
};
