
import * as Redis from 'ioredis';

const redis = new Redis();

let redisReConnectAttempts = 0;

/* istanbul ignore next */
redis.on('error', (err: Error) => {
    redisReConnectAttempts++;

    if (redisReConnectAttempts > 5) {
        throw err;
    }

    console.error(err);
});

export default redis;
