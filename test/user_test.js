import * as assert from 'assert';
const user = require('../src/user');

const loginTestSamples = [
  { id: 'admin', password: 'password', expectedResult: true, description: 'admin should be logged in' },
  { id: 'hkim', password: 'hkim', expectedResult: true, description: 'hkim should be logged in' },
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
  loginTestSamples.forEach((sample) => {
    it(sample.description, () => {
      assert.equal(user.login(sample.id, sample.password), sample.expectedResult);
    });
  });
});
