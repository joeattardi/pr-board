<template>
  <div id="content-container" @click="hideUserMenu">
    <app-header />
    <div id="content-body">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <app-footer />
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  import LoginContainer from './components/LoginContainer.vue';

  export default {
    components: {
      'app-header': Header,
      'app-footer': Footer,
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
    display: flex;
    flex-direction: column;

    #content-body {
      flex-grow: 1;
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
