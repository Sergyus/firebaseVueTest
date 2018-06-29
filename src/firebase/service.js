import {auth, booksRef, uploadRef} from "./firebase";

export default {
  getBooks() {
    return booksRef;
  },
  deleteBook(key) {
    if(confirm('Вы действительно хотите удалить эту книгу?')) {
      return booksRef.child(key).remove();
    }
  },
  updateBook(key, uploads) {
    return booksRef.child(key).set(uploads);
  },
  signIn(data) {
    return auth.signInWithEmailAndPassword(data.email, data.password);
  },
  logout() {
    return auth.signOut().catch(err => console.log(err))
  },
  deleteFileStorage(name) {
    return uploadRef.child(name).delete();
  },
}
