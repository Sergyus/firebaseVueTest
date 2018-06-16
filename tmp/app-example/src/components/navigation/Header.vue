<template>
  <header class="c-navbar">

    <button class="c-navbar__toggle"
            type="button"
            v-on:click="openSideNavigation">
    </button><!-- // c-navbar__toggle -->

    <a class="c-navbar__brand" href="#!">
      <img :src="ASSES_BASE_URL + '/img/logos/ths-logo-wordmark.svg'" alt="Dashboard's Logo">
    </a><!-- // c-navbar__brand -->

    <!-- Navigation items that will be collapes and toggle in small viewports -->
    <!--<nav class="c-nav collapse" id="main-nav">
      <ul class="c-nav__list">
        <li class="c-nav__item">
          <a class="c-nav__link" href="#!">Events</a>
        </li>
        <li class="c-nav__item">
          <a class="c-nav__link" href="#!">Browse</a>
        </li>
        <li class="c-nav__item">
          <a class="c-nav__link" href="#!">Your Ticket</a>
        </li>
        <li class="c-nav__item">
          <div class="c-field c-field--inline has-icon-right u-hidden-up@tablet">
            <span class="c-field__icon">
              <i class="fa fa-search"></i>
            </span>

            <label class="u-hidden-visually" for="navbar-search-small">Seach</label>
            <input class="c-input" id="navbar-search-small" type="text" placeholder="Search">
          </div>
        </li>
      </ul>
    </nav>-->
    <!-- // Navigation items  -->

    <!-- Login and user options -->
    <div class="u-ml-auto">
      <div v-if="authentication.isAuthenticated">

          <div class="c-avatar c-avatar--xsmall"
               v-show="!logOutDialog">
            <img class="c-avatar__img"
                 :src="authentication.user.photoUrl"
                 :alt="authentication.user.name"
                 v-on:click="openLogoutDialog">
          </div>

          <div v-show="logOutDialog">
            <button class="c-btn c-btn--info"
                    v-on:click="doLogout">Logout</button>
            <button class="c-btn c-btn--info"
                    v-on:click="closeLogoutDialog">Cancel</button>
          </div>

      </div>

      <div v-if="!authentication.isAuthenticated">
        <a class="c-btn c-btn--info"
           href="http://login-prod.socialplatform.mainprospect">Login</a>
      </div>
    </div>

  </header>
</template>

<script>
import { ASSES_BASE_URL } from '@/config/config'
import { LOGOUT } from '@/store/authentication/authentication.actions.type'
import {
  SIDENAVIGATION_OPEN,
  SIDENAVIGATION_CLOSE,
  LOGOUT_OPEN,
  LOGOUT_CLOSE
} from '@/store/navigation/navigation.mutations.type'

export default {
  name: 'Header',
  data () {
    return {
      ASSES_BASE_URL: ASSES_BASE_URL
    }
  },
  computed: {
    authentication () {
      return this.$store.state.authentication
    },
    logOutDialog () {
      return this.$store.state.navigation.logOutDialog
    }
  },
  methods: {
    openSideNavigation () {
      this.$store.commit(SIDENAVIGATION_OPEN)
    },
    closeSideNavigation () {
      this.$store.commit(SIDENAVIGATION_CLOSE)
    },
    openLogoutDialog () {
      this.$store.commit(LOGOUT_OPEN)
    },
    closeLogoutDialog () {
      this.$store.commit(LOGOUT_CLOSE)
    },
    doLogout () {
      this.$store.dispatch(LOGOUT)
    }
  }
}
</script>
