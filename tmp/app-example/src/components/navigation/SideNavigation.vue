<template>
  <div>
    <div v-bind:class="['u-overlay', (sideNavigationState) ? 'active' : '']"
         v-on:click="closeSideNavigation"></div>
    <div v-bind:class="['c-side-navigation', (sideNavigationState) ? 'active' : '']">

      <div class="c-side-navigation__head">
        <a class="c-side-navigation__brand" href="#!">
          <img :src="ASSES_BASE_URL + '/img/logos/ths-logo-wordmark.svg'" alt="Dashboard's Logo">
        </a><!-- // c-side-navigation__brand -->
      </div><!-- ./c-side-navigation__head -->

      <div class="c-side-navigation__first">
        <div class="c-side-navigation__links-wrapper">
          <a href="#">Rolex</a>
          <a href="#">Omega</a>
          <a href="#">Breitling</a>
          <a href="#">Oris</a>
          <a href="#">Tissot</a>
        </div>
      </div><!-- ./c-side-navigation__first -->

      <div class="c-side-navigation__second">
        <a href="#">About Us</a>
        <a href="#">Contribute</a>
        <a href="#">Team</a>
        <a href="#">FAQ</a>
        <a href="#">Contact</a>
      </div><!-- c-side-navigation__second -->

      <div class="c-side-navigation__footer text-right">
        <div class="c-side-navigation__close"
             v-on:click="closeSideNavigation"></div>
      </div>

    </div><!-- ./c-side-navigation -->
  </div>
</template>

<script>
import { ASSES_BASE_URL } from '@/config/config'
import { SIDENAVIGATION_CLOSE } from '@/store/navigation/navigation.mutations.type'

export default {
  name: 'SideNavigation',
  data () {
    return {
      ASSES_BASE_URL: ASSES_BASE_URL
    }
  },
  computed: {
    sideNavigationState () {
      return this.$store.state.navigation.sideNavigation
    }
  },
  methods: {
    closeSideNavigation () {
      this.$store.commit(SIDENAVIGATION_CLOSE)
    }
  }
}
</script>
