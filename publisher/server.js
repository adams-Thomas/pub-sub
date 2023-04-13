const redis = require("redis");
const publisher = redis.createClient({
  password: 'hJKLSYd73'
});

(async () => {
  const article = {
    id: '123',
    name: 'This is the basic javascript test',
    blog: 'yeet'
  }

  await publisher.connect();

  await publisher.publish('article', JSON.stringify(article));
})();
