
import * as Sequelize from 'sequelize';
import config from '../lib/config';
import * as UserDefinition from './User';

let sequelizeConf = config.get('sequelize');

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  sequelizeConf.options.logging = console.error;
}

const sequelize = new Sequelize(sequelizeConf.database, sequelizeConf.username, sequelizeConf.password, sequelizeConf.options);

const User = sequelize.import<UserDefinition.UserInstance, UserDefinition.UserAttribute>('./User', UserDefinition.definition);

export {sequelize};
export {User};

/* istanbul ignore next */
export var syncing = sequelize.sync(/*{force: true}*/).then(() => {
  if (process.env.NODE_ENV === 'development') {
    console.error('DB synced');
  }
}).catch((err) => {
  console.error(err);
  process.exit(-1);
});
