const webif_init = require('./webif');

const { app, server } = webif_init();

//
// for unit testing
//
module.exports = app;