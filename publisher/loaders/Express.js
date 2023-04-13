const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const express = require('express');
const config = require('../config')
const logger = require('../core/logger')
const routes = require('../routes')

class ExpressLoader {
  constructor() {
    const app = express();

    app.use(ExpressLoader.errorHandling);

    // Set up middleware
    app.use(morgan("dev"));
    app.use(compression());
    app.use(bodyParser.urlencoded({
      extended: false,
      limit: "20mb"
    }));
    app.use(bodyParser.json({ limit: "20mb" }));

    routes(app);

    this.server = app.listen(config.port, () => {
      logger.info(`Publisher service running, listening on port ${config.port}`)
    })
  }

  get Server() {
    return this.server;
  }

  // ADD LINTING AND PRETTIER AND TESTING

  static errorHandling(error, req, res, next) {
    let parsedError;

    try {
      if (error && typeof error === 'object') {
        parsedError = JSON.stringify(error);
      } else {
        parsedError = error;
      }
    } catch (e) {
      logger.error(e);
    }

    logger.error(parsedError);

    if (res.headersSent) {
      return next(error);
    }

    res.status(400).json({
      success: false,
      error
    })
  }
}

module.exports = ExpressLoader;
