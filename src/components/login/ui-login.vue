<template>
  <section class="o-page o-page--center">
    <div class="o-page__card">
      <div class="c-card u-mb-xsmall">
        <header class="c-card__header u-pt-large">
          <router-link to="/" class="c-card__icon">
            <!--<img :src="logo" alt="Dashboard UI Kit">-->
            <img src="../../assets/img/logo-login.svg" alt="Dashboard UI Kit">
          </router-link>
          <h1 class="u-h3 u-text-center u-mb-zero">Welcome back! Please login.</h1>
        </header>

        <form class="c-card__body">
          <div class="c-field u-mb-small">
            <label class="c-field__label" for="input1">Log in with your e-mail address</label>
            <input class="c-input" type="email" id="input1" placeholder="clark@dashboard.com">
          </div>

          <div class="c-field u-mb-small">
            <label class="c-field__label" for="input2">Password</label>
            <input class="c-input" type="password" id="input2" placeholder="Numbers, Letters...">
          </div>

          <button class="c-btn c-btn--info c-btn--fullwidth" type="submit">Sign in to Dashboard</button>

          <span class="c-divider c-divider--small has-text u-mv-medium">Login via social networks</span>

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
        <a class="u-text-mute u-text-small" href="register.html">Don’t have an account yet? Get Started</a>
        <a class="u-text-mute u-text-small" href="forgot-password.html">Forgot Password?</a>
      </div>

    </div>
  </section>
</template>

<script>
  export default {
    name: "ui-login",
    data () {
      return {
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
