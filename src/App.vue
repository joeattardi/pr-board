<template>
  <div id="content-container" @click="hideUserMenu">
    <app-header />
    <div id="content-body">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
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

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-leave {
    opacity: 1;
  }

</style>
