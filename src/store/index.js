/* eslint-disable no-param-reassign */

import Vuex from 'vuex';
import Vue from 'vue';

import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  state: {
    user: null,
    accessToken: null,
    showUserMenu: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },

    showUserMenu(state) {
      state.showUserMenu = true;
    },

    hideUserMenu(state) {
      state.showUserMenu = false;
    }
  }
});
