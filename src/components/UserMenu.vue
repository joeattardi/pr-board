<template>
  <div id="user-menu" v-if="showMenu">
    <div><strong>{{ currentUser.displayName }}</strong></div>
    <div>
      <button @click.prevent="signOut">
        <i class="fa fa-sign-out" aria-hidden="true"></i>
        Sign out
      </button>
    </div>
  </div>
</template>

<script>
  import firebaseApp from '../firebase';

  export default {
    computed: {
      currentUser() {
        return this.$store.state.user || {};
      },
      showMenu() {
        return this.$store.state.showUserMenu;
      }
    },
    methods: {
      signOut() {
        firebaseApp.auth().signOut();
      }
    }
  };
</script>

<style lang="sass">
  #user-menu {
    text-align: center;
    background-color: #EEEEEE;
    box-shadow: 2px 2px 2px #666666;
    color: #000000;
    padding: 0.75em;
    position: absolute;
    right: 0;
    top: 48px;

    button {
      margin: 0.5em;
    }
  }
</style>
