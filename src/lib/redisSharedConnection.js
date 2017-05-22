
const Redis = require('ioredis'),
    redis = new Redis();

let redisReConnectAttempts = 0;

/* istanbul ignore next */
redis.on('error', (err) => {
    redisReConnectAttempts++;

    if (redisReConnectAttempts > 5) {
        throw err;
    }

    console.error(err);
});

module.exports = redis;
