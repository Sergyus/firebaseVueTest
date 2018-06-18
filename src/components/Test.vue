<template>
  <div class="container">
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
                <label>Book test:</label>
                <input type="text" class="form-control" v-model="newBook.test"/>
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
          <tr v-for="item of items" :key="item['.key']">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.test }}</td>
            <td>
              <!--<router-link :to="{ name: 'Test', params: {id: item['.key']} }" class="btn btn-warning">-->
                <!--Edit-->
              <!--</router-link>-->
              <button @click="deleteItem(item['.key'])" class="btn btn-danger">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import { booksRef } from '../firebase/firebase';
  export default {
    name: "Test",
    data () {
      return {
        newBook: {
          name: '',
          price: ''
        },
        items: []
      }
    },
    firebase: {
      items: booksRef
    },
    methods: {
      addBook() {
        booksRef.push({
          name: this.newBook.name,
          price: this.newBook.price,
          test: this.newBook.test,
        });
        this.newBook.name = '';
        this.newBook.price = '';
      },
      deleteItem(key) {
        this.$firebaseRefs.items.child(key).remove();
      }
    }
  }

</script>

<style scoped>

</style>
