function demo(req, res) {
}

function private_api_init(router) {
  router.get('/demo', demo);
}

module.exports = private_api_init;
