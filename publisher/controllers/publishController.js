const express = require('express');
let router = express.Router();

const _service = require('../services/publishService');
const service = new _service();

router.post('/', async ( req, res) => {
  try {
    await service.publish('article', req.body);
    return res.send({
      message: 'published',
      status: 200
    })
  } catch (error) {
    res.status(400).send(error.message);
  }
})

module.exports = router

// https://www.codementor.io/@evanbechtol/node-service-oriented-architecture-12vjt9zs9i
