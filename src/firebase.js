import firebase from 'firebase/app';
import 'firebase/database';

const firedb = firebase.initializeApp({
  apiKey: "AIzaSyDxjVy-3e2IMmqOoPXn3tZ42z9Ou4bVC28",
  authDomain: "book-db-df517.firebaseapp.com",
  databaseURL: "https://book-db-df517.firebaseio.com",
  projectId: "book-db-df517",
  storageBucket: "",
  messagingSenderId: "875212420296"
});

export const db = firedb.database();
export const booksRef = db.ref('books');
