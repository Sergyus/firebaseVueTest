import Vue from 'vue';
import router from "../router";
import {auth, booksRef, uploadRef} from "./firebase";

export default {
  createBooks(bookData) {

    let hash = (+new Date).toString(36);
    let fileName = hash +'_'+ bookData.file.name;
    let metadata = {contentType: bookData.file.type};

    let uploadTask = uploadRef.child(fileName).put(bookData.file, metadata);

    return new Promise((resolve, reject) => {
      uploadTask.then((snapshot) => {
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
  deleteBook(key) {
    if(confirm('Вы действительно хотите удалить эту книгу?')) {
      return booksRef.child(key).remove();
    }
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



//============= tmp =================================>

// user.updateProfile({displayName: 'Sergyus Mes'});

// pictures.putString(image, `data_url`).then(function(snapshot) {
//   console.log('Uploaded a data_url string!');
//   var url = snapshot.downloadURL;
//  add it to firestore
// });
