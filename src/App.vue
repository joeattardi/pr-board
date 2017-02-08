<template>
  <div id="content-container" @click="hideUserMenu">
    <app-header />
    <div id="content-body">
      <login-container v-if="!loggedIn" />
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
    computed: {
      loggedIn() {
        return this.$store.state.user != null;
      }
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

    #content-body {
      padding: 0.5em;
    }
  }
</style>
