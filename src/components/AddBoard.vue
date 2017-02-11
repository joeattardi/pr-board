<template>
  <div id="add-board-form">
    <div v-if="boardError" class="error-message">
      <i class="fa fa-lg fa-times-circle-o" aria-hidden="true"></i>
      {{ boardError }}
    </div>
    <h1>Add New Board</h1>
    <board-editor :onCancel="cancel" :onSave="addBoard" />
  </div>
</template>

<script>
  import BoardEditor from './BoardEditor.vue';
  import LoadingIndicator from './LoadingIndicator.vue';
  import { addBoard } from '../firebase';

  export default {
    components: {
      BoardEditor,
      LoadingIndicator
    },
    mounted() {
      document.title = 'Add New Board: PR Board';
    },
    data() {
      return {
        loading: false,
        boardError: null
      };
    },
    methods: {
      cancel() {
        this.$router.push('/');
      },
      addBoard(boardName, repos) {
        addBoard(boardName, repos, this.$store.state.user).then(() => {
          this.$router.push('/');
        }).catch(() => {
          this.boardError = `An error occurred while trying to create the board "${boardName}". Please try again.`;
        });
      }
    }
  };
</script>

<style lang="sass">
  #add-board-form {
    padding: 0.5em;
  }
</style>
