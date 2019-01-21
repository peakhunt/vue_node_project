import crypto from 'crypto'
import axios from 'axios'

const state = {
  loggedIn: false,
  loginToken: ''
}

const mutations = {
  SET_LOGGED_IN (state, token) {
    state.loggedIn = true
    state.loginToken = token
  },
  SET_LOGGED_OUT (state) {
    state.loggedIn = false
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
      context.commit('SET_LOGGED_IN', response.data.token)
      payload.cb()
    }, (err) => {
      payload.cb(err)
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
