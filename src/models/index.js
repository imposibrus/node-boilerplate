
import Sequelize from 'sequelize';
import config from '../lib/config';

var sequelizeConf = config.get('sequelize');

if(process.env.NODE_ENV == 'development') {
  sequelizeConf.options.logging = console.error;
}

const sequelize = new Sequelize(...Object.keys(sequelizeConf).map((key) => sequelizeConf[key]));

sequelize.sync().catch((err) => {
  console.error(err);
  process.exit(-1);
});

var User = sequelize.import('./User');

export {sequelize as sequelize};
export {User as User};
