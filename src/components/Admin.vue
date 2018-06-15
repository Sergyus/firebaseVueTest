<template>
  <div>

    <div v-if="user">
      <h1>Welcome Admin!</h1>
      <button @click="signOut">Sign Out</button>
    </div>

    <login v-else></login>

  </div>
</template>

<script>
  import firebase from 'firebase/app';
  import Login from './Login';
  export default {
    name: "Admin",
    components: { Login },
    beforeCreate: function() {
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
