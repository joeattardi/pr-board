<template>
  <div id="add-board-form">
    <h1>Add New Board</h1>
      <div class="row">
        <label for="boardName">Board name</label>
        <input autofocus id="boardName" type="text" v-model="boardName" />
      </div>
      <div class="row">
        <label>Repositories</label>
        <form>
          <ul id="repos">
            <li class="repo-item" v-for="(repo, index) in repos">
              <i class="fa fa-lg fa-github" aria-hidden="true"></i>
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
        <button @click="addBoard" :disabled="!valid">
          Create Board
        </button>
        <button @click.prevent="cancel">
          Cancel
        </button>
      </div>
  </div>
</template>

<script>
  import LoadingIndicator from './LoadingIndicator';
  import { saveBoard } from '../firebase';
  import { getRepo } from '../githubService';

  export default {
    components: {
      'loading-indicator': LoadingIndicator
    },
    data() {
      return {
        boardName: '',
        repos: [],
        owner: '',
        repo: '',
        loading: false,
        repoError: null
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
      cancel() {
        this.$router.push('/');
      },
      addBoard() {
        saveBoard(this.boardName, this.repos, this.$store.state.user).then(() => {
          this.$router.push('/'); 
        }).catch(error => {
          
        });
      },
      addRepo() {
        this.loading = true;
        getRepo(this.owner, this.repo).then(response => {
          this.repos.push({ owner: this.owner, name: this.repo });
          this.loading = false;
          this.resetRepoInput();
          this.repoError = null;
        }).catch(response => {
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
  #add-board-form {
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
