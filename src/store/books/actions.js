import {CREATE_BOOK, DELETE_BOOK, GET_BOOKS, UPDATE_BOOK, DEL_BOOK} from "./books.actions.type";
import {ADD_BOOK} from "./books.mutations.type";
import FireBaseService from "../../firebase/service";
import {booksRef, uploadRef} from "../../firebase/firebase";
import { firebaseAction } from 'vuexfire'

export const actions = {

  [GET_BOOKS]: firebaseAction(({bindFirebaseRef}, ref) => {
    let allBooks = FireBaseService.getBooks();
    bindFirebaseRef('books', allBooks);
  }),

  // [DEL_BOOK]: firebaseAction(({bindFirebaseRef, unbindFirebaseRef}, ref) => {
  //   unbindFirebaseRef('books', ref);
  // }),

  // [GET_BOOKS](context) { //context.commit(ADD_BOOKS, book);
    // FireBaseService.getBooks().once('value')
    //   .then((data) => {
    //     const books = [];
    //     data.forEach((elem) => {
    //       books.push({
    //         id: elem.key,
    //         el: elem.toJSON()
    //       })
    //     });
    //     context.commit(ADD_BOOK, books);
    //     //_____________________________________
    //     //const obj = data.val();
    //     // for (let key in obj) {
    //     //   books.push({
    //     //     id: key,
    //     //   })
    //     // }
    //     //console.log(books);
    //     // context.commit(ADD_BOOK, books);
    //     //_____________________________________
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  // },
  [CREATE_BOOK](context, bookData) {
    console.log('CREATE_BOOK');
    let hash = (+new Date).toString(36);
    let fileName = hash +'_'+ bookData.file.name;
    let metadata = {contentType: bookData.file.type};

    let uploadTask = uploadRef.child(fileName).put(bookData.file, metadata);  // Storage

    return new Promise((resolve, reject) => {
      uploadTask.then((snapshot) => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          resolve(true);

          let newBook = {
            name: bookData.name,
            price: bookData.price,
            image: {
              name: fileName,
              url: downloadURL
            }
          };

          booksRef.push(newBook)

        });
      });
    }, error => {
      reject(error);
    });
  },
  [UPDATE_BOOK](context, bookData) {
    return new Promise((resolve, reject) => {

        todosRef.child(todo['.key']).child('text').set(newText)

    })
  },
  async [DELETE_BOOK](context, data) {
    return Promise.all([
      FireBaseService.deleteBook(await data.key),
      FireBaseService.deleteFileStorage(await data.filename)
    ]);
  }
};
