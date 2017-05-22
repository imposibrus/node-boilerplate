
const Sequelize = require('sequelize'),
    config = require('../lib/config'),
    sequelizeConf = config.get('sequelize');

if (process.env.NODE_ENV !== 'production') {
    sequelizeConf.options.logging = console.error;
}

const sequelize = new Sequelize(...Object.keys(sequelizeConf).map((key) => sequelizeConf[key]));

const syncing = sequelize.sync().catch((err) => {
    console.error(err);
    process.exit(-1);
});

const User = sequelize.import('./User');

module.exports = {sequelize, syncing, User};
