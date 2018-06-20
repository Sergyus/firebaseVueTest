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
                <input type="file" @change="onFileSelected">
                <button @click="onFileUpload">Upload</button>
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
            <td>{{ book.cover }}</td>
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
          price: '',
          cover: ''
        },
        books: [],
        uploads: null
      }
    },
    firebase: {
      books: FBS.getBooks(),
    },
    mounted() {
      this.test();
      this._getCover();
    },
    methods: {
      test(){
        //console.log(this.books);
      },
      addBook() {
        FBS.createBooks({
          name: this.newBook.name,
          price: this.newBook.price,
          cover: this.newBook.cover
        }).then(() => {
          this.newBook.name = '';
          this.newBook.price = '';
        }).catch(error => {
          console.log(error);
        });
      },
      onFileSelected(even) {
        // const vm = this;
        this.newBook.cover = event.target.files[0].name;
        // console.log(event.target.files[0].name);
        //vm.fileSelected = event.target.files[0]
      },
      _getCover() {
        FBS.getCover('pic_1.jpg');
        // console.log(FBS.getCover('pic_1.jpg'));
      },
      onFileUpload () {
        const vm = this;
        const file = vm.fileSelected
        const name = (+new Date()) + '-' + vm.currentBookData.slug
        const metadata = {
          contentType: file.type
        };
        const coverFile = {
          file: file,
          name: name,
          metadata: metadata
        };
        // FBS.uploadCover(coverFile)
        //   .then((snapshot) => {
        //     const coverUrl = snapshot.downloadURL
        //     vm.currentBookData.coverUrl = coverUrl
        //     vm.updateBook()
        //   })
        //   .catch((error) => {
        //     console.error(error)
        //   })
      },
      delBook(key) {
        FBS.deleteBook(key)
      }
    }
  }
</script>



<!-- TODO: .limitToLast(25)-->
<!--https://www.npmjs.com/package/vuefire-->
