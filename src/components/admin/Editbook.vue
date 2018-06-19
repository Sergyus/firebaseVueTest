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
    data() {
      return {
        books: [],
        bookId: null,
      }
    },
    created() {
      this.bookId = this.$route.params.key;
    },

    // Todo: EXEMPLE

    // https://appdividend.com/2018/04/21/vue-firebase-crud-example/#Step_11_Update_the_data_to_the_Firebase
    updateItem() {
      this.$firebaseRefs.items.child(this.$route.params.id).set(this.newItem);
      this.$router.push('/index')
    },
    firebase: {
      books: booksRef
    },
    methods: {

    }
  }
</script>

<style>

</style>
