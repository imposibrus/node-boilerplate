require('source-map-support/register');
require('ts-node/register');
const path = require('path')
require('dotenv').config({path: path.resolve('deploy', '.env')})

process.env.DB_NAME = 'node-boilerplate_test';
process.env.PORT = '0';
process.env.NODE_ENV = 'testing';

module.exports = {
    bail: true,
    timeout: 5000,
    recursive: true,
    checkLeaks: true,
    fullTrace: true,
    exit: true,
};
