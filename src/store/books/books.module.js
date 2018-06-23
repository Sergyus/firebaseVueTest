import FireBaseService from '../../firebase/service';
import {CREATE_BOOK, GET_BOOK, GET_BOOKS, UPDATE_BOOK, DELETE_BOOK} from './books.actions.type';
import {ADD_BOOK} from './books.mutations.type';
import {booksRef} from "../../firebase/firebase";
import Vue from 'vue';


const state = {
  books: []
};

const getters = {
  getAllBooks: state => state.books
};

const actions = {
  [GET_BOOKS](context) { //context.commit(ADD_BOOKS, book);

    const vm = new Vue({
      firebase: {
        allBooks: FireBaseService.getBooks(),
      },
    });



    // context.commit(ADD_BOOK, vm.allBooks)
  },





  // [GET_BOOK](context, bookSlug) {
  //   return new Promise((resolve, reject) => {
  //     FireBaseService.getBook(bookSlug)
  //       .then(querySnapshot => {
  //         querySnapshot.forEach(doc => {
  //           const book = {
  //             'id': doc.id,
  //             'slug': doc.data().slug,
  //             'title': doc.data().title,
  //             'author': doc.data().author
  //           };
  //           resolve(book)
  //         })
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // },
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
  async [DELETE_BOOK](context, data) {
    await data;
    return Promise.all([
      FireBaseService.deleteBook(data.key),
      FireBaseService.deleteFileStorage(data.filename)
    ]);
  }

};

const mutations = {
  [ADD_BOOK] (state, book) {
    //state.books.push(book)
  }
};

export default {
  state,
  actions,
  mutations,
  getters
}
