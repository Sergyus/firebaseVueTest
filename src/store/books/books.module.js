import FireBaseService from '../../firebase/service';
import {CREATE_BOOK, DELETE_BOOK, GET_BOOKS, UPDATE_BOOK} from './books.actions.type';
import {ADD_BOOK} from './books.mutations.type';
import Vue from 'vue';


const state = {
  books: []
};

//console.log(state);

const getters = {
  getAllBooks: state => state.books
};

const actions = {
  async [GET_BOOKS](context) { //context.commit(ADD_BOOKS, book);

    const vm = new Vue({
      firebase: {
        allBooks: await FireBaseService.getBooks(),
      },
    });

    let allBooks = vm.allBooks;

    context.commit(ADD_BOOK, allBooks)
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
      FireBaseService.createBooks(bookData);
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
  [ADD_BOOK](state, books) {
    state.books.push(books)
  }
};

export default {
  state,
  actions,
  mutations,
  getters
}
