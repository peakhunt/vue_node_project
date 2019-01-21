const user = require('../../../user');
const hello = require('./hello');
const logout = require('./logout');

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
}

module.exports = private_api_init;
