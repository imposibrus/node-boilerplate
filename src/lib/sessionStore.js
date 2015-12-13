
import config from './config';
import session from 'express-session';
import {sequelize as sequelize} from '../models';
import connectSessionStore from 'connect-session-sequelize';

const SequelizeStore = connectSessionStore(session.Store);

/* istanbul ignore next */
export default new SequelizeStore({
  db: sequelize,
  expiration: 1000 * 60 * 60 * 24 * 2 // 48 hours
});
