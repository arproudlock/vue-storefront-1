<template>
  <div class="breadcrumbs">
    <div
      class="show-all-toggle"
      @click="toggleShowAll"
      v-if="!showAllBreadcrumbs && routes.length > 2"
    >
      ...
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4385 12.7305C10.4231 11.7565 8.7769 11.7565 7.76152 12.7305C6.74616 13.7049 6.74616 15.2841 7.76152 16.2584L11.4385 12.7305ZM20 24.4721L18.1616 26.2362L20 28L21.8385 26.2362L20 24.4721ZM32.2385 16.2584C33.2538 15.2841 33.2538 13.7049 32.2385 12.7305C31.2232 11.7565 29.5769 11.7565 28.5616 12.7305L32.2385 16.2584ZM7.76152 16.2584L18.1616 26.2362L21.8385 22.7083L11.4385 12.7305L7.76152 16.2584ZM21.8385 26.2362L32.2385 16.2584L28.5616 12.7305L18.1616 22.7083L21.8385 26.2362Z" fill="#333333" /></svg>
    </div>
    <span v-for="link in returnLinks" :key="link.route_link">
      <router-link
        @click.native="onClick"
        :to="localizedRoute(link.route_link)"
        class="breadcrumbs--parent"
        v-if="link.name !== 'All'"
      >
        {{ link.name | htmlDecode }}
      </router-link>
      <svg v-if="link.name !== 'All'" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4385 12.7305C10.4231 11.7565 8.7769 11.7565 7.76152 12.7305C6.74616 13.7049 6.74616 15.2841 7.76152 16.2584L11.4385 12.7305ZM20 24.4721L18.1616 26.2362L20 28L21.8385 26.2362L20 24.4721ZM32.2385 16.2584C33.2538 15.2841 33.2538 13.7049 32.2385 12.7305C31.2232 11.7565 29.5769 11.7565 28.5616 12.7305L32.2385 16.2584ZM7.76152 16.2584L18.1616 26.2362L21.8385 22.7083L11.4385 12.7305L7.76152 16.2584ZM21.8385 26.2362L32.2385 16.2584L28.5616 12.7305L18.1616 22.7083L21.8385 26.2362Z" fill="#333333" /></svg>
    </span>
    <span class="cl-mine-shaft">
      {{ activeRoute | htmlDecode }}
    </span>
  </div>
</template>

<script>
import Breadcrumbs from '@vue-storefront/core/compatibility/components/Breadcrumbs'

export default {
  mixins: [Breadcrumbs],
  data () {
    return {
      showAllBreadcrumbs: false
    }
  },
  methods: {
    onClick () {
      this.$bus.$emit('after-breadcrumb-click')
    },
    toggleShowAll () {
      this.showAllBreadcrumbs = !this.showAllBreadcrumbs
    }
  },
  computed: {
    returnLinks () {
      let commonLinks = ''
      if (this.routes.length > 2 && !this.showAllBreadcrumbs) {
        commonLinks = this.routes.slice(-1)
      } else {
        commonLinks = this.routes
      }
      return commonLinks
    }
  }
}
</script>
<style lang="scss" scoped>
.breadcrumbs {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;

  svg {
    height: 8px;
    width: 8px;
    fill: black;
    transform: rotate(270deg);
    margin: 0px 4px;
  }
  .show-all-toggle {
    @apply cursor-pointer;
  }
}
</style>
