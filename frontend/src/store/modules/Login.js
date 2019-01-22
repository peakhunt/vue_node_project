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

    sessionStorage.setItem('credential', JSON.stringify(payload))
  },
  SET_LOGGED_OUT (state) {
    state.loggedIn = false
    state.loginToken = ''
    state.userID = ''
    sessionStorage.removeItem('credential')
  },
  initializeLogin (state) {
    if (sessionStorage.getItem('credential')) {
      const cred = JSON.parse(sessionStorage.getItem('credential'))
      state.loggedIn = true
      state.loginToken = cred.token
      state.userID = cred.userID
    }
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
      payload.cb(err)
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
