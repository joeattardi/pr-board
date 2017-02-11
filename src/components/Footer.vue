<template>
  <footer>
    <div>
      PR Board {{ version }} - Created by <a href="http://www.thinksincode.com/">Joe Attardi</a>
    </div>
    <div>
      Code licensed under the <a href="https://github.com/joeattardi/pr-board/blob/master/LICENSE">MIT license</a> - 
      <a href="https://github.com/joeattardi/pr-board">GitHub project</a></div>
  </footer>
</template>

<script>
  import pkg from '../../package.json';

  export default {
    computed: {
      version() {
        return pkg.version;
      }
    }
  };
</script>

<style lang="sass">
  footer {
    padding: 0.5em;
    text-align: center;
    font-size: 0.8em;
    background-color: #EEEEEE;
    color: #666666;
    border-top: 1px solid #CCCCCC;

    a {
      color: #333333;
      font-weight: bold;
      text-decoration: none;
    }
  }
</style>
