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

function commonPrivatePost (context, url, objToSend, callback, errback) {
  const token = context.state.loginToken

  axios.post(url, objToSend, {
    headers: {
      Authorization: token
    }
  }).then((response) => {
    callback(response)
  }, (err) => {
    if (err.response.status === 403) {
      context.commit('SET_LOGGED_OUT')
      callback(err.response)
      return
    }
    errback(err)
  })
}

function commonPrivateGet (context, url, callback, errback) {
  const token = context.state.loginToken

  axios.get(url, {
    headers: {
      Authorization: token
    }
  }).then((response) => {
    callback(response)
  }, (err) => {
    if (err.response.status === 403) {
      context.commit('SET_LOGGED_OUT')
      errback(err)
      return
    }
    errback(err)
  })
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
    commonPrivatePost(context, '/api/private/logout', {},
      (response) => {
        console.log('###### logout success ######')
        context.commit('SET_LOGGED_OUT')
        cb()
      }, (err) => {
        console.log('###### logout failed ######')
        cb(err)
      }
    )
  },
  forceLogout (context) {
    context.commit('SET_LOGGED_OUT')
  },
  changePassword (context, payload) {
    const oldSum = crypto.createHash('sha256').update(payload.oldPassword, 'utf8').digest('hex')
    const newSum = crypto.createHash('sha256').update(payload.newPassword, 'utf8').digest('hex')

    console.log(`oldSum: ${oldSum}`)

    commonPrivatePost(context, '/api/private/change_password',
      { id: payload.id, oldSum, newSum },
      (response) => {
        payload.cb()
      }, (err) => {
        payload.cb(err.response.data.errors[0])
      }
    )
  },
  getAllUsers (context, cb) {
    commonPrivateGet(context, '/api/private/get_all_users',
      (response) => {
        cb(undefined, response.data)
      }, (err) => {
        cb(err)
      })
  },
  addNewUser (context, payload) {
    const csum = crypto.createHash('sha256').update(payload.password, 'utf8').digest('hex')

    commonPrivatePost(context, '/api/private/add_user',
      { id: payload.id, password: csum, admin: payload.admin },
      (resposne) => {
        payload.cb()
      }, (err) => {
        payload.cb(err)
      })
  },
  updateUser (context, payload) {
    const csum = crypto.createHash('sha256').update(payload.password, 'utf8').digest('hex')

    commonPrivatePost(context, '/api/private/change_user',
      { id: payload.id, password: csum, admin: payload.admin },
      (resposne) => {
        payload.cb()
      }, (err) => {
        payload.cb(err)
      })
  },
  delUser (context, payload) {
    commonPrivatePost(context, '/api/private/del_user',
      { id: payload.id },
      (resposne) => {
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
  },
  http403Error (state) {
    return state.http403Error
  },
  isAdmin (state) {
    return state.admin
  },
  userID (state) {
    return state.userID
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
