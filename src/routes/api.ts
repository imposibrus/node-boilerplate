import * as express from 'express';

import RequestError from '../lib/RequestError';

const router = express.Router();

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(new RequestError('Not Found', 404));
});

router.use((err: RequestError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).send({status: err.status || 500, message: err.message, error: {}});
});

export default router;
