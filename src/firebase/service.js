import Vue from 'vue';
import {db} from "./firebase";

let booksRef = db.ref('books');
let VM = new Vue({
  firebase: {
    books: booksRef
  },
});

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
  uploadCover(coverFile) {
    const ref = app.storage().ref()
    const task = ref.child(coverFile.name).put(coverFile.file, coverFile.metadata)
    return task
  }


  // deleteItem(key) {
  //   this.$firebaseRefs.books.child(key).remove();
  // }
}
