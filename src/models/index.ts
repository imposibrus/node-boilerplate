import {Sequelize} from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';

import User from './User';

/* istanbul ignore next */
const logging = process.env.NODE_ENV === 'development' ? (sql: string/*, sequelize*/) => {
        console.error(sql);
    } : false;
const sequelize = new Sequelize({
    database: String(process.env.DB_NAME),
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PASS),
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    dialect: String(process.env.DB_DIALECT) as Dialect,
    logging,
});

sequelize.addModels([
    User,
]);

/* istanbul ignore next */
const syncing = sequelize.authenticate().then(() => {
    if (process.env.NODE_ENV === 'development') {
        console.error('DB authenticated');
    }
}).catch((err: Error) => {
    console.error(err);
    process.exit(-1);
});

export {sequelize, syncing, User};
