<template>
  <header>
    <router-link to="/">
      <img height="20" width="20" src="headerLogo.png" />
      <h1>PR Board</h1>
    </router-link>
    <div class="spacer"></div>
    <div v-if="loggedIn">
      My Boards
      <i class="fa fa-caret-down" aria-hidden="true"></i>
    </div>
    <div v-if="loggedIn" class="user-info" @click="showUserMenu">
      <img :src="currentUser.photoURL" width="32" height="32" />
      <i class="fa fa-caret-down" aria-hidden="true"></i>
    </div>
    <user-menu />
  </header>
</template>

<script>
  import UserMenu from './UserMenu';

  export default {
    components: {
      UserMenu
    },
    computed: {
      currentUser() {
        return this.$store.state.user || {};
      },
      loggedIn() {
        return this.$store.state.user != null;
      }
    },
    methods: {
      showUserMenu(event) {
        event.stopPropagation();
        this.$store.dispatch('showUserMenu');
      }
    }
  };

</script>

<style lang="sass">
  @import '../scss/variables';

  header {
    background-color: $main-color;
    padding: 0.25em;
    border-bottom: 1px solid darken($main-color, 10%);
    box-shadow: 1px 1px 10px #666666;
    color: #FFFFFF;
    display: flex;
    align-items: center;

    a {
      color: #FFFFFF;
      text-decoration: none;
      display: flex;
    }

    h1 {
      margin: 0;
      font-size: 1.5em;
    }

    img {
      margin: 0.25em;
    }

    .spacer {
      flex-grow: 1;
    }

    .user-info {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      cursor: pointer;

      padding: 0.25em;

      &:hover {
        background-color: lighten($main-color, 5%);
      }
        
      img {
        border-radius: 50%;
      }
    }
  }
</style>
