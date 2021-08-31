const path = require('path');
require('dotenv').config({path: path.resolve('deploy', '.env')})

const generic = {
    migrationTimestamps: true,
    seedersTimestamps: true,
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
};

module.exports = {
    development: {
        ...generic,
    },
    testing: {
        ...generic,
        database: 'node-boilerplate_test',
    },
    production: {
        ...generic,
    }
};
