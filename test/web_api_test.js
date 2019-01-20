process.env.NODE_ENV = 'test';

import * as assert from 'assert';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src');

const should = chai.should();

chai.use(chaiHttp);

// parent block
describe('web api test', () => {
  beforeEach((done) => {
    // before each test we do something
    // nothing to do for now
    done();
  });

  describe('GET /api/public/hello', () => {
    it('it should return a predefined message', (done) => {
      chai.request(server)
          .get('/api/public/hello')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body.should.have.property('message');
            res.body.message.should.equal('Hello, World!');
            res.body.should.have.property('version');
            res.body.version.should.equal(0.1);
            done();
          });
    });
  });
});