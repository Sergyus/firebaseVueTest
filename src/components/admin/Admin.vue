<template>
  <div>
    <!--[ LOGIN ]-->
    <login v-if="!user"></login>
    <!--<ui-login v-if="!user"></ui-login>-->

    <section class="o-page" v-else>
  <!--[ SIDEBAR ]-->
  <sidebar></sidebar>
  <main class="o-page__content">
    <header class="c-navbar u-mb-medium">
    <button class="c-sidebar-toggle js-sidebar-toggle">
    <span class="c-sidebar-toggle__bar"></span>
    <span class="c-sidebar-toggle__bar"></span>
    <span class="c-sidebar-toggle__bar"></span>
    </button>
    <h2 class="c-navbar__title u-mr-auto">{{user.email}}</h2>
  <a href="#!" @click.prevent="signOut" class="c-btn c-btn--success u-mr-small">Logout</a>
    </header>
    <div class="container">

    {{$route.name}}

  <dashboard/>
  <all-books/>

  </div>
  </main>
  </section>
  </div>
  </template>

  <script>
  import firebase from 'firebase/app';
  import Login from '../Login';
  import UiLogin from '../login/ui-login';
  import 'vue-wysiwyg/dist/vueWysiwyg.css';
  import Sidebar from './Sidebar';
  import Dashboard from './Dashboard';
  import AllBooks from './AllBooks';

  export default {
    name: "Admin",
    wsw: '<p>test</p>',
    components: {Login, UiLogin, Sidebar, Dashboard, AllBooks},
    beforeCreate: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user
        }
      })
    },
    data() {
      return {
        user: null,
      }
    },
    methods: {
      signOut() {
        firebase.auth().signOut().then(() => {
          this.user = null;
        }).catch(err => console.log(error))
      },
    },
  }
</script>

<style scoped>

</style>

<!--https://forum.vuejs.org/t/dynamic-components-with-dynamic-imports/20703/3-->
