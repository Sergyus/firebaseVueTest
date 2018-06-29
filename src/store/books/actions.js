import {INIT_BOOKS, CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK,} from "./books.actions.type";
import FireBaseService from "../../firebase/service";
import {booksRef, uploadRef} from "../../firebase/firebase";
import { firebaseAction } from 'vuexfire'

export const actions = {

  [INIT_BOOKS]: firebaseAction(({bindFirebaseRef}) => {
    let allBooks = FireBaseService.getBooks();
    bindFirebaseRef('books', allBooks, { wait: true });
  }),

  [CREATE_BOOK]: firebaseAction((ctx, bookData) => {

    let hash = (+new Date).toString(36);
    let fileName = hash +'_'+ bookData.file.name;
    let metadata = {contentType: bookData.file.type};

    let uploadTask = uploadRef.child(fileName).put(bookData.file, metadata);  // Storage

    return uploadTask.then(snapshot => {
      snapshot.ref.getDownloadURL()
        .then(downloadURL => {
          booksRef.push({
            name: bookData.name,
            price: bookData.price,
            image: {
              name: fileName,
              url: downloadURL
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }),

  [UPDATE_BOOK](context, data) {

    let uploads = {
      name: data.form.name,
      price: data.form.price,
      image: {
        name: data.edit.image.name,
        url: data.edit.image.url,
      },
    };

    return new Promise((resolve, reject) => {
      FireBaseService.updateBook(data.edit.key, uploads)
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(error);
          console.log(error);
        });
    })
  },

  async [DELETE_BOOK](context, data) {
    return Promise.all([
      FireBaseService.deleteBook(await data.key),
      FireBaseService.deleteFileStorage(await data.filename)
    ]);
  }

};
