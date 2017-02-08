<template>
  <header>
    <img height="20" width="20" src="headerLogo.png" />
    <h1>PR Board</h1>
    <div class="user-info">
      <img :src="currentUser.photoURL" width="32" height="32" />
    </div>
  </header>
</template>

<script>
  import firebase from 'firebase';

  export default {
    computed: {
      currentUser() {
        return this.$store.state.user || {};
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

    h1 {
      margin: 0;
      font-size: 1.5em;
    }

    img {
      margin: 0.25em;
    }

    .user-info {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
        
      img {
        border-radius: 50%;
      }
    }
  }
</style>
