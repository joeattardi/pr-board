<template>
  <div class="auto-refresh">
    <input id="auto-refresh-checkbox" type="checkbox" v-model="enabled" />
    <label for="auto-refresh-checkbox">Auto-refresh every</label>
    <select :disabled="!enabled" v-model="autoRefreshInterval">
      <option>5</option>
      <option>10</option>
      <option>30</option>
      <option>60</option>
    </select>
    minutes
  </div>
</template>

<script>
  export default {
    data() {
      return {
        enabled: false,
        autoRefreshInterval: 5,
        interval: null
      };
    },
    methods: {
      clearInterval() {
        if (this.interval) {
          clearInterval(this.interval);
          this.interval = null;
        }
      }
    },
    watch: {
      autoRefreshInterval(newAutoRefreshInterval) {
        this.clearInterval();
        this.interval = setInterval(this.onRefresh, newAutoRefreshInterval * 1000 * 60);
      },

      enabled(newEnabled) {
        this.clearInterval();

        if (newEnabled) {
           this.interval = setInterval(this.onRefresh, this.autoRefreshInterval * 1000 * 60); 
        }
      }
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
  .auto-refresh {
    align-self: center;
  }
</style>
