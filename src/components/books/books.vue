<template>
  <div class="books">
    <div class="container">

      <main-menu></main-menu>

      <div class="row">

        <div class="books__item col-lg-2 col-md-4 col-sm-8" v-for="book in books">
          <div class="books__inner">

            <router-link :to="{name: 'book', params: {id:book.id} }" class="books__cover">
              <img :src="book.cover" :alt="book.shortdesc">
            </router-link>

            <div class="books__info">
              <router-link :to="{name: 'book', params: {id:book.id} }" class="books__title">{{ book.title }}</router-link>
              <p class="books__author">{{ book.author }}</p>
              <p class="books__type">{{ book.type }}</p>
              <div class="books__rating">
                <span>Rating: {{ book.rating }}/5</span>
                <div class="books__stars">
                  <span class="books__star" v-for="n in Math.floor(book.rating)"></span>
                </div>
              </div> <!-- eof books__rating -->
              <div class="books__price">{{book.price | currency}}</div>
            </div> <!-- eof books__info -->

          </div> <!-- eof books__inner -->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  import "./books.scss";
  import MainMenu from '../main-menu';
  import {ASSES_BASE_URL} from '../../config/config'
  export default {
    name: 'books',
    components: { MainMenu },
    data() {
      return {
        books: []
      }
    },
    created() {
      axios.get(ASSES_BASE_URL+"/static/books.json")
        .then(response => {
          this.books = response.data.books;
        })
        .catch(e => {
          console.log(e);
        })
    }
  }
</script>

