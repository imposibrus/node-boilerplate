import nconf from 'nconf';
import path from 'path';
import packageJson from '../../package.json';

nconf.argv()
    .env()
    .file({ file: path.resolve(__dirname, '../../config.json') });

nconf.set('version', packageJson.version);

//if(nconf.get('NODE_ENV') == 'testing') {
//    nconf.set('mongoose:url', 'mongodb://localhost/crm-brainstore_testing');
//}

export default nconf;
