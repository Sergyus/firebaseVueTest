import Vue from 'vue';
import App from './App';
import router from './router';
import pnprogress from './router/nprogress';
import filters from './filters/filters';
import store from './store';
import {CHECK_AUTH} from "./store/authentication/authentication.actions.type";
import {INIT_BOOKS} from "./store/books/books.actions.type";
// import VueFire from 'vuefire';
import './assets/styles/main.min.css';
import './toastr/index';

// Vue.use(VueFire);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    store.dispatch(CHECK_AUTH);
    store.dispatch(INIT_BOOKS);
  },
  render: h => h(App),
}).$mount('#app');
