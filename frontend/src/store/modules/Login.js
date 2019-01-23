import crypto from 'crypto'
import axios from 'axios'

const state = {
  loggedIn: false,
  userID: '',
  loginToken: '',
  http403Error: false,
  admin: false
}

const mutations = {
  SET_LOGGED_IN (state, payload) {
    state.loggedIn = true
    state.loginToken = payload.token
    state.userID = payload.userID
    state.admin = payload.admin
    state.http403Error = false

    sessionStorage.setItem('credential', JSON.stringify(payload))
  },
  SET_LOGGED_OUT (state) {
    state.loggedIn = false
    state.loginToken = ''
    state.userID = ''
    state.http403Error = false
    state.admin = false
    sessionStorage.removeItem('credential')
  },
  SET_403_ERROR (state) {
    state.http403Error = true
  },
  CLEAR_403_ERROR (state) {
    state.http403Error = false
  },
  initializeLogin (state) {
    if (sessionStorage.getItem('credential')) {
      const cred = JSON.parse(sessionStorage.getItem('credential'))
      state.loggedIn = true
      state.loginToken = cred.token
      state.userID = cred.userID
      state.admin = cred.admin
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
      context.commit('SET_LOGGED_IN', {
        token: response.data.token,
        admin: response.data.admin,
        userID: payload.id
      })
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
      if (err.response.status === 403) {
        cb()
        context.commit('SET_LOGGED_OUT')
        return
      }
      cb(err)
    })
  },
  forceLogout (context) {
    context.commit('SET_LOGGED_OUT')
  },
  changePassword (context, payload) {
    const token = context.state.loginToken
    const oldSum = crypto.createHash('sha256').update(payload.oldPassword, 'utf8').digest('hex')
    const newSum = crypto.createHash('sha256').update(payload.newPassword, 'utf8').digest('hex')

    console.log(`oldSum: ${oldSum}`)

    axios.post('/api/private/change_password', { oldSum, newSum }, {
      headers: {
        Authorization: token
      }
    }).then((response) => {
      payload.cb()
    }, (err) => {
      payload.cb(err.response.data.errors[0])
    })
  }
}

const getters = {
  isLoggedIn (state) {
    return state.loggedIn
  },
  loginToken (state) {
    return state.loginToken
  },
  http403Error (state) {
    return state.http403Error
  },
  isAdmin (state) {
    return state.admin
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
