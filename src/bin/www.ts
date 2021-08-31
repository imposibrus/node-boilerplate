#!/usr/bin/env node

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({path: path.resolve('deploy', '.env')})

import {Server, createServer} from 'http';
import {Socket} from 'net';
import {unlinkSync} from 'fs';
import * as debug from 'debug';

import app from '../app';

process.title = String(process.env.TITLE);

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(String(process.env.PORT)),
    debugLog = debug('node-boilerplate:server');
let server: Server | null = null;

app.set('port', port);

if (process.argv.findIndex((a) => a.startsWith('db:migrate')) !== -1) {
    require('./migrate');
} else {
    /**
     * Create HTTP server.
     */

    server = createServer(app);

    server.on('error', onError);
    server.on('listening', onListening);
}

/* istanbul ignore next */
process.on('message', (message) => {
    if (message === 'shutdown') {
        graceful();
    }
});
process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

function graceful() {
    if (server) {
        server.close();
    }
    process.exit(0);
}

/**
 * Listen on provided port, on all network interfaces.
 */

export default server && server.listen(port);

/**
 * Normalize a port into a number, string, or false.
 */

/* istanbul ignore next */
function normalizePort(val: any) {
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

/* istanbul ignore next */
function onError(error: any) {
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
                        if (server) {
                            module.exports = server.listen(port);
                        }
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

/* istanbul ignore next */
function onListening() {
    const addr = server && server.address(),
        bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + (addr && addr.port);

    debugLog('Listening on ' + bind);

    if (process.send) {
        process.send('ready');
    }
}

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
    process.on('unhandledRejection', (err) => { throw err; });
    process.on('warning', (err) => {
        console.error(err.stack);
    });
}
