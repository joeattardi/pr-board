<template>
  <div class="pull-request" :class="statusClass">
    <img class="avatar" :src="pullRequest.user.avatar_url" :title="pullRequest.user.login" />
    <div class="pr-info">
      <h3>
        <a target="_blank" :href="pullRequest.html_url">
          <img src="icons/git-pull-request.svg" /> 
          {{ pullRequest.title }}
        </a>
      </h3>
      <div>
        <a target="_blank" :href="pullRequest.base.repo.html_url">
          <img src="icons/repo.svg" />
          {{ pullRequest.base.repo.full_name }}
        </a>
        <span class="pr-number">#{{ pullRequest.number }}</span>
        <span class="pr-comments" :title="pullRequest.comments + ' comments'">
          <i class="fa fa-comment" aria-hidden="true"></i>
          {{ pullRequest.comments }}
        </span>
        <span class="pr-mergeable" v-if="pullRequest.mergeable" title="Mergeable">
          <img src="icons/git-merge.svg" />
        </span>
        <span class="pr-commits" title="pullRequest.commits + ' commits'">
          <img src="icons/git-commit.svg" />
          {{ pullRequest.commits }}
        </span>
        <span class="pr-additions" title="pullRequest.additions + ' additions'">
          <span style="color: green;">
           <i class="fa fa-plus" aria-hidden="true"></i>  
          </span>
          {{ pullRequest.additions }}
        </span>
        <span class="pr-deletions" title="pullRequest.deletions + ' deletions'">
          <span style="color: red;">
            <i class="fa fa-minus" aria-hidden="true"></i>
          </span>
          {{ pullRequest.deletions }}
        </span>
      </div>
      <div class="pr-created" :title="pullRequest.created_at">
        Opened by {{ pullRequest.user.login }} {{ relativeCreatedTime }}
      </div>
    </div>
    <div class="pr-updated" :title="'Last updated ' + pullRequest.updated_at">
      {{ relativeUpdatedTime }} 
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  import '../icons/git-commit.svg';
  import '../icons/git-merge.svg';
  import '../icons/repo.svg';
  import '../icons/git-pull-request.svg';

  export default {
    props: {
      pullRequest: {
        type: Object,
        required: true
      }
    },
    computed: {
      statusClass() {
        return this.pullRequest.statuses.length > 0 ? `status status-${this.pullRequest.statuses[0].state}` : 'status';
      },
      relativeCreatedTime() {
        return moment(this.pullRequest.created_at).from(moment());
      },
      relativeUpdatedTime() {
        return moment(this.pullRequest.updated_at).from(moment());
      }
    }
  };
</script>

<style lang="sass">
  @import '../scss/variables';

  .pull-request {
    background-color: #EEEEEE;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    padding: 0.5em;
    margin: 0.5em;
    display: flex;
    box-shadow: 2px 2px 2px #AAAAAA;

    &.status {
      &:before {
        font-family: FontAwesome;
        content: "\f00c";
        color: #FFFFFF;
        position: absolute;
        align-self: center;
        margin-left: -30px;
      }
    }

    &.status-success {
      border-color: $pr-success-color;
      border-left: 30px solid $pr-success-color;

      &:before {
        content: "\f00c";
      }
    }

    &.status-error {
      border-color: $pr-error-color;
      border-left: 30px solid $pr-error-color;

      &:before {
        content: "\f12a";
      }
    }

    &.status-failure {
      border-color: $pr-failure-color;
      border-left: 30px solid $pr-failure-color;

      &:before {
        content: "\f00d";
      }
    }

    &.status-pending {
      border-color: $pr-pending-color;
      border-left: 30px solid $pr-pending-color;

      &:before {
        content: "\f141";
      }
    }

    .pr-number {
      color: #AAAAAA;
    }

    .pr-comments {
      margin: 0 0.5em;
    }

    .pr-commits {
      margin: 0 0.5em;
    }

    .pr-deletions {
      margin: 0 0.5em;
    }

    .pr-created {
      font-size: 0.8em;
    }

    .pr-updated {
      align-self: center;
      font-size: 1.2em;
      font-weight: bold;
      background-color: #B28438;
      color: #FFFFFF;
      padding: 0.5em;
      border-radius: 5px; 
      box-shadow: 1px 1px 1px #654A20;
    }

    .pr-info {
      flex-grow: 1;

      img {
        vertical-align: middle;
      }
    }

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 0.5em;
    }

    a {
      text-decoration: none;
      color: $link-color;

      &:hover {
        color: lighten($link-color, 10%);
      }
    }

    h3 {
      margin: 0;
    }
  }
</style>
