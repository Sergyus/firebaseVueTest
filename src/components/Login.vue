<template>
  <section>

    <div class="o-page__card" v-if="!user">
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
          <button @click="signOut" class="c-btn c-btn--info" type="submit">Sign Out</button>
        </div>
      </div>
      
  </section>
</template>

<script>
  import firebase from 'firebase/app';
  import '../assets/styles/dashboard.min.css';
  export default {
    beforeCreate: function() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
        }
      })
    },
    data: function() {
      return {
        user: null,
        email: "sergey.misurko@gmail.com",
        password: "Aa1234567_"
      };
    },
    methods: {
      signIn: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          user => {
            //this.$router.replace('admin');
          },
          error => {
            alert(error.message);
          }
        );
      },
      signOut: function() {
        firebase.auth().signOut().then(() => {
          this.user = null
        }).catch(err => console.log(error))
      },
    }
  };
</script>
