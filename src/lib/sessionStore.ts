
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';

const RedisStore = connectRedis(session),
      redisStore = new RedisStore({
        ttl: 60 * 60 * 24 * 2 // 48 hours
      });

let redisReConnectAttempts = 0;

/* istanbul ignore next */
redisStore.on('disconnect', (err) => {
  redisReConnectAttempts++;
  if(redisReConnectAttempts > 5) {
    throw err;
  }
  console.error(err);
});

export default redisStore;
