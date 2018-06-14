
import * as Sequelize from 'sequelize';
import config from '../lib/config';
import * as UserDefinition from './User';

const logging = process.env.NODE_ENV === 'development' ? (sql: string/*, sequelize*/) => {
        console.error(sql);
    } : config.get('DB_LOGGING'),
    sequelize = new Sequelize(
        config.get('DB_NAME'),
        config.get('DB_USER'),
        config.get('DB_PASSWORD'),
        {
            host: config.get('DB_HOST'),
            dialect: config.get('DB_DIALECT'),
            logging,
        },
    ),
    User = sequelize.import<UserDefinition.UserInstance, UserDefinition.UserAttribute>(
        './User',
        UserDefinition.definition,
    );

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
