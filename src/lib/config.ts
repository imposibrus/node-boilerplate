
import * as nconf from 'nconf';
import * as path from 'path';
const packageJson = require('../../package.json');

nconf.argv()
    .env()
    .file({ file: path.resolve(__dirname, '../../config.json') });

nconf.set('version', packageJson.version);

export default nconf;
