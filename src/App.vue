<template>
  <div id="content-container" @click="hideUserMenu">
    <app-header />
    <div id="content-body">
      <router-view />
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';

  import Header from './components/Header';
  import LoginContainer from './components/LoginContainer';

  export default {
    components: {
      'app-header': Header,
      'login-container': LoginContainer
    },
    methods: {
      hideUserMenu() {
        this.$store.dispatch('hideUserMenu');
      },
    }
  };
</script>

<style lang="sass">
  #content-container {
    height: 100vh;

    #content-body {
      padding: 0.5em;
    }
  }
</style>
