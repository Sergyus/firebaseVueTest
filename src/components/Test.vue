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
                <input type="text" class="form-control" v-model="newBook.name"/>
              </div>
              <div class="form-group">
                <label>Book Price:</label>
                <input type="text" class="form-control" v-model="newBook.price"/>
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
            <th colspan="2">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="book of books" :key="book['.key']">
            <td>{{ book.name }}</td>
            <td>{{ book.price }}</td>
            <td>
              <!--<router-link :to="{ name: 'Test', params: {id: book['.key']} }" class="btn btn-warning">-->
              <!--Edit-->
              <!--</router-link>-->
              <button @click="delBook(book['.key'])" class="btn btn-danger">Delete</button>
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
  import MainMenu from './main-menu'
  export default {
    name: "Test",
    components: { MainMenu },
    data () {
      return {
        newBook: {
          name: '',
          price: ''
        },
        books: []
      }
    },
    firebase: {
      books: FBS.getBooks()
    },
    mounted() {
      this.test()
    },
    methods: {
      test(){
      },
      addBook() {
        FBS.createBooks({
          name: this.newBook.name,
          price: this.newBook.price
        }).then(() => {
          this.newBook.name = '';
          this.newBook.price = '';
        }).catch(error => {
          console.log(error);
        });
      },
      delBook(key) {
        FBS.deleteBook(key)
      }
    }
  }
</script>
