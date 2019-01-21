//
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
//
process.env.NODE_ENV = 'test';

import * as assert from 'assert';
import { RSA_NO_PADDING } from 'constants';
const chai = require('chai');
const chaiHttp = require('chai-http');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const server = require('../src');
const config = require('../src/config');

const should = chai.should();

chai.use(chaiHttp);

const csum1 = crypto.createHash('sha256').update('password', 'utf8').digest('hex');

// parent block
describe('public api test', () => {
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
            res.body.should.be.a('object')
            res.body.should.have.property('token');
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

describe('private api test', () => {
  beforeEach((done) => {
    // before each test we do something
    // nothing to do for now
    done();
  });

  describe('GET /api/private', () => {
    it('no authorization header', (done) => {
      chai.request(server)
          .get('/api/private/non_existing')
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object')
            res.body.should.have.property('error');
            res.body.error.should.equal('No credentials sent!');
            done();
          });
    });

    it('invalid authorization header', (done) => {
      chai.request(server)
          .get('/api/private/non_existing')
          .set('Authorization', 'Hello World')
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object')
            res.body.should.have.property('error');
            res.body.error.should.equal('Invalid credentials sent!');
            done();
          });
    });

    // a valid JWT token but broken object
    it('valid JWT token but broken object', (done) => {
      const user = {
        id_invalid: 'admin',
        password_invalid: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        admin_invalid: false
      };

      const uinfo = {
        user,
        access_time: moment()
      };
      
      const secret = config.data.user_mgmt.super_secret;

      const token = jwt.sign(uinfo, secret);
      chai.request(server)
          .get('/api/private/hello')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object')
            res.body.should.have.property('error');
            res.body.error.should.equal('Unauthorized!');
            done();
          });
    });

    it('valid JWT token, valid object but not existing user', (done) => {
      const user = {
        id: 'admin1',
        password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        admin: true
      };

      const uinfo = {
        user,
        access_time: moment()
      };
      
      const secret = config.data.user_mgmt.super_secret;

      const token = jwt.sign(uinfo, secret);
      chai.request(server)
          .get('/api/private/hello')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object')
            res.body.should.have.property('error');
            res.body.error.should.equal('Unauthorized!');
            done();
          });
    });

    it('authorization success', (done) => {
      const user = {
        username: 'admin',
        csum: config.data.user_mgmt.users[0].password
      };

      chai.request(server)
          .post('/api/public/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body.should.have.property('token');

            const token = res.body.token;

            chai.request(server)
                .get('/api/private/hello')
                .set('Authorization', token)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object')
                  res.body.should.have.property('message');
                  res.body.should.have.property('version');
                  res.body.message.should.equal('Hello, World from Private!');
                  res.body.version.should.equal(0.1);
                  done();
                });
          })
    });
  });
});