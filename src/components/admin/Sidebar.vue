<template>
  <div class="o-page__sidebar js-page-sidebar">
    <div class="c-sidebar">
      <router-link to="/" class="c-sidebar__brand">Books.com</router-link>
      <ul class="c-sidebar__list">
        <li class="c-sidebar__item">
          <router-link to="/admin/dashboard" class="c-sidebar__link">
            <i class="fa fa-home u-mr-xsmall"></i>Dashboard
          </router-link>
        </li>
        <li class="c-sidebar__item">
          <router-link to="/admin/books" class="c-sidebar__link">
            <i class="fa fa-book u-mr-xsmall"></i>Books
          </router-link>
        </li>
        <!-- <li class="c-sidebar__item">
          <a class="c-sidebar__link" href="#!">
            <i class="fa fa-sign-in u-mr-xsmall"></i>Logout
          </a>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Sidebar",
  }
</script>

<style scoped>

</style>
