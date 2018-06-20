import firebase from 'firebase/app';
import config from './config';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'

let app = firebase.initializeApp(config);
export const db = app.database();
export const storage = app.storage();

//______________________________________________



// var gsReference = storage.refFromURL('gs://bucket/cover/pic_1.jpg')
// let storageRef = storage.ref();
// let imagesRef = storageRef.child('cover/pic_1.jpg');
//let imagesRef = storageRef.child('images');

// console.log(pathReference);








// let storage = app.storage();
// let storageRef = storage.ref('cover');
//
// console.log(storageRef);


// service firebase.storage {
//   match /b/{bucket}/o {
//   match /{allPaths=**} {
//     allow read, write: if request.auth != null;
//   }
// }
// }
