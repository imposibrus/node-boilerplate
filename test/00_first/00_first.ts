
import {before} from 'mocha';

import * as models from '../../src/models';

before(async () => {
    await models.sequelize.sync({force: true});
});
