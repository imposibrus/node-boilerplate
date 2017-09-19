const nconf = require('nconf'),
    path = require('path'),
    packageJson = require('../../package.json'),
    configEnv = process.env.NODE_ENV === 'development' ? '.dev' : '';

nconf.argv()
    .env()
    .file({ file: path.resolve(__dirname, `../../config${configEnv}.json`) });

nconf.set('version', packageJson.version);

module.exports = nconf;
