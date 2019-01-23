const config_json = require('../../config.json');

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

  // XXX FIXME update file
  user.password = new_sum;
  return process.nextTick(() => {
    cb(undefined);
  });
}

module.exports = {
  data: config_json,
  update_password
};
