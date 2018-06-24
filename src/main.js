import Vue from 'vue';
import App from './App';
import router from './router';
import pnprogress from './router/nprogress';
import filters from './filters/filters';
import VueFire from 'vuefire';
import './assets/styles/main.min.css';
import store from './store';
import {CHECK_AUTH} from "./store/authentication/authentication.actions.type";
import {GET_BOOKS} from "./store/books/books.actions.type";
import './toastr/index';

Vue.use(VueFire);

Vue.config.productionTip = false;

store.dispatch(CHECK_AUTH);
store.dispatch(GET_BOOKS);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
