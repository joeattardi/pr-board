<template>
  <div class="board-editor">
    <div class="row">
      <label for="boardName">Board name</label>
      <input autofocus id="boardName" type="text" v-model="boardName" />
    </div>
    <div class="row">
      <label>Repositories</label>
      <form>
        <ul id="repos">
          <li class="repo-item" v-for="(repo, index) in repos">
            <img src="icons/repo.svg" />
            {{ repo.owner }}/{{ repo.name }}
            <i title="Delete" @click="deleteRepo(index)" class="fa fa-times" aria-hidden="true"></i>
          </li>
        </ul>
        <div v-if="repoError" class="error-message">
          <i class="fa fa-lg fa-times-circle-o" aria-hidden="true"></i>
          {{ repoError }}
        </div>
        <input ref="owner" id="owner" type="text" v-model="owner" placeholder="Owner" />
        <span class="separator">/</span>
        <input id="repository" type="text" v-model="repo" placeholder="Repository" />
        <button v-if="!loading" :disabled="!repoValid" @click.prevent="addRepo">Add repository</button>
        <button v-else disabled><loading-indicator /></button>
      </form>
      <br />
      <button @click.prevent="onSave(boardName, repos)" :disabled="!valid">
        Save Board 
      </button>
      <button class="delete-button" v-if="onDelete" @click.prevent="onDelete">Delete Board</button>
      <button @click.prevent="onCancel">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
  import LoadingIndicator from './LoadingIndicator.vue';
  import { getRepo } from '../githubService';

  export default {
    components: {
      LoadingIndicator
    },
    props: {
      board: {
        type: Object,
        default() {
          return {
            name: '',
            repos: []
          };
        }
      },
      onSave: {
        type: Function,
        required: true
      },
      onCancel: {
        type: Function,
        required: true
      },
      onDelete: {
        type: Function,
        required: false
      }
    },
    data() {
      return {
        boardName: this.board.name,
        repos: this.board.repos,
        owner: '',
        repo: '',
        loading: false,
        repoError: null,
      };
    },
    computed: {
      repoValid() {
        return this.owner !== '' && this.repo !== '';
      },
      valid() {
        return this.boardName.length > 0 && this.repos.length > 0;
      }
    },
    methods: {
      addRepo() {
        this.loading = true;
        getRepo(this.owner, this.repo).then(() => {
          this.repos.push({ owner: this.owner, name: this.repo });
          this.loading = false;
          this.resetRepoInput();
          this.repoError = null;
        }).catch((response) => {
          if (response.status === 404) {
            this.repoError = `The repository "${this.owner}/${this.repo}" was not found.`;
          } else {
            this.repoError = `An error occurred while adding the repository "${this.owner}/${this.repo}". Please try again.`;
          }

          this.resetRepoInput();
          this.loading = false;
        });
      },
      resetRepoInput() {
        this.owner = '';
        this.repo = '';
        this.$refs.owner.focus();
      },
      deleteRepo(index) {
        this.repos.splice(index, 1);
      }
    }
  };
</script>

<style lang="sass">
  .board-editor { 
    padding: 0.5em;

    .repo-item {
      img {
        vertical-align: middle;
      }
    }

    div.row {
      margin: 1em;
    }

    label {
      font-size: 0.9em;
      display: block;
      font-weight: bold;
    }

    button {
      width: 10em;
      vertical-align: middle;
      transition: all 0.2s;

      div {
        margin: 1em;
      }
    }

    span.separator {
      font-size: 2em;
      vertical-align: middle;
    }

    input {
      font-size: 1.1em;
      vertical-align: middle;
    }

    #boardName {
      width: 35em;
    }

    #owner {
      width: 5em;
    }

    #repos {
      padding: 0;

      li {
        list-style-type: none;
        padding: 0.5em;
        margin: 0.5em;

        background-color: #EFEFEF;
        border-radius: 5px;

        i {
          cursor: pointer;
        }
      }
    }
  }

</style>
