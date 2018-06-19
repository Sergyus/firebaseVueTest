<template>
  <!--<div class="row">-->
  <!--<wysiwyg v-model="wsw"/>-->
  <!--</div>-->
  <div>
    <h1>EDIT BOOK</h1>
    <h2>book key: {{ bookId }}</h2>
    <div>
      <a @click="$router.go(-1)" href="#!" class="c-btn c-btn--danger u-mr-small">Go back</a>
    </div>
    

  </div><!-- // .row -->
</template>

<script>
  import { booksRef } from '../../firebase/firebase';

  export default {
    name: "editbook",
    data () {
      return {
        items: [],
        bookId: "NULL",
      }
    },
    created() {
      this.bookId = this.$route.params.key;
    },
    firebase: {
      items: booksRef
    },
    methods: {
      
    }
  }
</script>

<style>

</style>
