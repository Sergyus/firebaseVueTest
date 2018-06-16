import Vue from 'vue';
import App from './App';
import router from './router';
import pnprogress from './router/nprogress'
import filters from './filters/filters';
import VueFire from 'vuefire';
import 'firebase/auth';
import wysiwyg from "vue-wysiwyg";

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
