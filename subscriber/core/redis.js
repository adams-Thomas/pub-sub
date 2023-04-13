const redis = require('redis');
const config = require('../config');

const client = redis.createClient({
  socket: {
    port: 6379,
    host: 'redis'
  },
  password: config.redis_password
});

module.exports = client;
