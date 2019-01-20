const express = require('express');
const public_api = require('./public_api');

function api(app) {
  const public_router = express.Router();

  public_api(public_router);

  app.use('/api/public', public_router);
}

module.exports = api;
