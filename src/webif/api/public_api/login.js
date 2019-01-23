const { check, validationResult } = require('express-validator/check');
const user = require('../../../user');

function login(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const result = user.login(req.body.username, req.body.csum);

  if (result.status === false) {
    // login failed
    return res.status(401).json({ errors: ['login failed'] });
  }

  // login ok
  return res.json({
    token: result.token,
    admin: result.admin
  });
}

module.exports = (router) => {
  router.post('/login', [
    check('username').isString(),
    check('csum').isString()
  ], login);
};
