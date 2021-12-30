<template>
  <div class="w-full mt-12 bg-white rounded py-4 px-6">
    <h2>{{ $t('You Might Also Like') }}</h2>
    <section class="mt-4 px-4">
      <div class="flex">
        <div class="w-full">
          <div class="justify-center cool-stuff-collection">
            <product-listing-slider :products="ourBestsellersCollection" :config="config" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'
import ProductListingSlider from 'theme/components/theme/ProductListingSlider.vue'

export default {
  components: {
    ProductListingSlider
  },
  data () {
    return {
      config: {
        perPage: 1,
        perPageCustom: [[0, 2], [768, 3], [1440, 4]],
        navigationNextLabel: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ml-1 chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-right fa-w-10"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path></svg>',
        navigationPrevLabel: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ml-1 chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-left fa-w-10"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path></svg>',
        paginationEnabled: false,
        loop: false,
        navigationEnabled: true,
        paginationSize: 6,
        scrollPerPage: true
      }
    }
  },
  async asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    const config = store.state.config

    let bestSellersQuery = prepareQuery({ queryConfig: 'appleDeals' })

    const bestSellers = await store.dispatch('product/list', {
      query: bestSellersQuery,
      size: 4,
      sort: 'created_at:desc',
      includeFields: config.entities.optimize ? (config.products.setFirstVarianAsDefaultInURL ? config.entities.productListWithChildren.includeFields : config.entities.productList.includeFields) : []
    })
    if (bestSellers) {
      store.state.homepage.bestsellers = bestSellers.items
    }
  },
  computed: {
    ourBestsellersCollection () {
      return this.$store.state.homepage.daily_deals
    }
  }
}
</script>
