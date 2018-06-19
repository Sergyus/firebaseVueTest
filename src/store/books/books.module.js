import FireBaseService from '../../firebase/service';
import {CREATE_BOOK, GET_BOOK, GET_BOOKS, UPDATE_BOOK} from './books.actions.type';
import {ADD_BOOK} from './books.mutations.type';

const state = {
  books: []
};

const actions = {
  [GET_BOOKS](context) {
    return new Promise((resolve, reject) => {
      FireBaseService.getBooks()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const book = {
              'id': doc.id,
              'slug': doc.data().slug,
              'title': doc.data().title
            };
            context.commit(ADD_BOOK, book);
            resolve(true)
          })
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  [GET_BOOK](context, bookSlug) {
    return new Promise((resolve, reject) => {
      FireBaseService.getBook(bookSlug)
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const book = {
              'id': doc.id,
              'slug': doc.data().slug,
              'title': doc.data().title,
              'author': doc.data().author
            };
            resolve(book)
          })
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  [CREATE_BOOK](context, bookData) {
    return new Promise((resolve, reject) => {
      FireBaseService.createBooks(bookData)
        .then(function () {
          resolve(true)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  [UPDATE_BOOK](context, bookData) {
    return new Promise((resolve, reject) => {
      FireBaseService.getBook(bookData.currentBookSlug)
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update(bookData.updatedBookData)
              .then(function () {
                resolve(true)
              })
              .catch(error => {
                reject(error)
              })
          })
        })
    })
  }
};

const mutations = {
  [ADD_BOOK](state, book) {
    state.books.push(book)
  }
};

export default {
  state,
  actions,
  mutations
}
