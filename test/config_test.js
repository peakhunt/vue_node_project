import * as assert from 'assert';
const crypto = require('crypto');
const config = require('../src/config');
const config_update = require('../src/config_update');

describe('config module', () => {
  it('load test - should not be null nor undefined', () => {
    assert.notStrictEqual(config, undefined);
    assert.notStrictEqual(config, null);

    assert.notStrictEqual(config.data, undefined);
    assert.notStrictEqual(config.data, null);
  });

  it('update password - unknown id', (done) => {
    const errMsg = `cannot find user info for zolla`

    config_update.update_password('zolla', null, null, (err) => {
      assert.equal(err, errMsg);
      done();
    });
  });

  it('update password - sum does not match', (done) => {
    const errMsg = `old password doesn't match`;

    config_update.update_password('admin', 'invalid sum', null, (err) => {
      assert.equal(err, errMsg);
      done();
    });
  });

  it('update password - success', (done) => {
    const newSum = crypto.createHash('sha256').update('new_password', 'utf8').digest('hex');
    const oldSum = config.data.user_mgmt.users[0].password;

    config_update.update_password('admin', oldSum, newSum, (err) => {
      assert.equal(err, undefined);
      assert.equal(config.data.user_mgmt.users[0].password, newSum);

      config_update.update_password('admin', newSum, oldSum, (err) => {
        assert.equal(err, undefined);
        assert.equal(config.data.user_mgmt.users[0].password, oldSum);
        done();
      });
    });
  });
});
