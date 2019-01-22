const webif_init = require('./webif');

const { app, listener } = webif_init();

//
// for unit testing
//
module.exports = { server: app, listener };
