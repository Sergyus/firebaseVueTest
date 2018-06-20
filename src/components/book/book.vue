<template>
  <div class="container" style="margin-top: 80px;">

    <main-menu></main-menu>

    <div class="row">
      <div class="col-md-3">
        <img :src="book.cover" alt="">
      </div>
      <div class="col-md-9">
        <p>Book ID: {{ book.id }}</p>
        <p>{{ book.title }}</p>
        <p>{{ book.author }}</p>
        <p>Category: {{ book.category }}</p>
        <p class="books__type">{{ book.type }}</p>
        <div class="books__rating">
          <span>Rating: {{ book.rating }}/5</span>
          <div class="books__stars">
            <span class="books__star" v-for="n in Math.floor(book.rating)"></span>
          </div>
        </div> <!-- eof books__rating -->

        <div v-html="book.desc" class="desc"></div>

        <ul class="tags">
          <li v-for="tag in book.tags">{{ tag }}</li>
        </ul>

        <div class="book__specs">
          <div class="spec">
            <img class="icon" src="../../assets/file.svg">
            <div class="spec__text">
              <div class="spec__highlight">{{ book.wordsCount }}</div>
              <span>words</span>
            </div>
          </div>
          <div class="spec">
            <img class="icon" src="../../assets/book.svg">
            <div class="spec__text">
              <div class="spec__highlight">{{ book.pagesCount }}</div>
              <span>pages</span>
            </div>
          </div>
          <div class="spec">
            <img class="icon" src="../../assets/time.svg">
            <div class="spec__text">
              <div class="spec__highlight">{{ book.readtime }}</div>
              <span>hours to read</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  import {ASSES_BASE_URL} from '../../config/config';
  import './book.scss';
  import MainMenu from '../main-menu';
  export default {
    components: { MainMenu },
    data() {
      return {
        books: [],
        book: null
      }
    },
    created() {
      axios.get(ASSES_BASE_URL+"/static/books.json")
        .then(response => {
          let bookId = this.$route.params.id;
          this.books = response.data.books;
          this.book = this.books[bookId]
        })
        .catch(e => {
          console.log(e);
        })
    }
  }
</script>
