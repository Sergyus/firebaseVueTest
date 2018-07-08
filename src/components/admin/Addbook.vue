<template>
  <!--<wysiwyg v-model="wsw"/>-->
  <div>
    <h1>Add BOOK</h1>
    <div>
      <a @click="$router.go(-1)" href="#!" class="c-btn c-btn--danger u-mr-small">Go back</a>
      <a href="#" @click.prevent="_saveBook" class="c-btn c-btn--success">Add</a>

      <div>
      <form v-on:submit.prevent="sendForm">
          <div class="form-group">
            <label>Book Name:</label>
            <input type="text" class="form-control" v-model="newBook.name" :required="!edit.status" ref="title"/>
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
          </div>
        </form>
      </div>
    </div>


  </div><!-- // .row -->
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "addbook",
    data() {
      return {
        bookId: '',
        book : "",
        newBook: {
          name: 'test',
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
        currentPage: 0,
        pageSize: 2,
      }
    },
    computed: {
      ...mapGetters([
        'getAllBooks',
      ]),
    },

    created() {
      this.bookId = this.$route.params.key;
      this.books = this.$store.getters.getAllBooks;
      this.book = this.getBookByKey(this.books, this.bookId);
      this._editBook(this.book);

      // this.books = this.$store.state;
    },

    // Todo: EXEMPLE

    // https://appdividend.com/2018/04/21/vue-firebase-crud-example/#Step_11_Update_the_data_to_the_Firebase
    updateItem() {
      this.$firebaseRefs.items.child(this.$route.params.id).set(this.newItem);
      this.$router.push('/index')
    },
    // firebase: {
    //   books: FBS.getBooks()
    // },
    methods: {
      ...mapActions([
        'createBook',
        'updateBook',
        'deleteBook',
      ]),
      getBookByKey(obj, k) {
        return obj.filter(function(o){
          return o['.key'] == k;
        })[0]
      },
      getBooks() {
        return this.$store.state;
      }, 
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
        this.setFocus();
      },
      _saveBook() {
        this.updateBook({
          form: {...this.newBook},
          file: this.imageFile,
          edit: this.edit,
        })
          .then(() => {
            // this.clearInputs();
            // this.$toast.success({
            //   title: 'Success',
            //   message: 'Книга Обновлена!'
            // });
            this.$router.go(-1)
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
      next() {
        this.currentPage++;
        console.log(this.currentPage * this.pageSize);
      },
      onFileSelected(even) {
        this.imageFile = even.target.files[0];
      },
      setFocus() {
        this.$refs.title.focus();
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

<style>

</style>
