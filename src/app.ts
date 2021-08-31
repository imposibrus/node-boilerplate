import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as postNormalize from 'post-normalize';

import routes from './routes';
import RequestError from './lib/RequestError';

const app = express();

/* istanbul ignore next */
if (app.get('env') === 'development') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(postNormalize());

app.use('/', routes);

// catch 404 and forward to error handler
/* istanbul ignore next */
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(new RequestError('Not Found', 404));
});

// error handler

/* istanbul ignore next */
app.use((err: RequestError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);

    const error = app.get('env') === 'development' ? err : {};

    res.send({status: err.status || 500, message: err.message, error});
});

export default app;
