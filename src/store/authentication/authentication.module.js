import {auth, db} from '../../firebase/firebase';
import {CHECK_AUTH, LOGIN, LOGOUT} from './authentication.actions.type';
import {PURGE_AUTH, SET_AUTH} from './authentication.mutations.type';

const state = {
  user: {},
  isLoggedIn: false
};

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
};

const actions = {
  async [CHECK_AUTH](context) {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        context.commit(SET_AUTH, user)
      } else {
        context.commit(PURGE_AUTH)
      }
    });
  },
  [LOGIN](context, credentials) {
    return new Promise((resolve, reject) => {
      db.login(credentials)
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
  [LOGOUT](context) {
    db.logout()
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
    state.isLoggedIn = true;
    state.user.name = user.displayName;
    state.user.email = user.email;
    state.user.uid = user.uid;
  },
  [PURGE_AUTH](state) {
    state.isLoggedIn = false;
    state.user = {};
  }
};

export default {
  state,
  actions,
  mutations,
  getters
}
