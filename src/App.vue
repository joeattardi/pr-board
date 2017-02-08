<template>
  <div id="content-container" @click="hideUserMenu">
    <app-header />
    <a href="#" @click.prevent="signInGitHub">Sign in with GitHub</a>
  </div>
</template>

<script>
  import firebase from 'firebase';

  import Header from './components/Header';

  export default {
    components: {
      'app-header': Header
    },
    methods: {
      hideUserMenu() {
        this.$store.dispatch('hideUserMenu');
      },
      signInGitHub(event) {
        const provider = new firebase.auth.GithubAuthProvider(); 
        firebase.auth().signInWithPopup(provider).then(result => {
          const token = result.credential.accessToken;
        });
      }
    }
  };
</script>

<style lang="sass">
  #content-container {
    height: 100vh;
  }
</style>
