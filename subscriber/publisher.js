const redis = require("redis");

(async () => {
  const client = redis.createClient({
    password: 'hJKLSYd73'
  });

  const subscriber = client.duplicate();
  await subscriber.connect();

  await subscriber.subscribe('article', (message) => {
    console.log(message);
  });
})();
