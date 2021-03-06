import Vue from 'vue';
import Router from 'vue-router';
import books from '../components/books/books';
import book from '../components/book/book';
import Test from '../components/Test';
import Login from '../components/Login';
import Admin from '../components/admin/Admin';
import Dashboard from '../components/admin/Dashboard';
import AllBooks from '../components/admin/Books';
import EditBook from '../components/admin/Editbook';
import AddBook from '../components/admin/Addbook';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'books', component: books },
    { path: '/book/:id', name: 'book', component: book },
    { path: '/test', name: 'Test', component: Test },
    { path: '/login', name: 'Login', component: Login },
    { path: '/admin', name: 'Admin', component: Admin,
      children: [
        { path: 'dashboard', name: 'dashboard', component: Dashboard },
        { path: 'books', name: 'Books', component: AllBooks },
        { path: 'edit/:key', name:"edit", component: EditBook },
        { path: 'add', name:"add", component: AddBook },
      ]
    },
  ]
})
