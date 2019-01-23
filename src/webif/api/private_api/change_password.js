const { check, validationResult } = require('express-validator/check');
const user = require('../../../user');

function change_password(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  user.change_password(res.locals.uinfo.user.id,
    req.body.id,
    req.body.oldSum,
    req.body.newSum,
    (err) => {
      if (err) {
        return res.status(406).json({ errors: [err] });
      }
      return res.json({ errors: [] });
    });
  return undefined;
}

module.exports = (router) => {
  router.post('/change_password', [
    check('oldSum').isString(),
    check('newSum').isString()
  ], change_password);
};
