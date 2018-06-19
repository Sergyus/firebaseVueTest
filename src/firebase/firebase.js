import firebase from 'firebase/app';
import config from './config'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'

let app = firebase.initializeApp(config);
let db = app.database();

export const booksRef = db.ref('books');

export default {
  register (credentials) {
    return app.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
  },
  checkAuth () {
    return app.auth().currentUser
  },
  login (credentials) {
    return app.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
  },
  logout () {
    return app.auth().signOut()
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
    const ref = app.storage().ref()
    const task = ref.child(coverFile.name).put(coverFile.file, coverFile.metadata)
    return task
  }
}
