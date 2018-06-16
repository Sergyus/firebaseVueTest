<template>
  <section>

    <div>
      <section class="o-page" v-if="user">
        <div class="o-page__sidebar js-page-sidebar">
            <div class="c-sidebar">
                <a class="c-sidebar__brand" href="#">Dashboard</a>
                <h4 class="c-sidebar__title">Dashboards</h4>
                <ul class="c-sidebar__list">
                    <li class="c-sidebar__item">
                        <a class="c-sidebar__link" href="#">
                            <i class="fa fa-home u-mr-xsmall"></i>Main
                        </a>
                    </li>
                </ul>
            </div><!-- // .c-sidebar -->
        </div><!-- // .o-page__sidebar -->

        <main class="o-page__content">
            <header class="c-navbar u-mb-medium">
                <button class="c-sidebar-toggle js-sidebar-toggle">
                    <span class="c-sidebar-toggle__bar"></span>
                    <span class="c-sidebar-toggle__bar"></span>
                    <span class="c-sidebar-toggle__bar"></span>
                </button>

                <h2 class="c-navbar__title u-mr-auto">Books</h2>
                <a href="#!" @click.prevent="signOut" class="c-btn c-btn--success u-mr-small">Logout</a>
            </header>

            <div class="container">
                <div class="row">
                  <wysiwyg v-model="wsw" />
                </div>
                <div class="row u-mb-large">
                    <div class="col-md-12">
                        <div class="c-table-responsive@wide">
                            <table class="c-table">
                                <!-- <caption class="c-table__title">
                                    Invoices
                                </caption> -->
                                <thead class="c-table__head c-table__head--slim">
                                    <tr class="c-table__row">
                                        <th class="c-table__cell c-table__cell--head">No.</th>
                                        <th class="c-table__cell c-table__cell--head">Invoice Subject</th>
                                        <th class="c-table__cell c-table__cell--head">Client</th>
                                        <th class="c-table__cell c-table__cell--head">VAT No.</th>
                                        <th class="c-table__cell c-table__cell--head">Created</th>
                                        <th class="c-table__cell c-table__cell--head">Status</th>
                                        <th class="c-table__cell c-table__cell--head">Price</th>
                                        <th class="c-table__cell c-table__cell--head">
                                            <span class="u-hidden-visually">Actions</span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr class="c-table__row">
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
                                    </tr><!-- // .table__row -->

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
                                    </tr><!-- // .table__row -->

                                </tbody>
                            </table>
                        </div><!-- // .c-card -->
                    </div>
                </div><!-- // .row -->
            </div>
        </main>
      </section>


      <login v-else></login>
    </div>
  </section>
</template>

<script>
  import firebase from 'firebase/app';
  import Login from './Login';
  import '../assets/styles/dashboard.min.css';
  import 'vue-wysiwyg/dist/vueWysiwyg.css'

  export default {
    name: "Admin",
    wsw:  '<p>test</p>',
    components: { Login },
    beforeCreate: function() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user
        }
      })
    },
    data() {
      return {
        user: null,
      }
    },
    methods: {
      signOut() {
        firebase.auth().signOut().then(() => {
          this.user = null;
        }).catch(err => console.log(error))
      },
    },
  }
</script>

<style scoped>

</style>
