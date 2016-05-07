import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as _ from 'lodash';

import sessionStore from './lib/sessionStore';
import config from './lib/config';
import routes from './routes';
import postNormalize from './lib/postNormalize';
import RequestError from './lib/RequestError';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

/* istanbul ignore next */
if (app.get('env') === 'development') {
  app.use(logger('dev'));
  // app.locals.pretty = true;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: config.get('sessionSecret'),
  resave: true,
  saveUninitialized: false,
  store: sessionStore
}));

app.use(postNormalize);

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
    if(req.xhr) {
      return res.send({status: err.status || 500, message: err.message, error: err});
    }
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
/* istanbul ignore next */
app.use((err: RequestError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500);
  if(req.xhr) {
    return res.send({status: err.status || 500, message: err.message, error: {}});
  }
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export default app;
