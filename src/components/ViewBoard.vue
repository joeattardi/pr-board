<template>
  <div id="board-view">
    <div v-if="loading" style="text-align: center;">
      <loading-indicator color="#000000" size="10px" />
    </div>
    <div v-else>
      <h1>{{ board.name }}</h1>
      <div id="pull-requests">
        <div v-for="pullRequest in pullRequests">
          <pull-request :pullRequest="pullRequest" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Promise from 'bluebird';

  import { getBoard } from '../firebase';
  import { getPullRequests } from '../githubService';
  import LoadingIndicator from './LoadingIndicator';
  import PullRequest from './PullRequest';

  export default {
    components: {
      LoadingIndicator,
      PullRequest
    },
    data() {
      return {
        loading: true,
        board: null,
        pullRequests: []
      };
    },
    methods: {
      loadPullRequests() {
        Promise.map(this.board.repos, repo => {
          return getPullRequests(repo.owner, repo.name);
        }).then(results => {
          this.pullRequests = results.reduce((finalResult, result) => finalResult.concat(result.body)
          , []);
          this.loading = false;
        });
      }
    },
    mounted() {
      getBoard(this.$route.params.id).then(board => {
        this.board = board;
        this.loadPullRequests();
      });
    }
  };
</script>
