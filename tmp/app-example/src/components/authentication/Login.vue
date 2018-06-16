<template>
  <div class="o-page o-page--center">
    <div class="o-page__card">
      <div class="c-card u-mb-xsmall">

        <header class="c-card__header u-pt-large">
          <a class="c-card__icon" href="#!">
            <img :src="ASSES_BASE_URL + '/img/logo-login.svg'" alt="Dashboard UI Kit">
          </a>
          <h1 class="u-h3 u-text-center u-mb-zero">Welcome back! Please login.</h1>
        </header>

        <form class="c-card__body u-pt-zero" v-on:submit.prevent="login">

          <notificationError></notificationError>

          <div class="c-field u-mv-small">
            <label class="c-field__label" for="email">Log in with your e-mail address</label>
            <input class="c-input"
                   id="email"
                   type="email"
                   placeholder="clark@dashboard.com"
                   v-model="email"
                   autocomplete="email">
          </div>

          <div class="c-field u-mb-small">
            <label class="c-field__label" for="password">Password</label>
            <input class="c-input"
                   id="password"
                   type="password"
                   placeholder="Numbers, Letters..."
                   v-model="password"
                   autocomplete="off">
          </div>

          <button class="c-btn c-btn--info c-btn--fullwidth"
                  typy="submit">Sign in to Dashboard
          </button>

          <span class="c-divider c-divider--small has-text u-mv-medium">
            Login via social networks
          </span>

          <div class="o-line">
            <a class="c-icon u-bg-twitter" href="#!">
              <i class="fa fa-twitter"></i>
            </a>

            <a class="c-icon u-bg-facebook" href="#!">
              <i class="fa fa-facebook"></i>
            </a>

            <a class="c-icon u-bg-pinterest" href="#!">
              <i class="fa fa-pinterest"></i>
            </a>

            <a class="c-icon u-bg-dribbble" href="#!">
              <i class="fa fa-dribbble"></i>
            </a>
          </div>
        </form>

      </div>

      <div class="o-line">
        <router-link to="register"
                     class="u-text-mute u-text-small">
          Don’t have an account yet? Get Started
        </router-link>
        <a class="u-text-mute u-text-small" href="forgot-password.html">Forgot Password?</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ASSES_BASE_URL } from '@/config/config'
import { LOGIN } from '@/store/authentication/authentication.actions.type'
import { NOTIFY_ALL_OFF, NOTIFY_ERROR_ON } from '@/store/notifications/notifications.mutations.type'

import notificationError from '@/components/notifications/error'

export default {
  name: 'Login',
  components: {
    notificationError
  },
  data () {
    return {
      ASSES_BASE_URL: ASSES_BASE_URL,
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const vm = this

      vm.$store.commit(NOTIFY_ALL_OFF)

      let credentials = {
        email: vm.email,
        password: vm.password
      }

      vm.$store.dispatch(LOGIN, credentials)
        .then(function () {
          window.location.reload()
        })
        .catch(function () {
          vm.$store.commit(NOTIFY_ERROR_ON, 'Wrong Emain/Password')
        })
    }
  }
}
</script>
