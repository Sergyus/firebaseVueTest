<template>
  <div class="books">
    <div class="container">
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
export default {
  name: 'books',
  data () {
    return {
      books: []
    }
  },
  created() {
    axios.get("http://localhost:8080/static/books.json")
    .then(response=> {
      this.books = response.data.books
    })
    .catch(e => {
      console.log(e);
    })
  }
}
</script>

<style lang="scss">
  .books {
    margin-top: 80px;
    .row {
      justify-content: center;
    }
    &__item {
      font-size: 12px;
      margin-bottom: 20px;
    }
    &__inner {
      min-height: 200px;
      border: 1px solid grey;
      border-radius: 4px 4px 0 0;
      overflow: hidden;

      &:hover {

        img {
          transform: scale(1.02);
        }
      }
    }
    &__cover {
      display: block;
      // overflow: hidden;


      img {
        max-width: 100%;
        width: 100%;
        transition: all .8s;
        pointer-events: none;
      }
    }
    &__info {
      padding: 6px 10px;
    }
    &__title {
      margin-top: 10px;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 12px;
      text-decoration: none;
      color: inherit;
    }
    &__author {
      margin-top: 10px;
      font-size: 11px;
      font-style: italic;
      color: lighten(#000, 10%);
    }
    &__type {
      font-size: 10px;
      color: orange;
      text-transform: capitalize;
    }
    &__star {

      &:before {
        content: "\2605";
        font-size: 16px;
        color: orange;
      }
    }
    &__price {
      margin: 20px 0 10px;
      font-weight: bold;
      font-size: 16px;
    }
  }
</style>
