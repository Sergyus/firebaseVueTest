<template>
  <section class="books">

    <div class="o-page__card" v-if="!isLoggedIn">
      <div class="c-card u-mb-xsmall">
        <header class="c-card__header u-pt-large">
          <h1 class="u-h3 u-text-center u-mb-zero">Welcome back! Please login.</h1>
        </header>

        <form class="c-card__body" v-on:submit.prevent>
          <div class="c-field u-mb-small">
            <label class="c-field__label" for="input1">Log in with your e-mail address</label>
            <input v-model="email" class="c-input" type="email" id="input1" placeholder="example@mail.com">
          </div>

          <div class="c-field u-mb-small">
            <label class="c-field__label" for="input2">Password</label>
            <input v-model="password" class="c-input" type="password" id="input2" placeholder="Your password">
          </div>

          <button @click="signIn" class="c-btn c-btn--info c-btn--fullwidth" type="submit">Sign in to Dashboard</button>
        </form>
      </div>
    </div>

    <div class="o-page__card" v-else>
      <div class="c-card u-mb-xsmall u-text-center">
        <header class="c-card__header u-pt-large">
          <h1 class="u-h3 u-mb-zero">You are logged in</h1>
        </header>
        <router-link to="admin" class="c-btn c-btn--info">Admin</router-link>
      </div>
    </div>

  </section>
</template>

<script>
  import FBS from '../firebase/service';
  import {mapGetters} from 'vuex';
  export default {
    data() {
      return {
        email: "sergey.misurko@gmail.com",
        password: "Aa1234567_"
      };
    },
    computed: {
      ...mapGetters([
        'user',
        'isLoggedIn'
      ]),
    },
    methods: {
      signIn() {
        FBS.signIn({
          email: this.email,
          password: this.password
        }).then(() => {
          this.$router.replace('admin/books');
        }, error => {
          alert(error.message);
        })
      },
    }
  };
</script>
