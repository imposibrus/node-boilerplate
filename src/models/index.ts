
import * as Sequelize from 'sequelize';
import config from '../lib/config';
import * as UserDefinition from './User';

const sequelizeConf = config.get('sequelize');

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
    sequelizeConf.options.logging = console.error;
}

const sequelize = new Sequelize(sequelizeConf.database, sequelizeConf.username, sequelizeConf.password, sequelizeConf.options),
    User = sequelize.import<UserDefinition.UserInstance, UserDefinition.UserAttribute>('./User', UserDefinition.definition);

/* istanbul ignore next */
const syncing = sequelize.sync().then(() => {
    if (process.env.NODE_ENV === 'development') {
        console.error('DB synced');
    }
}).catch((err) => {
    console.error(err);
    process.exit(-1);
});

export {sequelize, User, syncing};
