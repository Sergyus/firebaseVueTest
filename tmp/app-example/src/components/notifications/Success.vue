<template>
  <!-- Authentification Success Notification -->
  <div class="c-alert c-alert--success u-mt-medium"
       v-if="notificationSuccess">
    <i class="c-alert__icon fa fa-check-circle"></i>
    {{notificationSuccess}}
  </div>
</template>

<script>
export default {
  name: 'notifications-success',
  computed: {
    notificationSuccess: function () {
      return this.$store.getters.success
    }
  },
  data () {
    return {
    }
  }
}
</script>
