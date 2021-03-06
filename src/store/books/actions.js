import {INIT_BOOKS, CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK} from "./books.actions.type"
import FireBaseService from "../../firebase/service"
import {booksRef, uploadRef} from "../../firebase/firebase"
import { firebaseAction } from 'vuexfire'

export const actions = {

  [INIT_BOOKS]: firebaseAction(({bindFirebaseRef}) => {
    let allBooks = FireBaseService.getBooks()
      // .orderByKey()
      // .orderByValue()
      // .startAt("2")
      // .limitToLast(3)
      // .endAt('1')
      // .orderByChild('price')
    ;

    // allBooks.orderByKey().limitToLast(2).on('value', function(snapshot) {
    //   console.log(snapshot.val());
    // });

    return bindFirebaseRef('books', allBooks, { wait: true });
  }),

  [CREATE_BOOK]: firebaseAction((ctx, newBook) => {

    const newBookData = newBook.data;
    const newBookFile = newBook.file;
    let UploadTask = false;

    if(newBookFile) {
      UploadTask = FireBaseService.saveToStorage(newBookFile);
    }

    if(UploadTask) {
      return new Promise((resolve, reject) => {
        UploadTask.then(snapshot => {
          snapshot.ref.getDownloadURL()
            .then(downloadURL => {
              booksRef.push({
                ...newBookData,
                image: {
                  name: UploadTask.ref_.name,
                  url: downloadURL
                }
              });
              resolve(true);
            })
            .catch(error => {
              reject(error);
              console.log(error);
            });
        });
      });
    }
  }),

  [UPDATE_BOOK](context, data) {

    const key = data.edit.key;

    if(data.file) {
      const current_image_name = data.edit.image.name;

      let UploadTask = FireBaseService.saveToStorage(data.file);

      return new Promise((resolve, reject) => {
        UploadTask.then(function (snapshot) {
          snapshot.ref.getDownloadURL()
            .then(downloadURL => {

              booksRef.child(key).update({
                ...data.form,
                image: {
                  name: UploadTask.ref_.name,
                  url: downloadURL
                }
              });

              context.dispatch(DELETE_BOOK, {filename: current_image_name});
              resolve(true);
            })
            .catch(error => {
              reject(error);
              console.log(error);
            });
        });
      });
    };

    return new Promise((resolve, reject) => {
      FireBaseService.updateBook(key, data.form)
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(error);
          console.log(error);
        });
    });

  },

  [DELETE_BOOK](context, data) {
    if(data.key) {
      FireBaseService.deleteBook(data.key)
    }
    if(data.filename) {
      FireBaseService.deleteFileStorage(data.filename)
    }
  }

};
