const user = require('../../../user');

function logout(req, res) {
  user.logout(res.locals.uinfo.user.id);
  res.status(200).send('');
}

module.exports = (router) => {
  router.post('/logout', [
  ], logout);
};
