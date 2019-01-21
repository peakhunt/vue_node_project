function hello(req, res) {
  const response = {
    message: 'Hello, World from Private!',
    version: 0.1
  };

  res.json(response);
}

function hello_init(router) {
  router.get('/hello', hello);
}

module.exports = hello_init;
