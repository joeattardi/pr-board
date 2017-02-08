import Vue from 'vue';

import './images/favicon.png';
import './images/headerLogo.png';
import './scss/index.scss';
import App from './App';
import store from './store/index';
import firebaseApp from './firebase';

firebaseApp.auth().onAuthStateChanged(user => {
  store.dispatch('setUser', user);
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
