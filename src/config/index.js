const writeFileAtomic = require('write-file-atomic');
const config_json = require('../../config.json');

module.exports = {
  data: config_json,
};
