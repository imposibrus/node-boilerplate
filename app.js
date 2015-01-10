var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    config = require('./lib/config'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

    _ = require('lodash'),

    routes = require('./routes'),

    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

if(app.get('env') === 'development') {
  app.use(logger('dev'));
  //app.locals.pretty = true;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'node-boilerplate',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    url: config.get('mongoose:url'),
    autoReconnect: true,
    defaultExpirationTime: 1000 * 60 * 60 * 24 * 2 // 48 hours
  }, function() {})
}));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.locals._ = _;

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
