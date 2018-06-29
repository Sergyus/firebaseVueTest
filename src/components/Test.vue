<template>
  <div class="container books">

    <main-menu/>

    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3>Add Book</h3>
          </div>
          <div class="card-body">

            <form v-on:submit.prevent="_createBook">
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
                <input v-if="!edit.status" type="submit" class="btn btn-primary" value="Add Book"/>
                <template v-else>
                  <div style="display: flex; justify-content: space-around">
                    <button class="btn btn-secondary" @click="clearInputs">Cancel</button>
                    <input @click="_saveBook" class="btn btn-success" value="Save Book"/>
                  </div>
                </template>
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
            <th>Name</th>
            <th>Price</th>
            <th>Cover</th>
            <th colspan="2">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="book of getAllBooks" :key="book['.key']">
            <td>{{ book.name }}</td>
            <td>{{ book.price }}</td>
            <td><img :src="book.image.url" alt=""></td>
            <td>
              <button @click="_editBook(book)" class="btn btn-warning">Edit</button>
              <button @click="_delBook(book['.key'], book.image.name)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import MainMenu from './main-menu';
  import {mapActions, mapGetters} from 'vuex';

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
        uploadReady: true,
        edit: {
          status: false,
          key: '',
          image: {
            name: '',
            url: '',
          },
        },
      }
    },
    mounted() {
      this.test();
    },
    computed: {
      ...mapGetters([
        'getAllBooks',
      ]),
    },
    methods: {
      ...mapActions([
        'createBook',
        'updateBook',
        'deleteBook',
      ]),
      test() {
        //console.log(this);
      },
      _editBook(book) {
        this.newBook.name = book.name;
        this.newBook.price = book.price;
        this.edit.key = book['.key'];
        this.edit.image.name = book.image.name;
        this.edit.image.url = book.image.url;
        this.edit.status = true;
      },
      _saveBook() {
        this.updateBook({
          edit: this.edit,
          form: this.newBook
        })
          .then(() => {
            this.clearInputs();
            this.$toast.success({
              title: 'Success',
              message: 'Книга Обновлена!'
            });
          });
      },
      _delBook(key, filename) {
        this.deleteBook({key, filename});
        this.$toast.success({
          title:'Success',
          message:'Книга удалена!'
        });
      },
      _createBook() {
        let newBook = {
          name: this.newBook.name,
          price: this.newBook.price,
          file: this.newBook.file
        };
        this.createBook(newBook)
          .then(() => {
            this.clearInputs();
            this.$toast.success({
              title:'Success',
              message:'Книга бодавлена!'
            })
          })
          .catch(error => {
            console.log(error);
          });
      },
      onFileSelected(even) {
        this.newBook.file = even.target.files[0];
      },
      clearInputs() {
        this.newBook.name = '';
        this.newBook.price = '';
        this.newBook.file = '';
        this.uploadReady = false;
        this.$nextTick(() => {
          this.uploadReady = true;
        });
        this.edit.status = false;
      },
    }
  }
</script>
