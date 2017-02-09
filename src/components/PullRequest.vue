<template>
  <div class="pull-request">
    <img class="avatar" :src="pullRequest.user.avatar_url" :title="pullRequest.user.login" />
    <div class="pull-request-info">
      <h3>
        <a target="_blank" :href="pullRequest.html_url">
          {{ pullRequest.title }}
        </a>
      </h3>
      <div>
        <a target="_blank" :href="pullRequest.base.repo.html_url">{{ pullRequest.base.repo.full_name }}</a>
        <span class="pr-number">#{{ pullRequest.number }}</span>
      </div>
      <div>
        Created {{ relativeCreatedTime }}
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    props: {
      pullRequest: {
        type: Object,
        required: true
      }
    },
    computed: {
      relativeCreatedTime() {
        return moment(this.pullRequest.created_at).from(moment());
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

    .pr-number {
      color: #AAAAAA;
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
