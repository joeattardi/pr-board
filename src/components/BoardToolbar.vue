<template>
  <div class="toolbar">
    <auto-refresh-control :onRefresh="onRefresh" />
    <refresh-button :onRefresh="onRefresh" />
    <edit-button :onEdit="onEdit" />
  </div>
</template>

<script>
  import AutoRefreshControl from './AutoRefreshControl.vue';
  import RefreshButton from './RefreshButton.vue';
  import EditButton from './EditButton.vue';

  export default {
    components: {
      AutoRefreshControl,
      RefreshButton,
      EditButton
    },
    props: {
      onRefresh: {
        type: Function,
        required: true
      },
      onEdit: {
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
