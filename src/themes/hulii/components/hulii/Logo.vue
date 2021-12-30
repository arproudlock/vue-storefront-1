<template>
  <router-link :to="localizedRoute('/')" :title="$t('Home Page')" class="flex">
    <img
      v-if="!color"
      :width="width"
      :height="height"
      :src="src"
      alt="Hulii Logo"
      class="header-logo"
    >
    <img
      v-else
      :width="width"
      :height="height"
      src="/assets/logo-color.svg"
      alt="Hulii Logo"
      class="header-logo"
    >
  </router-link>
</template>

<script>
export default {
  props: {
    width: {
      type: [String, Number],
      required: true
    },
    height: {
      type: [String, Number],
      required: true
    },
    src: {
      type: String,
      required: true
    },
    color: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.header-logo {
  min-width: 25px;
}
</style>
