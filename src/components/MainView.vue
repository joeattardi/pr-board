<template>
  <div>
    <login-container v-if="!loggedIn" />
    <my-boards v-else />
  </div>
</template>

<script>
  import LoginContainer from './LoginContainer';
  import MyBoards from './MyBoards';

  export default {
    components: {
      LoginContainer,
      MyBoards
    },
    computed: {
      loggedIn() {
        return this.$store.state.user != null;
      }
    }
  };
</script>
