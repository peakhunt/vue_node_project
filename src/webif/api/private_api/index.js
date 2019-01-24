const user = require('../../../user');
const hello = require('./hello');
const logout = require('./logout');
const change_password = require('./change_password');
const add_user = require('./add_user');
const del_user = require('./del_user');
const change_user = require('./change_user');
const get_all_users = require('./get_all_users');

function authorize(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }

  user.decode(req.headers.authorization, (err, uinfo) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid credentials sent!' });
    }

    if (user.authorize(uinfo.user.id, req.headers.authorization) === false) {
      return res.status(403).json({ error: 'Unauthorized!' });
    }

    res.locals.uinfo = uinfo;

    return next();
  });
  return undefined;
}

function private_api_init(router) {
  router.use(authorize);

  hello(router);
  logout(router);
  change_password(router);
  add_user(router);
  del_user(router);
  change_user(router);
  get_all_users(router);
}

module.exports = private_api_init;
