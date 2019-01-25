var timer

const state = {
  date: '',
  time: ''
}

const mutations = {
  updateDateAndTime (state) {
    var date = new Date()
    var current = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    var isoStr

    isoStr = current.toISOString()

    state.date = isoStr.substr(0, 10)
    state.time = isoStr.substr(11, 8)
  }
}

const actions = {
  initializeTime (context) {
    context.commit('updateDateAndTime')

    timer = setInterval(() => {
      context.commit('updateDateAndTime')
    }, 1000)
  },
  deinitializeTime (context) {
    clearInterval(timer)
  }
}

const getters = {
  currentDate (state) {
    return state.date
  },
  currentTime (state) {
    return state.time
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
