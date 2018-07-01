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
  saveToStorage(file) {
    let hash = (+new Date).toString(36);
    let fileName = hash +'_'+ file.name;
    let metadata = {contentType: file.type};

    return uploadRef.child(fileName).put(file, metadata);
  },
  updateBook(key, uploads) {
    return booksRef.child(key).update(uploads);
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
