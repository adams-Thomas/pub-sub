const express = require('express');
let router = express.Router();

const ArticleService = require('../services/articleService');
const service = new ArticleService();

router.post('/subscribe', async ( req, res) => {
  try {
    await service.subscribe();
    return res.send({
      message: 'Subscribed',
      status: 200
    })
  } catch (error) {
    res.status(400).send(error.message);
  }
})

router.post('/unsubscribe', async ( req, res) => {
  try {
    await service.unsubscribe();
    return res.send({
      message: 'Unsubscribed',
      status: 200
    })
  } catch (error) {
    res.status(400).send(error.message);
  }
})

module.exports = router
