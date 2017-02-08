import Vue from 'vue';
import * as firebase from 'firebase';

import './images/favicon.png';
import './images/headerLogo.png';
import './scss/index.scss';
import App from './App';

const firebaseApp = firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
});

firebaseApp.auth().onAuthStateChanged(user => {
  console.log(user);
});

new Vue({
  el: '#app',
  render: h => h(App)
});
