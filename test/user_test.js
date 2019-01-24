import * as assert from 'assert';
const moment = require('moment');
const crypto = require('crypto');
const user = require('../src/user');
const config = require('../src/config');
const config_update = require('../src/config_update');

const csum1 = crypto.createHash('sha256').update('password', 'utf8').digest('hex');
const csum2 = crypto.createHash('sha256').update('hkim', 'utf8').digest('hex');

const loginTestSamples = [
  { id: 'admin', password: csum1, expectedResult: true, description: 'admin should be logged in' },
  { id: 'hkim', password: csum2, expectedResult: true, description: 'hkim should be logged in' },
  { id: null, password: 'password', expectedResult: false, description: 'null id should be rejected' },
  { id: undefined, password: 'password', expectedResult: false, description: 'undefined should be rejected' },
  { id: 'admin', password: null, expectedResult: false, description: 'null password should be rejected' },
  { id: 'admin', password: undefined, expectedResult: false, description: 'undefined password should be rejected' },
  { id: null, password: null, expectedResult: false, description: 'null should be rejected' },
  { id: undefined, password: undefined, expectedResult: false, description: 'undefined should be rejected' },
  { id: 'admin', password: 'zolla', expectedResult: false, description: 'wrong password 1' },
  { id: 'hkim', password: 'hkim2', expectedResult: false, description: 'wrong password 2' },
  { id: 'user', password: 'user', expectedResult: false, description: 'unknown id' }
];

describe('user module', () => {
  describe('login', () => {
    loginTestSamples.forEach((sample) => {
      it(sample.description, () => {
        assert.equal(user.login(sample.id, sample.password).status, sample.expectedResult);
      });
    });
  });

  describe('authorize - token', () => {
    assert.equal(user.login('admin', csum1).status, true);

    var linfo = user._private_for_test.get_login_info('admin');

    assert.equal(user.authorize('admin', null), false);
    assert.equal(user.authorize('admin', undefined), false);
    assert.equal(user.authorize('admin', linfo.token), true);

  });

  describe('logout', () => {
    it('normal logout', () => {
      assert.equal(user.login('admin', csum1).status, true);

      var linfo = user._private_for_test.get_login_info('admin');
      assert.equal(linfo !== undefined, true);

      assert.equal(user.authorize('admin', linfo.token), true);

      user.logout('admin');

      linfo = user._private_for_test.get_login_info('admin');

      assert.equal(linfo, undefined);

      assert.equal(user.authorize('admin'), false);
    });

    it('logout when not logged in', () => {
      assert.equal(user.authorize('admin'), false);
      user.logout('admin');
      assert.equal(user.authorize('admin'), false);
    });

    it('login timeout', () => {
      assert.equal(user.login('admin', csum1).status, true);

      var linfo = user._private_for_test.get_login_info('admin');
      assert.equal(linfo !== undefined, true);

      assert.equal(user.authorize('admin', linfo.token), true);

      const { data: { user_mgmt: { timeout_in_secs: timeout } } } = config;

      const now = moment();
      linfo.uinfo.access_time.subtract(timeout + 10, 'seconds');

      assert.equal(user.authorize('admin', linfo.token), false);

      linfo = user._private_for_test.get_login_info('admin');
      assert.equal(linfo === undefined, true);
    });
  });

  it('decode test - normal', (done) => {
    assert.equal(user.login('admin', csum1).status, true);
    var linfo = user._private_for_test.get_login_info('admin');

    user.decode(linfo.token, (err, decoded) => {
      if(err) {
        done(err);
      } else {
        if(decoded.token === linfo.token && linfo.user.id === 'admin') {
          done();
        } else {
          done(err);
        }
      }
    });
  });

  it('decode test - fail1', (done) => {
    user.decode(null, (err, decoded) => {
      if(err) {
        done();
      } else {
        if(decoded.token === linfo.token) {
          done(err);
        } else {
          done(err);
        }
      }
    });
  });

  it('decode test - fail2', (done) => {
    user.decode(null, (err, decoded) => {
      if(err) {
        done();
      } else {
        if(decoded.token === linfo.token) {
          done(err);
        } else {
          done(err);
        }
      }
    });
  });

  it('update_password test', (done) => {
    const newSum = crypto.createHash('sha256').update('new_password', 'utf8').digest('hex');
    const oldSum = config.data.user_mgmt.users[0].password;

    user.change_password('admin', 'admin', oldSum, newSum, (err) => {
      assert.equal(err, undefined);
      assert.equal(config.data.user_mgmt.users[0].password, newSum);

      user.change_password('admin', 'admin', newSum, oldSum, (err) => {
        assert.equal(err, undefined);
        assert.equal(config.data.user_mgmt.users[0].password, oldSum);
        done();
      });
    });
  });

  it('update_password test - no capability', (done) => {
    const newSum = crypto.createHash('sha256').update('new_password', 'utf8').digest('hex');
    const oldSum = config.data.user_mgmt.users[0].password;

    user.change_password('hkim', 'admin', oldSum, newSum, (err) => {
      assert.equal(err, 'need admin capability to change other accounts\' password');

      // simulate login
      user.login('hkim', csum2)
      user.change_password('hkim', 'admin', oldSum, newSum, (err) => {
        assert.equal(err, 'need admin capability to change other accounts\' password');
        done();
      });
    });
  });

  it('add new user - no capability', (done) => {
    user.login('hkim', csum2);
    user.add_user('hkim', 'zolla', 'invalid csum', false, (err) => {
      assert.equal(err, 'need admin capability to add new user');
      user.del_user('hkim', 'admin', (err) => {
        assert.equal(err, 'need admin capability to delete user');
        done();
      });
    });
  });

  it('add new user - success', (done) => {
    user.login('admin', csum1);
    user.add_user('admin', 'zolla', csum2, false, (err) => {
      assert.equal(err, undefined);

      // already exists fail
      user.add_user('admin', 'zolla', csum2, false, (err) => {
        assert.equal(err, 'zolla already exists');

        // delete user
        user.del_user('admin', 'zolla', (err) => {
          assert.equal(err, undefined);
          done();
        });
      });
    });
  });

  it('del not existing user', (done) => {
    user.login('admin', csum1);
    user.del_user('admin', 'nonexisting', (err) => {
      assert.equal(err, 'nonexisting does not exist');
      done();
    });
  });

  it('change user - no capability', (done) => {
    user.change_user('hkim', 'admin', 'invalid sum', false, (err) => {
      assert.equal(err, 'need admin capability to change user');
      done();
    });
  });

  it('change user - success', (done) => {
    const uid = 'zolla2'
    user.login('admin', csum1);
    user.add_user('admin', uid, csum2, false, (err) => {
      assert.equal(err, undefined);

      var { user: ui } = config_update._private_for_test.get_user_info_from_storage(uid);

      console.log('====================');
      console.log(ui);
      console.log('====================');

      assert.notStrictEqual(ui, undefined);
      assert.equal(ui.id, uid);
      assert.equal(ui.password, csum2);
      assert.equal(ui.admin, false);

      user.change_user('admin', uid, csum1, true, (err) => {
        assert.equal(err, undefined);

        var { user: ui } = config_update._private_for_test.get_user_info_from_storage(uid);

        assert.notStrictEqual(ui, undefined);
        assert.equal(ui.id, uid);
        assert.equal(ui.password, csum1);
        assert.equal(ui.admin, true);

        user.del_user('admin', uid, (err) => {
          assert.equal(err, undefined);

          var { user: ui } = config_update._private_for_test.get_user_info_from_storage(uid);

          assert.equal(ui, undefined);

          // not existing user
          user.change_user('admin', uid, csum1, true, (err) => {
            assert.equal(err, `${uid} does not exist`);
            done();
          });
        });
      });
    });
  });

  it('get all users', () => {
    const users = user.get_all_users();

    assert.notStrictEqual(users, undefined);
    assert.equal(users.length, 2);
  });
});
