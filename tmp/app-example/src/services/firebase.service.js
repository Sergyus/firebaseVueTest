import firebase from 'firebase'
import db from '../firebase/firebase.init'

export default {
  register (credentials) {
    return firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
  },
  checkAuth () {
    return firebase.auth().currentUser
  },
  login (credentials) {
    return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
  },
  logout () {
    return firebase.auth().signOut()
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
    const ref = firebase.storage().ref()
    const task = ref.child(coverFile.name).put(coverFile.file, coverFile.metadata)
    return task
  }
}
