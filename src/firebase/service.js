import {db, storage} from "./firebase";
import {ADD_BOOK} from "../../tmp/app-example/src/store/books/books.mutations.type";

let booksRef = db.ref('books');
let uploadRef = storage.ref().child('cover');
let www = 'null';

export default {
  createBooks(bookData) {

    let _Promise;
    let metadata = { contentType: bookData.file.type };
    let uploadTask = storage.ref('images').child(bookData.file.name).put(bookData.file, metadata);

    return new Promise((resolve, reject) => {
      uploadTask.then(function (snapshot) {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          resolve(true);
          booksRef.push({
            name: bookData.name,
            price: bookData.price,
            image: downloadURL
          })
        });
      });
    }, error => {
      reject(error);
    });

    //return booksRef.push(bookData)
  },
  getBooks() {
    return booksRef;
  },
  deleteBook(key) {
    if (confirm('Вы действительно хотите удалить эту книгу?')) {
      booksRef.child(key).remove()
    }
  },
  getCover(img = 'pic_1.jpg') {
    let imgRef = storage.ref('cover').child(img);
      imgRef.getDownloadURL().then(url => {
    });
  },
  // uploadCover(coverFile) {
  //   const ref = app.storage().ref()
  //   const task = ref.child(coverFile.name).put(coverFile.file, coverFile.metadata)
  //   return task
  // },

  //============= OLD =================================

  checkAuth() {
    return app.auth().currentUser
  },
  login(credentials) {
    return app.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
  },
  logout() {
    return app.auth().signOut()
  },
  getBook(bookSlug) {
    return db.collection('books').where('slug', '==', bookSlug).get()
  },


  // deleteItem(key) {
  //   this.$firebaseRefs.books.child(key).remove();
  // }
}


// pictures.putString(image, `data_url`).then(function(snapshot) {
//   console.log('Uploaded a data_url string!');
//   var url = snapshot.downloadURL;
//  add it to firestore
// });
