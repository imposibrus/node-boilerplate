
import mongoose from 'mongoose';
import config from '../lib/config';
import _logger from '../lib/logger';

const connection = mongoose.connection,
    logger = _logger.getLogger('models');

connection.on('error', () => {
  mongoose.disconnect();
});
connection.on('connected', () => {
  logger.debug('MongoDB connected');
});
connection.on('disconnected', () => {
  logger.debug('MongoDB disconnected!');
});
mongoose.connect(config.get('mongoose:url'), {server: {auto_reconnect: true}});

export {mongoose as mongoose};
export {default as User} from './User';
