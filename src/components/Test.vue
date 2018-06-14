<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Add Item</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="addBook">
          <div class="form-group">
            <label>Book Name:</label>
            <input type="text" class="form-control"/>
          </div>
          <div class="form-group">
            <label>Book Price:</label>
            <input type="text" class="form-control"/>
          </div>
          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Add Item"/>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { db, booksRef } from '../firebase';
  export default {
    name: "Test",
    data () {
      return {
        newBook: {
          name: '',
          price: ''
        }
      }
    },
    methods: {
      addBook() {
        booksRef.push({
          name: this.newBook.name,
          price: this.newBook.price
        });
        this.newBook.name = '';
        this.newBook.price = '';
        this.$router.push('/test')
      }
    }
  }

</script>

<style scoped>

</style>
