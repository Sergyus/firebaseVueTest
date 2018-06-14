import Vue from 'vue';
import App from './App';
import router from './router';
import pnprogress from './router/nprogress'
import filters from './filters/filters';
import firebase from './firebase';
import VueFire from 'vuefire';

Vue.use(VueFire);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
