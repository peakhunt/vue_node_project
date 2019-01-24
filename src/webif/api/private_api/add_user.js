const { check, validationResult } = require('express-validator/check');
const user = require('../../../user');

function add_user(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  user.add_user(res.locals.uinfo.user.id,
    req.body.id,
    req.body.password,
    req.body.admin,
    (err) => {
      if (err) {
        return res.status(406).json({ errors: [err] });
      }
      return res.json({ errors: [] });
    });
  return undefined;
}

module.exports = (router) => {
  router.post('/add_user', [
    check('id').isString(),
    check('password').isString(),
    check('admin').isBoolean()
  ], add_user);
};
