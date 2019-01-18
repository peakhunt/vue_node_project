import * as assert from 'assert';
const config = require('../src/config');

describe('config module', () => {
  it('load test - should not be null nor undefined', () => {
    assert.notStrictEqual(config, undefined);
    assert.notStrictEqual(config, null);

    assert.notStrictEqual(config.data, undefined);
    assert.notStrictEqual(config.data, null);
  });
});
