import FireBaseService from '@/services/firebase.service';

import {ASSES_BASE_URL} from '@/config/config';

import {CHECK_AUTH, LOGIN, LOGOUT, REGISTER} from './authentication.actions.type';
import {PURGE_AUTH, SET_AUTH} from './authentication.mutations.type';

const state = {
  user: {},
  isAuthenticated: false
};

const actions = {
  [CHECK_AUTH](context) {
    const user = FireBaseService.checkAuth();
    if (user) {
      context.commit(SET_AUTH, user)
    } else {
      context.commit(PURGE_AUTH)
    }
  },
  [LOGIN](context, credentials) {
    return new Promise((resolve, reject) => {
      FireBaseService.login(credentials)
        .then(user => {
          let userData = {
            email: user.email,
            uid: user.uid
          };
          context.commit(SET_AUTH, userData);
          resolve(user)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      FireBaseService.register(credentials)
        .then(user => {
          resolve(user)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  [LOGOUT](context) {
    FireBaseService.logout()
      .then(function () {
        window.location.reload()
      })
      .catch(error => {
        return error
      })
  }
};

const mutations = {
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user.name = user.displayName;

    if (!user.photoURL) {
      state.user.photoUrl = ASSES_BASE_URL + '/img/avatar2-200.jpg';
    } else {
      state.user.photoUrl = user.photoURL;
    }

    state.user.email = user.email;
    state.user.emailVerified = user.emailVerified;
    state.user.uid = user.uid;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
  }
};

export default {
  state,
  actions,
  mutations
}
