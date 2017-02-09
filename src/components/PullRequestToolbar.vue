<template>
  <div class="toolbar">
    <div class="auto-refresh">
      <input type="checkbox" />
      Auto-refresh every
      <select>
        <option>5</option>
        <option>10</option>
        <option>30</option>
        <option>60</option>
      </select>
      minutes
    </div>
    <button title="Refresh">
      <i class="fa fa-refresh"></i>
    </button>
    <button title="Board Settings">
      <i class="fa fa-cog"></i>
    </button>
  </div>
</template>

<style lang="sass">
  .toolbar {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;

    button {
      margin: 0 0.25em;
    }

    .auto-refresh {
      align-self: center;
    }
  }
</style>
