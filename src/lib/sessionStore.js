
const session = require('express-session'),
    connectRedis = require('connect-redis'),
    redisSharedConnection = require('./redisSharedConnection'),
    RedisStore = connectRedis(session),
    redisStore = new RedisStore({
        ttl: 60 * 60 * 24 * 2, // 48 hours
        client: redisSharedConnection,
    });

module.exports = redisStore;
