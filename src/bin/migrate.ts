import * as Umzug from 'umzug';
import {sequelize} from '../models';

const umzug = new Umzug({
    logging: console.error,
    storage: 'sequelize',
    storageOptions: {sequelize},
    migrations: {
        params: [sequelize.getQueryInterface(), sequelize.Sequelize],
    },
});
const isUndo = process.argv.indexOf('db:migrate:undo') !== -1;

export default (async function migrate() {
    try {
        console.log('Pending migrations count:', (await umzug.pending()).length);

        if (isUndo) {
            console.log('Down migrations');
            await umzug.down();
        } else {
            console.log('Up migrations');
            await umzug.up();
        }
    } catch (err) {
        console.error('Migration error:');
        console.error(err);
        process.exit(-1);
        return;
    }

    console.log('Migration completes successfully!');
    process.exit(0);
})();
