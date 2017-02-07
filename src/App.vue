<template>
  <div>
    <h1>PR Board</h1>
    <a href="#" @click.prevent="signInGitHub">Sign in with GitHub</a>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    methods: {
      signInGitHub(event) {
        const provider = new firebase.auth.GithubAuthProvider(); 
        firebase.auth().signInWithPopup(provider).then(result => {
          const token = result.credential.accessToken;
        });
      }
    }
  };
</script>
