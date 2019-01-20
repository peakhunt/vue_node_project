const hello = require('./hello');
const login = require('./login');

function public_api_init(router) {
  hello(router);
  login(router);
}

module.exports = public_api_init;
