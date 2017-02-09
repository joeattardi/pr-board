import MainView from './components/MainView.vue';
import AddBoard from './components/AddBoard.vue';
import ViewBoard from './components/ViewBoard.vue';
import PageNotFound from './components/PageNotFound.vue';
import store from './store/index';

function checkForLogin(to, from, next) {
  next();
  //if (!store.state.user) {
    //console.log('redirecting to login');
    //next('/');
  //} else {
    //next();
  //}
}

export default [
  { path: '/', component: MainView },
  { 
    path: '/boards/new',
    component: AddBoard,
    beforeEnter: checkForLogin
  },
  { 
    path: '/boards/:id',
    component: ViewBoard,
    beforeEnter: checkForLogin
  },
  { path: '*', component: PageNotFound }
];

