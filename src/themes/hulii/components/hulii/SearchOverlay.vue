<template>
  <transition name="fade" appear>
    <div class="overlay fixed w-100" @click="close" v-if="isVisible" />
  </transition>
</template>

<script>
import Overlay from '@vue-storefront/core/compatibility/components/Overlay'

export default {
  mixins: [Overlay],
  beforeCreate () {
    document.documentElement.classList.add('no-scroll')
  },
  destroyed () {
    document.documentElement.classList.remove('no-scroll')
  },
  methods: {
    close () {
      this.$store.commit('ui/setSearchOverlay', false)
    }
  },
  computed: {
    isVisible () {
      return this.$store.state.ui.searchOverlay
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/base/global_vars';
$color-bg: color(black);
$z-index-overlay: map-get($z-index, overlay);

.overlay {
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.98);
  z-index: 2;
}
</style>
