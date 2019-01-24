const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config');
const config_update = require('../config_update');
const logger = require('../logger');

const logged_in_users = {
};

function get_user_from_storage(id) {
  const users = config.data.user_mgmt.users;

  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];

    if (user.id === id) {
      return user;
    }
  }
  return undefined;
}

function get_login_info(id) {
  return logged_in_users[id];
}

function admin_cap_check(id) {
  const linfo = get_login_info(id);

  if (linfo === undefined || !linfo.uinfo.user.admin) {
    return false;
  }
  return true;
}

function login_user(user) {
  logger.info(`${user.id} logged in`);

  const secret = config.data.user_mgmt.super_secret;
  const uinfo = {
    user: {
      id: user.id,
      admin: user.admin
    },
    access_time: moment()
  };

  const token = jwt.sign(uinfo, secret);

  logged_in_users[user.id] = {
    uinfo,
    token
  };

  return token;
}

function login(id, csum) {
  if (id === null || id === undefined || csum === null || csum === undefined) {
    return { status: false, token: undefined, admin: false };
  }

  const user = get_user_from_storage(id);

  if (user === undefined || user.password !== csum) {
    logger.info(`${id} failed to login`);
    return { status: false, token: undefined, admin: false };
  }

  return {
    status: true,
    token: login_user(user),
    admin: user.admin
  };
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

  const timeout = config.data.user_mgmt.timeout_in_secs;
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

  const secret = config.data.user_mgmt.super_secret;

  jwt.verify(token, secret, (err, decoded) => {
    cb(err, decoded);
  });
}

function change_password(from_id, id, old_sum, new_sum, cb) {
  if (from_id !== id) {
    if (admin_cap_check(from_id) === false) {
      process.nextTick(() => {
        cb('need admin capability to change other accounts\' password');
      });
      return;
    }
  }

  config_update.update_password(id, old_sum, new_sum, cb);
}

function add_user(from_id, id, csum, isAdmin, cb) {
  if (admin_cap_check(from_id) === false) {
    process.nextTick(() => {
      cb('need admin capability to add new user');
    });
    return;
  }

  config_update.add_user(id, csum, isAdmin, cb);
}

function del_user(from_id, id, cb) {
  if (admin_cap_check(from_id) === false) {
    process.nextTick(() => {
      cb('need admin capability to delete user');
    });
    return;
  }

  logout(id);
  config_update.del_user(id, cb);
}

function change_user(from_id, id, csum, isAdmin, cb) {
  if (admin_cap_check(from_id) === false) {
    process.nextTick(() => {
      cb('need admin capability to change user');
    });
    return;
  }

  config_update.change_user(id, csum, isAdmin, cb);
}

function get_all_users() {
  const users = config.data.user_mgmt.users;
  const ret = [];

  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];

    ret.push({ id: user.id, admin: user.admin });
  }
  return ret;
}


module.exports = {
  login,
  logout,
  authorize,
  decode,
  change_password,
  add_user,
  del_user,
  change_user,
  get_all_users,
  _private_for_test: {
    get_login_info
  }
};
