import {
  SIDENAVIGATION_OPEN,
  SIDENAVIGATION_CLOSE,
  LOGOUT_OPEN,
  LOGOUT_CLOSE
} from './navigation.mutations.type'

const state = {
  sideNavigation: false,
  logOutDialog: false
}

const mutations = {
  [SIDENAVIGATION_OPEN] (state) {
    state.sideNavigation = true
  },
  [SIDENAVIGATION_CLOSE] (state) {
    state.sideNavigation = false
  },
  [LOGOUT_OPEN] (state) {
    state.logOutDialog = true
  },
  [LOGOUT_CLOSE] (state) {
    state.logOutDialog = false
  }
}

export default {
  state,
  mutations
}
