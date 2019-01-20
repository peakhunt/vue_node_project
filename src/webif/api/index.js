const express = require('express');
const public_api = require('./public_api');
const private_api = require('./private_api');

function api(app) {
  const public_router = express.Router();
  const private_router = express.Router();

  public_api(public_router);
  private_api(private_router);

  app.use('/api/public', public_router);
  app.use('/api/private', private_router);
}

module.exports = api;
