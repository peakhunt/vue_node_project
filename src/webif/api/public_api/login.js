function login(req, res) {
  const response = {
    message: 'Hello, World!',
    version: 0.1
  };

  res.json(response);
}

function login_init(router) {
  router.get('/login', login);
}

module.exports = login_init;
