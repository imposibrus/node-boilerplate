
import * as express from 'express';

import RequestError from '../lib/RequestError';

const router = express.Router();

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const err = new RequestError('Not Found');

    err.status = 404;
    next(err);
});

router.use((err: RequestError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).send({status: err.status || 500, message: err.message, error: {}});
});

export default router;
