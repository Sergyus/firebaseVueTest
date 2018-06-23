import firebase from 'firebase/app';
import config   from './config';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

let app = firebase.initializeApp(config);

export const auth = app.auth();
export const db = app.database();
export const storage = app.storage();

export const booksRef = db.ref('books');
export const uploadRef = storage.ref('images');
