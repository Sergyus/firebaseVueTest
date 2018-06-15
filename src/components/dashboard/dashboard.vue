<template>
  <div class="dashboard">
    <wysiwyg v-model="content" />
  </div>
</template>

<script>
  import axios from 'axios';
  import '../../assets/styles/dashboard.min.css';
  import 'vue-wysiwyg/dist/vueWysiwyg.css'

  export default {
    name: 'dashboard',
    data() {
      return {
        books: [],
        content: '<p>test</p>'
      }
    },
    created() {
      axios.get("http://localhost:8080/static/books.json")
        .then(response => {
          this.books = response.data.books;
        })
        .catch(e => {
          console.log(e);
        })
    }
  }
</script>

<style lang="scss">
  
</style>