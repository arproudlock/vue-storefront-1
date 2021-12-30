<template>
  <div class="my-favourites">
    <div class="favourites--header">
      <h3 class="header--title">
        {{ $t('Recently Viewed') }}
      </h3>
    </div>
    <div class="row">
      <div class="col-xs-12" v-if="items && items.length > 0">
        <product-listing columns="3" :products="items" />
      </div>
      <div class="col-xs-12 h4" v-else>
        <p>{{ $t('No products yet') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import RecentlyViewed from '@vue-storefront/core/modules/recently-viewed/components/RecentlyViewed'
import ProductListing from 'theme/components/hulii/ProductListing.vue'

export default {
  mixins: [RecentlyViewed],
  components: {
    ProductListing
  }
}
</script>
<style lang="scss" scoped>
.my-favourites {
  .favourites--header {
    @apply pb-4 mb-4;
    border-bottom: 1px solid #f2f2f2;
    .header--title {
      @apply text-hulii-yellow;
      font-weight: 700;
      margin-top: 0;
      font-size: 1.5rem;
      margin-bottom: 0;
    }
  }
}
</style>
