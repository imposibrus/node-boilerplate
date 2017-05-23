
const readline = require('readline'),
    models = require('../dst/models'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    }),
    hidden = (query, callback) => {
        const stdin = process.openStdin();

        process.stdin.on('data', (char) => {
            char = char + '';
            switch (char) {
                case '\n':
                case '\r':
                case '\u0004':
                    stdin.pause();
                    break;
                default:
                    process.stdout.write('\033[2K\033[200D' + query + '*'.repeat(rl.line.length));
                    break;
            }
        });

        rl.question(query, (value) => {
            rl.history = rl.history.slice(1);
            callback(value);
        });
    };

rl.question('Enter login: ', (login) => {
    if (!login) {
        console.error('Login can not be empty!');
        rl.close();
        return;
    }

    hidden('Enter password: ', (password) => {
        if (!password) {
            console.error('Password can not be empty!');
            rl.close();
            return;
        }

        models.User.create({login, password, isAdmin: true}).then((createdAdmin) => {
            console.log('Created admin with ID', createdAdmin.id);
            models.sequelize.close();
            process.exit(0);
        }).catch((err) => {
            console.error(err.stack);
            process.exit(-1);
        });

        rl.close();
    });
});
