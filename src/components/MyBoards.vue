<template>
  <div>
    <h1>My Boards</h1>
    <button @click.prevent="addBoard">
      <i class="fa fa-plus" aria-hidden="true"></i>
      Add New Board
    </button>
    <div v-if="!loading" id="boards">
      <div class="board" v-for="board in boards">
        <h2>
          <i class="fa fa-sticky-note-o" aria-hidden="true"></i>
          {{ board.name }}
        </h2>
        {{ board.repos.length }} {{ board.repos.length === 1 ? 'repository' : 'repositories' }}
      </div>
    </div>
    <div v-else style="text-align: center;">
      <loading-indicator size="10px" color="#000000" />
    </div>
  </div>
</template>

<script>
  import LoadingIndicator from './LoadingIndicator';
  import { getBoards } from '../firebase';

  export default {
    components: {
      LoadingIndicator
    },
    data() {
      return {
        boards: [],
        loading: true
      };
    },
    mounted() {
      getBoards(this.$store.state.user).then(result => {
        this.boards = result;
        this.loading = false;
      });
    },
    methods: {
      addBoard() {
        this.$router.push('/boards/new');
      }
    }
  };
</script>

<style lang="sass">
  @import '../scss/variables';

  #boards {
    padding: 0.5em;
    display: flex;

    .board {
      background-color: lighten($main-color, 50%);
      border: 1px solid #999999;
      border-radius: 5px;
      margin: 0.5em;
      padding: 0.5em;
      box-shadow: 2px 2px 2px #666666;    
      cursor: pointer;
      transition: transform 0.1s;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
</style>
