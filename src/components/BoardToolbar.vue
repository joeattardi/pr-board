<template>
  <div class="toolbar">
    <auto-refresh-control :onRefresh="onRefresh" />
    <refresh-button :onRefresh="onRefresh" />
    <button title="Board Settings">
      <i class="fa fa-cog"></i>
    </button>
  </div>
</template>

<script>
  import AutoRefreshControl from './AutoRefreshControl.vue';
  import RefreshButton from './RefreshButton.vue';

  export default {
    components: {
      AutoRefreshControl,
      RefreshButton
    },
    props: {
      onRefresh: {
        type: Function,
        required: true
      }
    }
  };
</script>

<style lang="sass">
  .toolbar {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;

    button {
      margin: 0 0.25em;
    }

  }
</style>
