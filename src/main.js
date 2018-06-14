import Vue from 'vue';
import App from './App';
import router from './router';
import pnprogress from './router/nprogress'
import filters from './filters/filters';
import firebase from 'firebase/app';
import VueFire from 'vuefire';
import 'firebase/auth';


Vue.use(VueFire);
Vue.config.productionTip = false;

new Vue({
  router,
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$router.push('/success')
      } else {
        this.$router.push('/login')
      }
    });
  },
  render: h => h(App)
}).$mount('#app');


//https://github.com/garethredfern/vue-auth-demo/blob/master/src/components/SignIn.vue
