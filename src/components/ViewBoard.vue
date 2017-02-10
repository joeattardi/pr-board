<template>
  <div id="board-view">
    <div class="board-header">
        <h1>{{ board.name }}</h1>
        <div class="pr-count" :title="pullRequests.length + ' open pull requests'">
          <img src="icons/git-pull-request.svg" />
          <span>{{ pullRequests.length }}</span>
        </div>
        <div class="repo-count" :title="board.repos.length + ' repositories in this board'">
          <img src="icons/repo.svg" />
          <span>{{ board.repos.length }}</span>
        </div>
        <board-toolbar :onRefresh="refresh"/>
    </div>
    <div v-if="loading" style="text-align: center;">
      <loading-indicator color="#000000" size="10px" />
    </div>
    <div v-else>
      <div v-if="loadError" class="error-message">
        <i class="fa fa-lg fa-times-circle-o" aria-hidden="true"></i>
        {{ loadError }}
      </div>
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
  import LoadingIndicator from './LoadingIndicator.vue';
  import PullRequest from './PullRequest.vue';
  import BoardToolbar from './BoardToolbar.vue';

  export default {
    components: {
      LoadingIndicator,
      PullRequest,
      BoardToolbar
    },
    data() {
      return {
        loading: true,
        loadError: null,
        board: {
          repos: [] 
        },
        pullRequests: []
      };
    },
    methods: {
      refresh() {
        this.loading = true;
        this.loadPullRequests();
      },
      loadPullRequests() {
        Promise.map(this.board.repos,
          repo => getPullRequests(repo.owner, repo.name)).then((results) => {
            const pullRequests = results.reduce(
              (finalResult, result) => finalResult.concat(result.body)
          , []);
            pullRequests.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
            this.pullRequests = pullRequests;
            this.loading = false;
            document.title = `${this.board.name}: PR Board`;
          }).catch((result) => {
            this.loading = false;
            if (result.status === 403) {
              this.loadError = 'GitHub is temporarily unavailable. Please try again later.';
            } else {
              this.loadError = 'An error occurred while loading pull request data. Please try again.';
            }
          });
      }
    },
    mounted() {
      getBoard(this.$route.params.id).then((board) => {
        this.board = board;
        this.loadPullRequests();
      });
    }
  };
</script>

<style lang="sass">
  #board-view {

    .board-header {
      padding: 0.5em;
      background-color: #EEEEEE;
      border-bottom: 1px solid #999999;
      box-shadow: 1px 1px 10px #666666;
      display: flex;

      h1 {
        margin: 0;
        margin-right: 1em;
        font-size: 1.5em;
      }

      h2 {
        margin: 0;
        font-size: 1em;
      }

      .pr-count, .repo-count {
        align-self: center;
        margin-right: 1em;

        span {
          vertical-align: middle;
        }

        img {
          vertical-align: middle;
        }
      }

    }

    .error-message {
      margin: 0.5em;
    }
  }
</style>
