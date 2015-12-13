
import Sequelize from 'sequelize';
import config from '../lib/config';
import UserModel from './User';

const sequelize = new Sequelize(
    config.get('sequelize:database'),
    config.get('sequelize:username'),
    config.get('sequelize:password'),
    config.get('sequelize:options')
);

var User = UserModel(sequelize);

export {sequelize as sequelize};
export {User as User};
