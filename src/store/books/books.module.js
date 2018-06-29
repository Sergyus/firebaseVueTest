import {mutations} from './mutations'
import {actions} from './actions'

const state = {
  books: []
};

const getters = {
  getAllBooks: state => state.books
};

export default {
  state,
  actions,
  mutations,
  getters
}


//https://stackoverflow.com/questions/49192961/vuex-mapstate-object-undefined-and-vuex-unknown-mutation-type
