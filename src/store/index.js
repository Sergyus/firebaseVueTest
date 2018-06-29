import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'
import authentication from './authentication/authentication.module'
import books from './books/books.module'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  mutations: {
    ...firebaseMutations
  },
  modules: {
    authentication,
    books,
  },
  strict: debug
})

