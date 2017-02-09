<template>
  <div>
    <h1>My Boards</h1>
    <button @click.prevent="addBoard">
      <i class="fa fa-plus" aria-hidden="true"></i>
      Add New Board
    </button>
  </div>
</template>

<script>
  export default {
    methods: {
      addBoard() {
        this.$router.push('/boards/new');
      }
    }
  };
</script>
