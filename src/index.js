const webif_init = require('./webif');

const { app } = webif_init();

//
// for unit testing
//
module.exports = app;
