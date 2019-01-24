const user = require('../../../user');

function get_all_users(req, res) {
  const users = user.get_all_users();

  res.json({ users });
}

module.exports = (router) => {
  router.get('/get_all_users', [
  ], get_all_users);
};
