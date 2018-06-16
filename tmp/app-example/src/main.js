import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import firebase from 'firebase'
import './firebase/firebase.init'

import { CHECK_AUTH } from '@/store/authentication/authentication.actions.type'

Vue.config.productionTip = false

let app

// Ensure we checked authentication before each page load.
router.beforeEach((to, from, next) => {
  store.dispatch(CHECK_AUTH)
  const guestRequired = to.matched.some((route) => route.meta.guest)
  const authRequired = to.matched.some((route) => route.meta.auth)
  const authenticated = store.state.authentication.isAuthenticated

  if (authRequired) {
    if (!authenticated) {
      next('/login')
    } else {
      next()
    }
  } else if (guestRequired) {
    if (authenticated) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      firebase,
      components: { App },
      template: '<App/>'
    })
  }
})
