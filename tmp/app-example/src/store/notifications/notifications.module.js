import {
  NOTIFY_INFO_ON,
  NOTIFY_INFO_OFF,
  NOTIFY_ERROR_ON,
  NOTIFY_ERROR_OFF,
  NOTIFY_SUCCESS_ON,
  NOTIFY_SUCCESS_OFF,
  NOTIFY_ALL_OFF } from './notifications.mutations.type'

const state = {
  info: false,
  error: false,
  success: false
}

const mutations = {
  [NOTIFY_INFO_ON] (state, msg) {
    state.info = msg
    state.error = false
    state.success = false
  },
  [NOTIFY_INFO_OFF] (state) {
    state.info = false
  },
  [NOTIFY_ERROR_ON] (state, msg) {
    state.error = msg
    state.info = false
    state.success = false
  },
  [NOTIFY_ERROR_OFF] (state) {
    state.error = false
  },
  [NOTIFY_SUCCESS_ON] (state, msg) {
    state.success = msg
    state.info = false
    state.error = false
  },
  [NOTIFY_SUCCESS_OFF] (state) {
    state.success = false
  },
  [NOTIFY_ALL_OFF] (state) {
    state.success = false
    state.info = false
    state.error = false
  }
}

const getters = {
  info (state) {
    return state.info
  },
  error (state) {
    return state.error
  },
  success (state) {
    return state.success
  }
}
export default {
  state,
  mutations,
  getters
}
