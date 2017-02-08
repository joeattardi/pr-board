import Vue from 'vue';
import * as firebase from 'firebase';

import './images/favicon.png';
import './images/headerLogo.png';
import './scss/index.scss';
import App from './App';
import store from './store/index';

const firebaseApp = firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
});

firebaseApp.auth().onAuthStateChanged(user => {
  store.dispatch('setUser', user);
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
