<template>
  <div>
    <h1 style="margin-bottom: 30px;">Books</h1>
    <div class="row u-mb-large">

      <div class="col-md-12">
        <a href="#" @click.prevent="" class="c-btn c-btn--success u-mb-small">Add book</a>
      </div>
      
      <div class="col-md-12">
        <div class="c-table-responsive@wide">
          <table class="c-table">
            <!-- <caption class="c-table__title">
                Invoices
            </caption> -->
            <thead class="c-table__head c-table__head--slim">
            <tr class="c-table__row">
              <th class="c-table__cell c-table__cell--head">Cover</th>
              <th class="c-table__cell c-table__cell--head">Title</th>
              <th class="c-table__cell c-table__cell--head">Price</th>
              <th class="c-table__cell c-table__cell--head">Actions</th>
              <!-- <th class="c-table__cell c-table__cell--head">
                <span class="u-hidden-visually">Actions</span>
              </th> -->
            </tr>
            </thead>

            <tbody>
            <tr class="c-table__row" v-for="book of getAllBooks" :key="book['.key']">
              <td class="c-table__cell">
                <img :src="book.image.url" class="book-cover" alt="">
              </td>
              <td class="c-table__cell">
                <span>{{ book.name }}</span>
              </td>
              <td class="c-table__cell">
                <span>{{ book.price }}</span>
              </td>
              <td class="c-table__cell">
                <!-- <a href="#!" class="c-btn c-btn--warning u-mr-small">Edit</a> -->
                <router-link :to="{name: 'edit', params: {key:book['.key']} }" class="c-btn c-btn--warning u-mr-small">
                  Edit
                </router-link>

                <button @click="_delBook(book['.key'], book.image.name)" class="c-btn c-btn--danger u-mr-small">Delete</button>
              </td>

            </tr>
            <!-- <tr class="c-table__row">
              <td class="c-table__cell"><span class="u-text-mute">00450</span></td>
              <td class="c-table__cell">Design Works</td>
              <td class="c-table__cell">
                <span class="u-text-mute">Carlson Limited</span>
              </td>
              <td class="c-table__cell">
                <span class="u-text-mute">87956621</span>
              </td>
              <td class="c-table__cell">
                <span class="u-text-mute">15 Dec 2017</span>
              </td>
              <td class="c-table__cell">
                <span class="c-badge c-badge--small c-badge--success">Paid</span>
              </td>
              <td class="c-table__cell">$887</td>
            </tr>

            <tr class="c-table__row">
              <td class="c-table__cell"><span class="u-text-mute">00450</span></td>
              <td class="c-table__cell">UX Wireframes</td>
              <td class="c-table__cell">
                <span class="u-text-mute">Adobe</span>
              </td>
              <td class="c-table__cell">
                <span class="u-text-mute">87956421</span>
              </td>
              <td class="c-table__cell">
                <span class="u-text-mute">12 Apr 2017</span>
              </td>
              <td class="c-table__cell">
                <span class="c-badge c-badge--small c-badge--warning">Pending</span>
              </td>
              <td class="c-table__cell">$1200</td>
            </tr> -->

            </tbody>
          </table>
        </div><!-- // .c-card -->
      </div>
    </div><!-- // .row -->

  </div>
  <!--<div class="row">-->
  <!--<wysiwyg v-model="wsw"/>-->
  <!--</div>-->
</template>

<script>
  // import FBS from '../../firebase/service';
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "AllBooks",
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
        currentPage: 0,
        pageSize: 2,
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
        this.setFocus();
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
  .book-cover {
    height: 50px;
  }
</style>
