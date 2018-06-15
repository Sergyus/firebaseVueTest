<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-one-third">
          <div class="card">

            <div class="card-header is-centered">
              <h2 class="card-header-title is-centered" v-if="!user">Sign in to Your Account</h2>
              <div v-else>
                <h2 class="card-header-title is-centered">You are logged in</h2>
                <button @click="signOut">Sign Out</button>
              </div>
            </div>

            <div class="card-content" v-if="!user">
              <form v-on:submit.prevent>
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input class="input" type="email" placeholder="email" v-model="email">
                  </div>
                </div>
                <div class="field">
                  <label class="label">Password Aa1234567_</label>
                  <div class="control">
                    <input class="input" type="password" v-model="password">
                  </div>
                </div>
                <button type="submit" class="button is-primary" v-on:click="signIn">Sign-in</button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>

  </section>
</template>

<script>
  import firebase from 'firebase/app';
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
        password: ""
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

