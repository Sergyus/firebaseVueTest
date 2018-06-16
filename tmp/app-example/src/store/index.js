import Vue from 'vue'
import Vuex from 'vuex'

import authentication from './authentication/authentication.module'
import notification from './notifications/notifications.module'
import navigation from './navigation/navigation.module'
import books from './books/books.module'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    authentication,
    notification,
    navigation,
    books
  },
  strict: debug
})
