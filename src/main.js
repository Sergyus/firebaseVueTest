import Vue from 'vue';
import App from './App';
import router from './router';
import pnprogress from './router/nprogress'
import filters from './filters/filters';
import VueFire from 'vuefire';
<<<<<<< HEAD
import 'firebase/auth';
import wysiwyg from "vue-wysiwyg";
// https://github.com/chmln/vue-wysiwyg

=======
>>>>>>> 11f381d0b39f321a44c7db14e8692d85be66a369

Vue.use(VueFire);
Vue.use(wysiwyg,{
  hideModules: {
    "image": true,
    "code": true,
  }
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
