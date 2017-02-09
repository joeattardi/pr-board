<template>
  <div id="board-view">
    <div v-if="loading" style="text-align: center;">
      <loading-indicator color="#000000" size="10px" />
    </div>
    <div v-else>
      <h1>{{ board.name }}</h1>
    </div>
  </div>
</template>

<script>
  import { getBoard } from '../firebase';
  import LoadingIndicator from './LoadingIndicator';

  export default {
    components: {
      LoadingIndicator
    },
    data() {
      return {
        loading: true,
        board: null
      };
    },
    mounted() {
      getBoard(this.$route.params.id).then(board => {
        this.loading = false;
        this.board = board;
      });
    }
  };
</script>
