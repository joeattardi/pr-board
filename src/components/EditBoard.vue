<template>
  <div id="edit-board-form">
    <div v-if="boardError" class="error-message">
      <i class="fa fa-lg fa-times-circle-o" aria-hidden="true"></i>
      {{ boardError }}
    </div>
    <div class="confirm-delete" v-if="showConfirmation">
      <h1>Delete Board</h1>
      <div>Are you sure you want to delete the board <strong>{{ board.name }}</strong>?</div>
      <div id="confirm-buttons">
        <button class="delete-button" @click.prevent="deleteConfirm">Delete</button>
        <button @click.prevent="deleteCancel">Cancel</button>
      </div>
    </div>
    <div v-else>
      <h1>Edit Board</h1>
      <div v-if="loading" style="text-align: center;">
        <loading-indicator color="#000000" size="10px" />
      </div>
      <div v-else>
        <board-editor :board="board" :onCancel="cancel" :onSave="saveBoard" :onDelete="deleteBoard" />
      </div>
    </div>
  </div>
</template>

<script>
  import { getBoard, saveBoard, deleteBoard } from '../firebase';

  import LoadingIndicator from './LoadingIndicator.vue';
  import BoardEditor from './BoardEditor.vue';

  export default {
    components: {
      LoadingIndicator,
      BoardEditor
    },
    data() {
      return {
        loading: true,
        board: null,
        boardError: null,
        showConfirmation: false
      };
    },
    methods: {
      cancel() {
        this.$router.push(`/boards/${this.$route.params.id}`);
      },
      saveBoard(name, repos) {
        this.loading = true;
        saveBoard(this.$route.params.id, name, repos, this.$store.state.user).then(() => {
          this.$router.push(`/boards/${this.$route.params.id}`);
        });
      },
      deleteCancel() {
        this.showConfirmation = false;
      },
      deleteConfirm() {
        this.loading = true;
        deleteBoard(this.$store.state.user, this.$route.params.id).then(() => {
          this.$router.push('/');
        });
      },
      deleteBoard() {
        this.showConfirmation = true;
      }
    },
    mounted() {
      getBoard(this.$route.params.id).then((board) => {
        this.board = board;
        this.loading = false;
      });
    }

  };
</script>

<style lang="sass">
  #edit-board-form {
    padding: 0.5em;
  }

  .confirm-delete {
    #confirm-buttons {
      margin: 0.5em;

      button {
        width: 10em;
      }
    }
  }
</style>
