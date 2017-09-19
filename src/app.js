const express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    postNormalize = require('post-normalize'),
    nunjucks = require('nunjucks'),
    _ = require('lodash'),
    flash = require('connect-flash'),
    config = require('./lib/config'),
    sessionStore = require('./lib/sessionStore'),
    loadExtensionsAndFilters = require('./lib/loadExtensionsAndFilters'),
    routes = require('./routes'),

    app = express();

// view engine setup
app.set('view engine', 'njk');

const env = nunjucks.configure('views', {
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
app.use((req, res, next) => {
    var err = new Error('Not Found');

    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
/* istanbul ignore next */
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
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
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    if (req.xhr) {
        return res.send({status: err.status || 500, message: err.message, error: {}});
    }

    res.render('error', {
        message: err.message,
        error: {},
    });
});

module.exports = app;
