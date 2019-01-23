const writeFileAtomic = require('write-file-atomic');
const logger = require('../logger');
const config = require('../config');

const config_json = config.data;

function update_config_json(cb) {
  logger.info(JSON.stringify(config_json));
  writeFileAtomic('config.json', JSON.stringify(config_json), {}, (err) => {
    if (err) {
      logger.error(`writeFilesAtomic error: ${err}`);
    } else {
      logger.info('writeFilesAtomic successful');
    }
    cb(err);
  });
}

function get_user_info(id) {
  const users = config_json.user_mgmt.users;

  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];

    if (user.id === id) {
      return user;
    }
  }
  return null;
}

function update_password(id, old_sum, new_sum, cb) {
  const user = get_user_info(id);

  if (user === null) {
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
    if (err) {
      cb('storage update error');
    }
    cb(undefined);
  });
}

module.exports = {
  data: config_json,
  update_password
};
