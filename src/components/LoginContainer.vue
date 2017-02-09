<template>
  <div id="login-container">
    <h2>To get started, sign in with your GitHub account.</h2>
    <button @click.prevent="signInGitHub">
      <i class="fa fa-lg fa-github" aria-hidden="true"></i>
      Sign in with GitHub
    </button>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import { createUserRecord } from '../firebase';

  export default {
    methods: {
      signInGitHub() {
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
          // const token = result.credential.accessToken;
          createUserRecord(result.user);
        });
      }
    }
  };
</script>

<style lang="sass">
  #login-container {
    border-radius: 5px;
    border: 1px solid #AAAAAA;
    padding: 1em;
    text-align: center;
    width: 30em;
    margin: 10em auto;

    button {
      padding: 1em;
    }
  }
</style>
