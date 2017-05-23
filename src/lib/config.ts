
import * as nconf from 'nconf';
import * as path from 'path';
import packageJson = require('../../package.json');

const configEnv = process.env.NODE_ENV === 'development' ? '.dev' : '';

nconf.argv()
    .env()
    .file({ file: path.resolve(__dirname, `../../config${configEnv}.json`) });

nconf.set('version', packageJson.version);

export default nconf;
