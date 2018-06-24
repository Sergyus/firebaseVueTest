<template>
  <div class="container books">

    <main-menu></main-menu>

    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3>Add Book</h3>
          </div>
          <div class="card-body">

            <form v-on:submit.prevent="addBook">
              <div class="form-group">
                <label>Book Name:</label>
                <input type="text" class="form-control" v-model="newBook.name" required/>
              </div>
              <div class="form-group">
                <label>Book Price:</label>
                <input type="text" class="form-control" v-model="newBook.price" required/>
              </div>
              <div class="form-group">
                <input type="file" @change="onFileSelected" accept="image/jpeg,image/png" v-if="uploadReady" required/>
              </div>
              <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Add Book"/>
              </div>
            </form>

          </div>
        </div>
      </div>

      <div class="col-md-6">
        <h1>List Books</h1>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Cover</th>
            <th colspan="2">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="book of books" :key="book['.key']">
            <td>{{ book.name }}</td>
            <td>{{ book.price }}</td>
            <td><img :src="book.image.url" alt=""></td>
            <td>
              <button @click="delBook(book['.key'], book.image.name)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import FBS from '../firebase/service';
  import MainMenu from './main-menu';
  import store from '../store';
  import {mapGetters, mapActions} from 'vuex';
  import {DELETE_BOOK} from "../store/books/books.actions.type";

  export default {
    name: "Test",
    components: {MainMenu},
    data() {
      return {
        newBook: {
          name: '',
          price: '',
          file: '',
        },
        books: [],
        uploadReady: true,
      }
    },
    firebase: {
      books: FBS.getBooks(),
    },
    mounted() {
      this.test()
    },
    computed: {
    },
    methods: {
      test() {
        //console.log(this.newBook);
      },
      delBook(key, filename) {
        store.dispatch(DELETE_BOOK, {key, filename});
        this.$toast.success({
          title:'Success',
          message:'Книга удалена!'
        })
      },
      addBook() {
        FBS.createBooks({
          name: this.newBook.name,
          price: this.newBook.price,
          file: this.newBook.file
        }).then(() => {
          this.clearInput();
          this.$toast.success({
            title:'Success',
            message:'Книга бодавлена!'
          })
        }).catch(error => {
          console.log(error);
        });
      },
      onFileSelected(even) {
        this.newBook.file = even.target.files[0];
      },
      clearInput() {
        this.newBook.name = '',
        this.newBook.price = '',
        this.newBook.file = '',
        this.uploadReady = false;
        this.$nextTick(() => {
          this.uploadReady = true;
        })
      },
    }
  }
</script>
