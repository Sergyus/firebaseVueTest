import FireBaseService from '../../firebase/service';
import {CREATE_BOOK, GET_BOOK, GET_BOOKS, UPDATE_BOOK, DELETE_BOOK} from './books.actions.type';
import {ADD_BOOK} from './books.mutations.type';

const state = {
  books: []
};

const getters = {
  testmes: state => state.books
};

const actions = {
  [GET_BOOKS](context) { //context.commit(ADD_BOOK, book);
    return new Promise((resolve, reject) => {
      FireBaseService.getBooks();
      console.log(FireBaseService.getBooks());
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
  },
  [DELETE_BOOK](context, data) {
    return new Promise((resolve, reject) => {
      FireBaseService.deleteBook(data.key)
        .then(() => {
          //store.commit(REMOVE_BOOK, key);
          resolve(true)
        })
        .catch(error => {
          reject(error)
        });
      FireBaseService.deleteFileStorage(data.filename)
        .then(() => {
          resolve(true)
        })
        .catch(error => {
          reject(error)
        });
    })
  },
};

const mutations = {
  [ADD_BOOK](state, book) {
    state.books.push(book)
  },
  // [REMOVE_BOOK](state, book) {
  //   state.books.push(book)
  // }
};

export default {
  state,
  actions,
  mutations,
  getters
}
