import Vue from 'vue';
import {db, storage} from "./firebase";

let booksRef = db.ref('books');
let uploadRef = storage.ref().child('cover');

export default {
  createBooks(bookData) {
    return booksRef.push(bookData)
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

    var imagesRef = storage.ref().child('cover/'+img);
    var spaceRef = storage.ref().child('cover/'+img);

    console.log(imagesRef.getDownloadURL());

    // storage.ref().child('cover/'+img).getDownloadURL().then(url => {
    //   console.log(url);
    // });
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
