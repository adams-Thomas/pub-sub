require('dotenv').config();

let config = {
  port: process.env.PORT || 3001,
  env: process.env.NODE_ENV || 'development',
  redis_password: process.env.REDIS_PASSWORD || ''
}

module.exports = config;
