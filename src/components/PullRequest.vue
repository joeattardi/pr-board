<template>
  <div class="pull-request">
    {{ pullRequest.title }}
  </div>
</template>

<script>
  export default {
    props: {
      pullRequest: {
        type: Object,
        required: true
      }
    }
  };
</script>
