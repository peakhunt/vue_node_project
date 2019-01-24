const writeFileAtomic = require('write-file-atomic');
const logger = require('../logger');
const config = require('../config');

const config_json = config.data;

function update_config_json(cb) {
  logger.info(JSON.stringify(config_json));
  writeFileAtomic('config.json', JSON.stringify(config_json), {}, (err) => {
    /* istanbul ignore next */
    const msg = err ? `error ${err}` : 'successful';

    logger.info(`writeFilesAtomic: ${msg}`);
    cb(err);
  });
}

function get_user_info_from_storage(id) {
  const users = config_json.user_mgmt.users;

  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];

    if (user.id === id) {
      return { user, ndx: i };
    }
  }
  return { user: undefined, ndx: undefined };
}

function update_password(id, old_sum, new_sum, cb) {
  const { user } = get_user_info_from_storage(id);

  if (user === undefined) {
    return process.nextTick(() => {
      cb(`cannot find user info for ${id}`);
    });
  }

  if (user.password !== old_sum) {
    return process.nextTick(() => {
      cb('old password doesn\'t match');
    });
  }

  logger.info(`old password sum: ${user.password}`);
  logger.info(`new password sum: ${new_sum}`);

  user.password = new_sum;
  return update_config_json((err) => {
    /* istanbul ignore next */
    cb(err ? 'storage update error' : undefined);
  });
}

function add_user(id, csum, isAdmin, cb) {
  const { user } = get_user_info_from_storage(id);

  if (user !== undefined) {
    return process.nextTick(() => {
      cb(`${id} already exists`);
    });
  }

  const u = {
    id,
    password: csum,
    admin: isAdmin
  };

  const users = config_json.user_mgmt.users;

  users.push(u);

  return update_config_json((err) => {
    /* istanbul ignore next */
    cb(err ? 'storage update error' : undefined);
  });
}

function del_user(id, cb) {
  const { user, ndx } = get_user_info_from_storage(id);

  if (user === undefined) {
    return process.nextTick(() => {
      cb(`${id} does not exist`);
    });
  }

  const users = config_json.user_mgmt.users;

  users.splice(ndx, 1);

  return update_config_json((err) => {
    /* istanbul ignore next */
    cb(err ? 'storage update error' : undefined);
  });
}

function change_user(id, csum, isAdmin, cb) {
  const { user } = get_user_info_from_storage(id);

  if (user === undefined) {
    return process.nextTick(() => {
      cb(`${id} does not exist`);
    });
  }

  user.password = csum;
  user.admin = isAdmin;

  return update_config_json((err) => {
    /* istanbul ignore next */
    cb(err ? 'storage update error' : undefined);
  });
}

module.exports = {
  data: config_json,
  update_password,
  add_user,
  del_user,
  change_user,
  _private_for_test: {
    get_user_info_from_storage
  }
};
