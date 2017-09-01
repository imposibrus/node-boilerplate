#!/usr/bin/env node

/**
 * Module dependencies.
 */

import * as newrelic from 'newrelic';
import app from '../app';
import * as debug from 'debug';
import * as http from 'http';
import {Socket} from 'net';
import {unlinkSync} from 'fs';
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

function graceful() {
    server.close();
    process.exit(0);
}

process.on('message', (message) => {
  if (message === 'shutdown') {
      graceful();
  }
});
process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

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

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);

            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');

            if (typeof port === 'string') {
                const clientSocket = new Socket();

                clientSocket.on('error', (e: any) => {
                    if (e.code === 'ECONNREFUSED') {
                        unlinkSync(port);

                        console.log('server recovered');
                        module.exports = server.listen(port);
                    } else {
                        console.error(e);
                        process.exit(1);
                    }
                });

                clientSocket.connect(port, () => {
                    console.log('Another server already listening on this pipe, giving up...');
                    process.exit(0);
                });
            } else {
                process.exit(1);
            }

            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address(),
      bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  debugLog('Listening on ' + bind);

  if (process.send) {
      process.send('online');
  }
}
