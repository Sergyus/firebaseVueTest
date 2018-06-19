import firebase from 'firebase/app';
import config from './config';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'

let app = firebase.initializeApp(config);
export const db = app.database();
