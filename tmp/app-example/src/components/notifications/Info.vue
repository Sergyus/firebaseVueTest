<template>
  <transition name="fade" mode="out-in">
  <!-- Authentification In-Progress Notification -->
  <div class="c-alert c-alert--info u-mt-medium"
       v-if="notificationInfo">
    <i class="c-alert__icon fa fa-info-circle"></i>
    {{notificationInfo}}
  </div>
  </transition>
</template>

<script>
export default {
  name: 'notifications-info',
  computed: {
    notificationInfo: function () {
      return this.$store.getters.info
    }
  },
  data () {
    return {
    }
  }
}
</script>
