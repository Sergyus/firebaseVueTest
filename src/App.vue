<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  // variables
  $c-main: #444;
  $c-accent: #B70000;
  $f-stack: 'Roboto', Helvetica, Arial, sans-serif;
  // eof variables

  #app {
    font-family: $f-stack;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $c-main;
    /*margin-top: 60px;*/

  }

  nav {
    margin-bottom: 30px;
  }

  img {
    max-width: 100%;
  }

  nav {
    text-align: center;
    font-size: 28px;
  }

  .homelink {
    margin: 0 auto;
    color: $c-accent;
    font-weight: 300;
    text-decoration: none;
    text-align: center;
    font-style: italic;

    &.router-link-active {

    }
    &.router-link-exact-active {
      border-bottom: 1px solid currentColor;
    }
  }
</style>
