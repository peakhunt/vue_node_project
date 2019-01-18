const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config');
const logger = require('../logger');

const logged_in_users = {
};

function get_login_info(id) {
  return logged_in_users[id];
}

function login_user(user) {
  logger.info(`${user.id} logged in`);

  const { data: { user_mgmt: { super_secret: secret } } } = config;
  const uinfo = {
    user,
    access_time: moment()
  };

  const token = jwt.sign(uinfo, secret);

  logged_in_users[user.id] = {
    uinfo,
    token
  };

  return token;
}

function login(id, password) {
  if (id === null || id === undefined || password === null || password === undefined) {
    return { status: false, token: undefined };
  }

  const { data: { user_mgmt: { users } } } = config;

  const csum = crypto.createHash('sha256').update(password, 'utf8').digest('hex');

  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];

    if (user.id === id && user.password === csum) {
      return {
        status: true,
        token: login_user(user)
      };
    }
  }
  logger.info(`${id} failed to login`);
  return { status: false, token: undefined };
}

function logout(id) {
  const linfo = logged_in_users[id];

  if (linfo === undefined) {
    logger.debug(`logging out ${id} is not logged in`);
    return;
  }

  logged_in_users[id] = undefined;
  logger.info(`${id} logged out`);
}

function authorize(id, token) {
  const linfo = logged_in_users[id];
  const now = moment();

  if (linfo === undefined) {
    logger.debug(`${id} not authorized`);
    return false;
  }

  if (linfo.token !== token) {
    logger.warn(`token mismatch for ${id}`);
    return false;
  }

  const { data: { user_mgmt: { timeout_in_secs: timeout } } } = config;
  const diff = now.diff(linfo.uinfo.access_time, 'seconds');

  if (diff > timeout) {
    logger.debug(`${id} timedout`);
    logout(id);
    return false;
  }

  linfo.uinfo.access_time = now;

  return true;
}

function decode(token, cb) {
  if (token === null || token === undefined) {
    process.nextTick(() => {
      cb('invalid argument');
    });
    return;
  }

  const { data: { user_mgmt: { super_secret: secret } } } = config;

  jwt.verify(token, secret, (err, decoded) => {
    cb(err, decoded);
  });
}

module.exports = {
  login,
  logout,
  authorize,
  decode,
  _private_for_test: {
    get_login_info
  }
};
