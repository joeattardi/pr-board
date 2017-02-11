<template>
  <div id="login-container">
    <h1>View pull requests across multiple GitHub repositories.</h1>
    <img src="screenshot.png" />

    <h2>To get started, sign in with your GitHub account.</h2>
    <button @click.prevent="signInGitHub">
      <i class="fa fa-lg fa-github" aria-hidden="true"></i>
      Sign in with GitHub
    </button>
  </div>
</template>

<script>
  import firebase from 'firebase';

  import '../images/screenshot.png';
  import { createUserRecord } from '../firebase';

  export default {
    methods: {
      signInGitHub() {
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
          createUserRecord(result.user, result.credential.accessToken);
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
    width: 50em;
    margin: 5em auto;
    background-color: #EEEEEE;
    box-shadow: 1px 1px 1px #666666;

    img {
      width: 47em;
    }

    button {
      padding: 1em;
    }
  }
</style>
