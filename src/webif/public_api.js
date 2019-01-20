function public_api_hello(req, res) {
  const response = {
    message: 'Hello, World!',
    version: 0.1
  };

  res.json(response);
}

function public_api_init(router) {
  router.get('/hello', public_api_hello);
}

module.exports = public_api_init;
