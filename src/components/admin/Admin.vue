<template>
  <div>
    <login v-cloak v-if="!isLoggedIn"></login>

    <section class="o-page" v-else>
      <sidebar></sidebar>
      <main class="o-page__content">

        <header class="c-navbar u-mb-medium">
          <button class="c-sidebar-toggle js-sidebar-toggle">
          <span class="c-sidebar-toggle__bar"></span>
          <span class="c-sidebar-toggle__bar"></span>
          <span class="c-sidebar-toggle__bar"></span>
          </button>
          <h2 class="c-navbar__title u-mr-auto">{{user.name}}</h2>
          <a href="#" @click.prevent="logout" class="c-btn c-btn--success u-mr-small">Logout</a>
        </header>

        <div class="container">
          <router-view/>
        </div>

      </main>
  </section>
  </div>
</template>

<script>
  import Login from '../Login';
  // import 'vue-wysiwyg/dist/vueWysiwyg.css';
  import Sidebar from './Sidebar';
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "Admin",
    // wsw: '<p>test</p>',
    components: {Login, Sidebar,},
    computed: {
      ...mapGetters([
        'user',
        'isLoggedIn'
      ]),
    },
    mounted() {
      this.test()
    },
    methods: {
      ...mapActions([
        'logout'
      ]),
      test() {
        //console.log(this);
      },
    },
  }
</script>

<style scoped>
  [v-cloak] {display: none}
</style>

<!--https://forum.vuejs.org/t/dynamic-components-with-dynamic-imports/20703/3-->
