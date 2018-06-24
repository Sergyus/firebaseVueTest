import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/authentication/Login'
import Register from '../components/authentication/Register'
import Index from '../components/Index'
import New from '../components/New'
import Edit from '../components/Edit'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
      // meta: { guest: true }
    },
    {
      path: '/new',
      name: 'new',
      component: New,
      meta: { auth: true }
    },
    {
      path: '/edit/:slug',
      name: 'edit',
      component: Edit,
      meta: { auth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { guest: true }
    },
    {
      // path: '/register',
      // name: 'Register',
      // component: Register,
      // meta: { guest: true }
    }
  ]
})
