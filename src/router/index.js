import Vue from 'vue';
import Router from 'vue-router';
import dashboard from '../components/dashboard/dashboard';
import books from '../components/books/books';
import book from '../components/book/book';
import Test from '../components/Test';
import Login from '../components/Login';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'books', component: books },
    { path: '/book/:id', name: 'book', component: book },
    { path: '/test', name: 'Test', component: Test },
    { path: '/login', name: 'Login ', component: Login },
    { path: '/dashboard', name: 'dashboard ', component: dashboard },
  ]
})
