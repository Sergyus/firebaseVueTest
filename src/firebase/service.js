import Vue from 'vue';
import store from "../store";
import router from "../router";
import {db, storage, auth, booksRef, uploadRef} from "./firebase";
import {CHECK_AUTH} from "../store/authentication/authentication.actions.type";
import {ADD_BOOK} from "../../tmp/app-example/src/store/books/books.mutations.type";

export default {
  createBooks(bookData) {

    let hash = (+new Date).toString(36);
    let fileName = hash +'_'+ bookData.file.name;
    let metadata = {contentType: bookData.file.type};

    let uploadTask = uploadRef.child(fileName).put(bookData.file, metadata);

    return new Promise((resolve, reject) => {
      uploadTask.then(function(snapshot) {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          resolve(true);
          booksRef.push({
            name: bookData.name,
            price: bookData.price,
            image: {
              name: fileName,
              url: downloadURL
            }
          })
        });
      });
    }, error => {
      reject(error);
    });
  },
  getBooks() {
    return booksRef;
  },
  deleteBook(name) {
    if(confirm('Вы действительно хотите удалить эту книгу?')) {
      return booksRef.child(name).remove();
    }
  },
  signIn(data) {
    return auth.signInWithEmailAndPassword(data.email, data.password);
  },
  logout() {
    router.replace('/');
    return auth.signOut().catch(err => console.log(err))
  },
  deleteFileStorage(name) {
    return uploadRef.child(name).delete();
  },
  // uploadCover(coverFile) {
  //   const ref = app.storage().ref()
  //   const task = ref.child(coverFile.name).put(coverFile.file, coverFile.metadata)
  //   return task
  // },

  //============= OLD =================================

  // user.updateProfile({displayName: 'Sergyus Mes'});

  // login(credentials) {
  //   return app.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
  // },
  // getBook(bookSlug) {
  //   return db.collection('books').where('slug', '==', bookSlug).get()
  // },
}


// pictures.putString(image, `data_url`).then(function(snapshot) {
//   console.log('Uploaded a data_url string!');
//   var url = snapshot.downloadURL;
//  add it to firestore
// });
