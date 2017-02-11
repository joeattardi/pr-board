import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import './images/favicon.png';
import './images/headerLogo.png';
import './scss/index.scss';

import App from './App.vue';

import routes from './routes';
import store from './store/index';
import firebaseApp, { getAccessToken } from './firebase';

Vue.use(VueRouter);
Vue.use(VueResource);

firebaseApp.auth().onAuthStateChanged((user) => {
  store.dispatch('setUser', user);
  if (user) {
    getAccessToken(user).then((token) => {
      store.dispatch('setAccessToken', token);
    });
  }
});

const router = new VueRouter({ routes });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
