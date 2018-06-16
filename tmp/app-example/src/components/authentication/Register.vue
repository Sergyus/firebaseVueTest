<template>
  <div class="o-page o-page--center">
    <div class="o-page__card">
      <div class="c-card u-mb-xsmall">
        <header class="c-card__header u-pt-large">
          <a class="c-card__icon" href="#!">
            <img :src="ASSES_BASE_URL + '/img/logo-login.svg'" alt="Dashboard UI Kit">
          </a>
          <h1 class="u-h3 u-text-center u-mb-zero">Sign up to Get Started</h1>
        </header>

        <form class="c-card__body u-pt-zero" v-on:submit.prevent="register">

          <notificationError></notificationError>

          <div class="c-field u-mv-small">
            <label class="c-field__label" for="email">E-mail address</label>
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

          <div class="c-field u-mb-small">
            <label class="c-field__label" for="passwordConfirmation">Confirm Password</label>
            <input class="c-input"
                   id="passwordConfirmation"
                   type="password"
                   placeholder="Confirm Password"
                   v-model="passwordConfirmation"
                   autocomplete="off">
          </div>

          <button class="c-btn c-btn--info c-btn--fullwidth"
                  type="submit">Sign Up</button>

          <span class="c-divider has-text c-divider--small u-mv-medium">Singup via social networks</span>

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
        <router-link to="login"
                     class="u-text-mute u-text-small">
            <i class="fa fa-long-arrow-left u-mr-xsmall"></i>
            Already have an account, login instead
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { ASSES_BASE_URL } from '@/config/config'
import { NOTIFY_ERROR_ON, NOTIFY_ALL_OFF } from '@/store/notifications/notifications.mutations.type'
import { REGISTER } from '@/store/authentication/authentication.actions.type'

import notificationError from '@/components/notifications/error'

export default {
  name: 'Register',
  components: {
    notificationError
  },
  data () {
    return {
      ASSES_BASE_URL: ASSES_BASE_URL,
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  },
  methods: {
    register () {
      const vm = this

      vm.$store.commit(NOTIFY_ALL_OFF)

      if (!vm.passwordsMatch()) {
        vm.$store.commit(NOTIFY_ERROR_ON, 'Password does not match')
        return false
      }

      const credentials = {
        email: vm.email,
        password: vm.password
      }

      vm.$store.dispatch(REGISTER, credentials)
        .then(function () {
          window.location.reload()
        })
        .catch(function (error) {
          vm.$store.commit(NOTIFY_ERROR_ON, error.message)
        })
    },
    passwordsMatch () {
      const vm = this
      if (vm.password === vm.passwordConfirmation) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
