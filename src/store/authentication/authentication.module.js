import {auth} from '../../firebase/firebase';
import FBS from '../../firebase/service';
import {CHECK_AUTH, LOGOUT} from './authentication.actions.type';
import {PURGE_AUTH, SET_AUTH} from './authentication.mutations.type';

const state = {
  user: {},
  isLoggedIn: false
};

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user
};

const actions = {
  [CHECK_AUTH](context) {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        context.commit(SET_AUTH, user)
      } else {
        context.commit(PURGE_AUTH)
      }
    });
  },
  [LOGOUT](context) {
    FBS.logout()
      .then(function () {
        //window.location.reload()
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
