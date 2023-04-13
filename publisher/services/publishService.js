const logger = require('../core/logger');
const redisClient = require('../core/redis')

class PublishService {
  constructor() {
    logger.info('Publish service');
  }

  async publish(subscription, dto) {
    try {    
      await redisClient.connect();

      await redisClient.publish(subscription, JSON.stringify(dto)); 

    } catch (error) {
      logger.error(`ERROR - publishService(publish) - ${JSON.stringify(error)}`)
      throw error;
    } finally {
      await redisClient.disconnect();
    }
  }
}

module.exports = PublishService;
