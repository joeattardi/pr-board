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

if (NODE_ENV === 'production') {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-80557105-2', 'auto');
  ga('send', 'pageview');
}

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
