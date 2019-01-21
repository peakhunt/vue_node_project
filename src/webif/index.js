const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const logger = require('../logger');
const config = require('../config');

const api = require('./api');

function webintf_init() {
  logger.debug('webintf_init');
  logger.debug(config);

  const app = express();

  var port;

  port = config.data.web.port;

  if(process.env.NODE_ENV === 'dev') {
    port = config.data.web.devPort;
  }


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: 'application/json' }));
  app.use(expressValidator());

  api(app);

  const server = app.listen(port, () => logger.info(`Example app listening on port ${port}!`));

  return { app, server };
}

module.exports = webintf_init;
