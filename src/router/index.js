import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import books from '@/components/books'
import book from '@/components/book'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'books',
      component: books
    },
    {
      path: '/book/:id',
      name: 'book',
      component: book
    },
  ]
})
