<template>
  <div>
    <Header/>
    <SideNavigation/>
    <div class="container">
      <notificationError></notificationError>
      <div class="u-mt-medium">
        <div class="row">
          <div class="col-md-4" v-for="book in books" :key="book.id">

            <div class="c-project-card u-mb-medium">
              <router-link :to="{ name: 'edit', params: {slug: book.slug } }">
                <img class="c-project-card__img" :src="book.coverUrl" alt="About the image">
              </router-link>

              <div class="c-project-card__content">
                <div class="c-project-card__head">
                  <h4 class="c-project-card__title">{{ book.title }}</h4>
                  <p class="c-project-card__info">By&nbsp;{{ book.author }}</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/navigation/Header'
import SideNavigation from '../components/navigation/SideNavigation'
import FireBaseService from '../services/firebase.service'

import { NOTIFY_ERROR_ON } from '@/store/notifications/notifications.mutations.type'
import notificationError from '@/components/notifications/error'

export default {
  name: 'Index',
  components: {
    Header,
    SideNavigation,
    notificationError
  },
  data () {
    return {
      books: []
    }
  },
  created () {
    this.getBooks()
  },
  methods: {
    getBooks () {
      const vm = this
      FireBaseService.getBooks()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const book = {
              'id': doc.id,
              'slug': doc.data().slug,
              'coverUrl': doc.data().coverUrl,
              'title': doc.data().title,
              'author': doc.data().author
            }
            vm.books.push(book)
          })
        })
        .catch(error => {
          vm.$store.commit(NOTIFY_ERROR_ON, ' Error: Was unable to fetch books.')
          console.log(error)
        })
    }
  }
}
</script>
