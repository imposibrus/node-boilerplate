
import mongoose from 'mongoose';
import config from '../lib/config';
import debug from '../lib/debug';

const connection = mongoose.connection,
    debugLog = debug('node-boilerplate:db');

connection.on('error', () => {
  mongoose.disconnect();
});
connection.on('connected', () => {
  debugLog('MongoDB connected');
});
connection.on('disconnected', () => {
  debugLog('MongoDB disconnected!');
});
mongoose.connect(config.get('mongoose:url'), {server: {auto_reconnect: true}});

export {mongoose as mongoose};
export {default as User} from './User';
