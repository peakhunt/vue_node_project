const express = require('express');
const logger = require('../logger');

function webinf_init() {
  const app = express();
  const port = 8080;

  app.get('/', (req, res) => res.send('Hello World!'));
  app.listen(port, () => logger.info(`Example app listening on port ${port}!`));
}

module.exports = webinf_init;
