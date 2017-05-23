
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import redisSharedConnection from './redisSharedConnection';

const RedisStore = connectRedis(session),
    redisStore = new RedisStore({
        ttl: 60 * 60 * 24 * 2, // 48 hours
        client: redisSharedConnection,
    });

export default redisStore;
