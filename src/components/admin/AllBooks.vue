<template>
  <!--<div class="row">-->
  <!--<wysiwyg v-model="wsw"/>-->
  <!--</div>-->
  <div class="row u-mb-large">
    <div class="col-md-12">
      <div class="c-table-responsive@wide">
        <table class="c-table">
          <!-- <caption class="c-table__title">
              Invoices
          </caption> -->
          <thead class="c-table__head c-table__head--slim">
          <tr class="c-table__row">
            <th class="c-table__cell c-table__cell--head">Book title</th>
            <th class="c-table__cell c-table__cell--head">Price</th>
            <th class="c-table__cell c-table__cell--head">Actions</th>
            <!-- <th class="c-table__cell c-table__cell--head">
              <span class="u-hidden-visually">Actions</span>
            </th> -->
          </tr>
          </thead>

          <tbody>
            <tr class="c-table__row" v-for="book of books" :key="book['.key']">
              <td class="c-table__cell">
                <span>{{ book.name }}</span>
              </td>
              <td class="c-table__cell">
                <span>{{ book.price }}</span>
              </td>
              <td class="c-table__cell">
                <!-- <a href="#!" class="c-btn c-btn--warning u-mr-small">Edit</a> -->
                <router-link :to="{name: 'edit', params: {key:book['.key']} }" class="c-btn c-btn--warning u-mr-small">Edit {{ book['.key'] }}</router-link>
                <a href="#!" class="c-btn c-btn--danger u-mr-small">Delete</a>
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
</template>

<script>
  import { booksRef } from '../../firebase/firebase';

  export default {
    name: "AllBooks",
    data () {
      return {
        books: [],
      }
    },
    firebase: {
      books: booksRef
    },
    methods: {

    }
  }
</script>

<style>

</style>
