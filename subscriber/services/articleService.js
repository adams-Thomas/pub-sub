const logger = require('../core/logger');
const redisClient = require('../core/redis')

let client;

class ArticleService {
  
  constructor() {
    client = redisClient.duplicate();
    logger.info('Article Service');
  }

  async subscribe() {
    try {
      // const tempClient = await redisClient.duplicate();
      await client.connect();

      await client.subscribe('article', (message) => {
        console.log(message);
      });
    } catch (error) {
      console.log(error);
      logger.error(`ERROR - articleService(subscribe) - ${error.message}`);
      throw error;
    } finally {
      // await client.disconnect();
    }
  }

  async unsubscribe() {
    try {
      // const tempClient = await redisClient.duplicate();
      // await client.connect();

      await client.unsubscribe('article');
    } catch (error) {
      logger.error(`ERROR - articleService(unsubscribe) - ${error.message}`);
      throw error;
    } finally {
      await client.disconnect();
    }
  }
}

module.exports = ArticleService;
