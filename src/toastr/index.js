import Vue from 'vue';
import CxltToastr from 'cxlt-vue2-toastr';
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css';

Vue.use(CxltToastr, {
  position: 'top right',
  showMethod: 'fadeInRight',
  hideMethod: 'fadeOutRight',
  showDuration: 1000,
  timeOut: 3000
});
