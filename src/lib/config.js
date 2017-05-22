const nconf = require('nconf'),
    path = require('path'),
    packageJson = require('../../package.json');

nconf.argv()
    .env()
    .file({ file: path.resolve(__dirname, '../../config.json') });

nconf.set('version', packageJson.version);

module.exports = nconf;
