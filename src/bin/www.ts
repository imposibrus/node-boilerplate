#!/usr/bin/env node

/**
 * Module dependencies.
 */

import * as newrelic from 'newrelic';
import app from '../app';
import * as debug from 'debug';
import * as http from 'http';
import config from '../lib/config';

const debugLog = debug('node-boilerplate:server');

process.title = config.get('title');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.get('PORT'));

app.set('port', port);

app.locals.newrelic = newrelic;

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

module.exports = server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

process.on('message', (message) => {
  if (message === 'shutdown') {
    server.close(() => {});
    process.exit(0);
  }
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);

      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);

      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address(),
      bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  debugLog('Listening on ' + bind);

  if (process.send) {
      process.send('online');
  }
}
