<template>
  <!-- Authentification Error Notification -->
  <div class="c-alert c-alert--danger u-mt-medium"
       v-if="notificationError">
    <i class="c-alert__icon fa fa-times-circle"></i>
    {{notificationError}}
  </div>
</template>

<script>
export default {
  name: 'notifications-error',
  computed: {
    notificationError: function () {
      return this.$store.getters.error
    }
  },
  data () {
    return {
    }
  }
}
</script>
