<template>
  <button title="Refresh" @click.prevent="onRefresh">
    <i class="fa fa-refresh"></i>
  </button>
</template>

<script>
  export default {
    props: {
      onRefresh: {
        type: Function,
        required: true
      }
    }
  };
</script>


