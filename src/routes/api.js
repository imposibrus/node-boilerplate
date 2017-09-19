
const express = require('express'),
    RequestError = require('../lib/RequestError'),
    router = express.Router();

router.use((req, res, next) => {
    const err = new RequestError('Not Found');

    err.status = 404;
    next(err);
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).send({status: err.status || 500, message: err.message, error: {}});
});

module.exports = router;
