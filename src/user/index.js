const crypto = require('crypto');
const config = require('../config');
const logger = require('../logger');

function login(id, password) {
  if (id == null || id == undefined || password == null | password == undefined) {
    return false;
  }

  const { data: { user: users } } = config;
  const csum = crypto.createHash('sha256').update(password, 'utf8').digest('hex');


  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];

    if (user.id === id && user.password === csum) {
      logger.info(`${user.id} logged in`);
      return true;
    }
  }
  logger.info(`${id} failed to login`);
  return false;
}

module.exports = {
  login
};
