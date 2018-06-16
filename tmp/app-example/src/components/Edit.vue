<template>
  <div>
    <Header/>
    <SideNavigation/>
    <div class="container">
      <notificationError></notificationError>
      <div class="u-mt-medium">
        <div class="row">
          <div class="col-md-6">
            <input type="file" @change="onFileSelected">
            <button @click="onFileUpload">Upload</button>
          </div>
          <div class="col-md-6">
            <form v-on:submit.prevent="updateBook">

              <div class="c-field">
                <label class="c-field__label" for="title">Book Title</label>
                <input class="c-input"
                       id="title"
                       type="text"
                       placeholder="Book Title"
                       v-model="currentBookData.title">
              </div><!-- ./c-field -->

              <div class="c-field u-mt-xsmall">
                <label class="c-field__label" for="author">Book Author</label>
                <input class="c-input"
                       id="author"
                       type="text"
                       placeholder="Author"
                       v-model="currentBookData.author">
              </div><!-- ./c-field -->

              <div class="u-mt-small">
                <button class="c-btn c-btn--success" type="submit">Update</button>
                <router-link class="c-btn c-btn--secondary" to="/">Cancel</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/navigation/Header'
import SideNavigation from '@/components/navigation/SideNavigation'

import { NOTIFY_ERROR_ON } from '@/store/notifications/notifications.mutations.type'
import notificationError from '@/components/notifications/error'

import FireBaseService from '@/services/firebase.service'
import UtilityService from '@/services/utility.service'

export default {
  name: 'Edit',
  components: {
    Header,
    SideNavigation,
    notificationError
  },
  data () {
    return {
      currentBookSlug: this.$route.params.slug,
      currentBookData: [],
      fileSelected: ''
    }
  },
  created () {
    this.getBook()
  },
  methods: {
    getBook () {
      const vm = this
      FireBaseService.getBook(vm.currentBookSlug)
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const book = {
              'id': doc.id,
              'slug': doc.data().slug,
              'title': doc.data().title,
              'author': doc.data().author,
              'coverUrl': doc.data().coverUrl
            }
            vm.currentBookData = book
          })
        })
        .catch(error => {
          vm.$store.commit(NOTIFY_ERROR_ON, ' Error: Was unable to fetch the book.')
          console.log(error)
        })
    },
    updateBook () {
      const vm = this
      const updatedBookData = {
        title: vm.currentBookData.title,
        slug: UtilityService.stringToSlug(vm.currentBookData.title),
        author: vm.currentBookData.author,
        coverUrl: vm.currentBookData.coverUrl
      }

      FireBaseService.getBook(vm.currentBookSlug)
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update(updatedBookData)
              .then(() => {
                vm.$router.push('/')
              })
              .catch(error => {
                vm.$store.commit(NOTIFY_ERROR_ON, ' Error: Was unable to update the book.')
                console.log(error)
              })
          })
        })
    },
    onFileSelected (even) {
      const vm = this
      vm.fileSelected = event.target.files[0]
    },
    onFileUpload () {
      const vm = this
      const file = vm.fileSelected
      const name = (+new Date()) + '-' + vm.currentBookData.slug
      const metadata = {
        contentType: file.type
      }
      const coverFile = {
        file: file,
        name: name,
        metadata: metadata
      }
      FireBaseService.uploadCover(coverFile)
        .then((snapshot) => {
          const coverUrl = snapshot.downloadURL
          vm.currentBookData.coverUrl = coverUrl
          vm.updateBook()
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
