import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as _ from 'lodash';
import * as nunjucks from 'nunjucks';
import * as postNormalize from 'post-normalize';
import flash = require('connect-flash');

import loadExtensionsAndFilters from './lib/loadExtensionsAndFilters';
import sessionStore from './lib/sessionStore';
import config from './lib/config';
import routes from './routes';
import RequestError from './lib/RequestError';

const app = express();

// view engine setup
app.set('view engine', 'njk');

let env = nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: app.get('env') === 'development',
});

loadExtensionsAndFilters(env, nunjucks);

/* istanbul ignore next */
if (app.get('env') === 'development') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: config.get('sessionSecret'),
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
}));
app.use(flash());

app.use(postNormalize());

app.use('/public', express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.locals._ = _;
app.locals.config = config;
app.locals.env = app.get('env');

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    let err = new RequestError('Not Found');

    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
/* istanbul ignore next */
if (app.get('env') === 'development') {
    app.use((err: RequestError, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(err.status || 500);

        if (req.xhr) {
            return res.send({status: err.status || 500, message: err.message, error: err});
        }

        res.render('error', {
            message: err.message,
            error: err,
        });
    });
}

// production error handler
// no stacktraces leaked to user
/* istanbul ignore next */
app.use((err: RequestError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);

    if (req.xhr) {
        return res.send({status: err.status || 500, message: err.message, error: {}});
    }

    res.render('error', {
        message: err.message,
        error: {},
    });
});

export default app;
