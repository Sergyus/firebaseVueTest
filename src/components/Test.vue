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

            <form v-on:submit.prevent="sendForm">
              <div class="form-group">
                <label>Book Name:</label>
                <input type="text" class="form-control" v-model="newBook.name" :required="!edit.status"/>
              </div>
              <div class="form-group">
                <label>Book Price:</label>
                <input type="text" class="form-control" v-model="newBook.price" :required="!edit.status"/>
              </div>
              <div class="form-group">
                <input type="file" @change="onFileSelected" accept="image/jpeg,image/png" v-if="uploadReady" :required="!edit.status" />
              </div>
              <div class="form-group">
                <input v-if="!edit.status" type="submit" class="btn btn-primary" value="Add Book"/>
                <template v-else>
                  <div style="display: flex; justify-content: space-around">
                    <a @click.prevent="clearInputs" href="#" class="btn btn-secondary">Cancel</a>
                    <input type="submit" class="btn btn-success" value="Save Book"/>
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
            <td v-if="book.image"><img :src="book.image.url" alt="" style="width: 100px;height: 50px;object-fit: cover"></td>
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
        },
        imageFile: '',
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
      sendForm() {
        if(this.edit.status) {
          this._saveBook();
        } else {
          this._createBook();
        }
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
          form: {...this.newBook},
          file: this.imageFile,
          edit: this.edit,
        })
          .then(() => {
            this.clearInputs();
            this.$toast.success({
              title: 'Success',
              message: 'Книга Обновлена!'
            });
          })
          .catch(error => {
            console.log(error);
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
        this.createBook({
          data: {...this.newBook},
          file: this.imageFile,
        })
          .then(() => {
            this.clearInputs();
            this.$toast.success({
              title:'Success',
              message:'Книга Добавлена!'
            })
          })
          .catch(error => {
            console.log(error);
          });
      },
      onFileSelected(even) {
        this.imageFile = even.target.files[0];
      },
      clearInputs() {
        for(let key  in this.newBook) {
          this.newBook[key] = ''
        }
        this.imageFile = '';
        this.uploadReady = false;
        this.$nextTick(() => {
          this.uploadReady = true;
        });
        this.edit.status = false;
      },
    }
  }
</script>
