import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'

const fb = firebase.initializeApp({
  apiKey: "AIzaSyDxjVy-3e2IMmqOoPXn3tZ42z9Ou4bVC28",
  authDomain: "book-db-df517.firebaseapp.com",
  databaseURL: "https://book-db-df517.firebaseio.com",
  projectId: "book-db-df517",
  storageBucket: "",
  messagingSenderId: "875212420296"
});

export const db = fb.database();
export const booksRef = db.ref('books');

export default {
  register (credentials) {
    return fb.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
  },
  checkAuth () {
    return fb.auth().currentUser
  },
  login (credentials) {
    return fb.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
  },
  logout () {
    return fb.auth().signOut()
  },
  getBooks () {
    return db.collection('books').get()
  },
  getBook (bookSlug) {
    return db.collection('books').where('slug', '==', bookSlug).get()
  },
  createBooks (bookData) {
    // throw new String('error')
    return db.collection('books').add(bookData)
  },
  uploadCover (coverFile) {
    const ref = fb.storage().ref()
    const task = ref.child(coverFile.name).put(coverFile.file, coverFile.metadata)
    return task
  }
}
