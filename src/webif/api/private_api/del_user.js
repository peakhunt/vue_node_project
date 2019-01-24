const { check, validationResult } = require('express-validator/check');
const user = require('../../../user');

function del_user(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  user.del_user(res.locals.uinfo.user.id,
    req.body.id,
    (err) => {
      if (err) {
        return res.status(406).json({ errors: [err] });
      }
      return res.json({ errors: [] });
    });
  return undefined;
}

module.exports = (router) => {
  router.post('/del_user', [
    check('id').isString()
  ], del_user);
};
