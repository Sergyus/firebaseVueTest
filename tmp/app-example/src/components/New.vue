<template>
  <div>
    <Header/>
    <SideNavigation/>
    <div class="container">
      <notificationError></notificationError>
      <div class="u-mt-medium">
        <div class="row">
          <div class="col-md-6">
            <form v-on:submit.prevent="saveBook">
              <div class="c-field">
                <label class="c-field__label" for="title">Label</label>
                <input class="c-input"
                       id="title"
                       type="text"
                       placeholder="Book Title"
                       v-model="bookTitle">
              </div>
              <div class="u-mt-small">
                <button class="c-btn c-btn--success" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/navigation/Header'
import SideNavigation from '../components/navigation/SideNavigation'

import { NOTIFY_ERROR_ON } from '../store/notifications/notifications.mutations.type'
import notificationError from '../components/notifications/error'

import { CREATE_BOOK } from '../store/books/books.actions.type'

import UtilityService from '../services/utility.service'

export default {
  name: 'New',
  components: {
    Header,
    SideNavigation,
    notificationError
  },
  data () {
    return {
      bookTitle: ''
    }
  },
  computed: {
  },
  methods: {
    saveBook () {
      const vm = this;
      const bookData = {
        title: vm.bookTitle,
        slug: UtilityService.stringToSlug(vm.bookTitle)
      };
      vm.$store.dispatch(CREATE_BOOK, bookData)
        .then(function () {
          vm.$router.push('/')
        })
        .catch(error => {
          vm.$store.commit(NOTIFY_ERROR_ON, error)
        })
    }
  }
}
</script>
