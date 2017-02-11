<template>
  <button title="Board Settings" @click.prevent="onEdit">
    <i class="fa fa-cog"></i>
  </button>
</template>

<script>
  export default {
    props: {
      onEdit: {
        type: Function,
        required: true
      }
    }
  };
</script>
