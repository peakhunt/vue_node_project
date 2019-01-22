const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const logger = require('../logger');
const config = require('../config');

const api = require('./api');

function webintf_init() {
  let port;

  logger.debug('webintf_init');
  logger.debug(config);

  const app = express();

  app.use(express.static('public'));

  port = config.data.web.port;

  logger.error(`NODE_ENV = ${process.env.NODE_ENV}`);

  /* istanbul ignore if  */
  /* istanbul ignore else */
  if (process.env.NODE_ENV === 'dev') {
    /* istanbul ignore next: not easy to test this part. no need to either */
    logger.warn(`running in dev mode using port ${config.data.web.devPort}`);
    /* istanbul ignore next: not easy to test this part. no need to either */
    port = config.data.web.devPort;
  }


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: 'application/json' }));
  app.use(expressValidator());

  api(app);

  const listener = app.listen(port, () => logger.info(`Example app listening on port ${port}!`));

  return { app, listener };
}

module.exports = webintf_init;
