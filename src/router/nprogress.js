import router from './index';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import '../../node_modules/nprogress/nprogress.css';

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
});

router.afterEach(() => {
  NProgress.done()
});
