
import config from './config';
import session from 'express-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

/* istanbul ignore next */
export default new MongoStore({
    url: config.get('mongoose:url'),
    autoReconnect: true,
    ttl: 1000 * 60 * 60 * 24 * 2 // 48 hours
  }, function() {});
