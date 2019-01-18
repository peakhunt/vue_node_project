const express = require('express');
const logger = require('../logger');
const config = require('../config');

function webintf_init() {
  logger.debug('webintf_init');
  logger.debug(config);

  const app = express();
  const { data: { web: { port } } } = config;

  app.get('/', (req, res) => res.send('Hello World!'));
  app.listen(port, () => logger.info(`Example app listening on port ${port}!`));
}

module.exports = webintf_init;
