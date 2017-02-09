import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import './images/favicon.png';
import './images/headerLogo.png';
import './scss/index.scss';

import App from './App';
import MainView from './components/MainView';
import AddBoard from './components/AddBoard';
import PageNotFound from './components/PageNotFound';
import ViewBoard from './components/ViewBoard';

import store from './store/index';
import firebaseApp from './firebase';

Vue.use(VueRouter);
Vue.use(VueResource);

firebaseApp.auth().onAuthStateChanged(user => {
  store.dispatch('setUser', user);
});

const routes = [
  { path: '/', component: MainView },
  { path: '/boards/new', component: AddBoard },
  { path: '/boards/:id', component: ViewBoard },
  { path: '*', component: PageNotFound }
];

const router = new VueRouter({ routes });

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
