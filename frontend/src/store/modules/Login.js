import crypto from 'crypto'
import axios from 'axios'

const state = {
  loggedIn: false,
  userID: '',
  loginToken: ''
}

const mutations = {
  SET_LOGGED_IN (state, payload) {
    state.loggedIn = true
    state.loginToken = payload.token
    state.userID = payload.userID
  },
  SET_LOGGED_OUT (state) {
    state.loggedIn = false
    state.loginToken = ''
    state.userID = ''
  }
}

const actions = {
  login (context, payload) {
    const csum = crypto.createHash('sha256').update(payload.password, 'utf8').digest('hex')
    const userInfo = {
      username: payload.id,
      csum: csum
    }
    axios.post('/api/public/login', userInfo).then((response) => {
      context.commit('SET_LOGGED_IN', { token: response.data.token, userID: payload.id })
      payload.cb()
    }, (err) => {
      setTimeout(() => payload.cb(err), 1000)
    })
  },
  logout (context, cb) {
    const token = context.state.loginToken

    axios.post('/api/private/logout', {}, {
      headers: {
        Authorization: token
      }
    }).then((response) => {
      cb()
      context.commit('SET_LOGGED_OUT')
    }, (err) => {
      cb(err)
    })
  }
}

const getters = {
  isLoggedIn (state) {
    return state.loggedIn
  },
  loginToken (state) {
    return state.loginToken
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
