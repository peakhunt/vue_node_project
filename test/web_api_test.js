//
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
//
process.env.NODE_ENV = 'test';

import * as assert from 'assert';
import { RSA_NO_PADDING } from 'constants';
const chai = require('chai');
const chaiHttp = require('chai-http');
const crypto = require('crypto');
const server = require('../src');

const should = chai.should();

chai.use(chaiHttp);

const csum1 = crypto.createHash('sha256').update('password', 'utf8').digest('hex');

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

  describe('POST /api/public/login', () => {
    it('login success', (done) => {
      const user = {
        username: 'admin',
        csum: csum1
      };

      chai.request(server)
          .post('/api/public/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          })
    });

    it('parameter error - username', (done) => {
      const user = {
        username1: 'admin',
        csum: csum1
      };

      chai.request(server)
          .post('/api/public/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(422);
            res.body.errors.length.should.equal(1);
            done();
          });
    });

    it('parameter error - csum', (done) => {
      const user = {
        username: 'admin'
      };

      chai.request(server)
          .post('/api/public/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(422);
            res.body.errors.length.should.equal(1);
            done();
          });
    });

    it('parameter error - empty', (done) => {
      chai.request(server)
          .post('/api/public/login')
          .send('')
          .end((err, res) => {
            res.should.have.status(422);
            res.body.errors.length.should.equal(2);
            done();
          })
    });

    it('login fail ', (done) => {
      const user = {
        username: 'admin',
        csum: 'an invalid csum'
      };

      chai.request(server)
          .post('/api/public/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.errors.length.should.equal(1);
            done();
          })
    });

  });
});