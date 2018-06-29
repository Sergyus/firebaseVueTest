import {ADD_BOOK,DEL_BOOK} from "./books.mutations.type";
import { firebaseMutations } from 'vuexfire'

export const mutations = {

  [ADD_BOOK](state, book) {
    state.books.push(book)
  },

  [DEL_BOOK](state, id) {
    state.items = state.items.filter(item => {
      return item.id !== id
    })
  },

  deleteTodo(state, id) {
    const index = state.todos.findIndex(item => item.id == id)
    state.todos.splice(index, 1)
  },

};


// Todo: create DEL mutation
