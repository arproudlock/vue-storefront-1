<template>
  <div class="sidebar">
    <!-- <div
      v-if="category.children_count > 0"
      class="sidebar--refine"
    >
      <refine-by />
    </div> -->
    <div
      v-for="(filter, filterIndex) in availableFilters"
      :key="filterIndex"
      class="sidebar--selectors"
    >
      <h5>
        <!-- {{ $t(filterIndex + '_filter') }} -->
        {{ $t(filterIndex) | capitalize | removeUnderscore}}
      </h5>

      <div v-if="filterIndex==='colour'">
        <color-selector
          context="category"
          code="colour"
          v-for="(color, index) in filter"
          :key="index"
          :id="color.id"
          :label="color.label"
        />
      </div>
      <div v-else-if="filterIndex==='size'">
        <size-selector
          context="category"
          code="Size"
          class="size-select mr10 mb10"
          v-for="(size, index) in sortById(filter)"
          :key="index"
          :id="size.id"
          :label="size.label"
        />
      </div>
      <div v-else-if="filterIndex==='price'">
        <price-selector
          context="category"
          code="price"
          v-for="(price, index) in filter"
          :id="price.id"
          :from="price.from"
          :to="price.to"
          :content="price.label"
          :label="price.label"
          :key="index"
        />
      </div>
      <div v-else>
        <generic-selector
          context="category"
          :code="filterIndex"
          v-for="(option, index) in filter"
          :key="index"
          :id="option.id"
          :label="option.label"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@vue-storefront/core/compatibility/components/blocks/Category/Sidebar'
import RefineBy from 'src/modules/refine-by/components/RefineBy'
import ColorSelector from 'theme/components/hulii/blocks/Category/ColorSelector'
import SizeSelector from 'theme/components/core/SizeSelector'
import PriceSelector from 'theme/components/core/PriceSelector'
import PriceSlider from 'src/modules/layered-navigation/components/FilterTypes/PriceSlider'
import GenericSelector from 'theme/components/hulii/blocks/Category/GenericSelector'
import config from 'config'

export default {
  components: {
    ColorSelector,
    SizeSelector,
    PriceSelector,
    PriceSlider,
    GenericSelector,
    RefineBy
  },
  mixins: [Sidebar],
  computed: {
    getFilters () {
      let allFilter = this.filters
      allFilter.special_price = this.filters.price
      console.log('before', allFilter.memory)
      allFilter.memory.slice().sort((a, b) => (parseInt(a.label.replace(/\D/g, '')) > parseInt(b.label.replace(/\D/g, ''))) ? 1 : -1)
      console.log('after', allFilter.memory, allFilter.memory[0].label.replace(/\D/g, ''))
      return allFilter
      // return this.$store.state.category.promoted_product[0]
    },
    currentProductList () {
      return this.$store.state.product.list.items
    },
    getMaxPrice () {
      return Math.max.apply(Math, this.currentProductList.map((attribute) => { return attribute.priceInclTax }))
    },
    getMinPrice () {
      return Math.min.apply(Math, this.currentProductList.map((attribute) => { return attribute.priceInclTax }))
    }
  },
  filters: {
    removeUnderscore: function (value) {
      if (!value) return ''
      value = value.toString()
      value = value.replace(/_/g, ' ');
      return value
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  &--header {
    @apply pb-2;
    justify-content: space-between;
    margin-top: 10px;
    flex-wrap: wrap;
    border-bottom: 1px solid #e7e7e7;
    width: 90%;
    margin-bottom: 0;

    &__clear {
      font-size: .8em;
      min-width: 102px;
      @media only screen and (min-width: 768px) and (max-width: 770px) {
        margin-top: 20px;
      }
    }
  }
  .sidebar--selectors {
    @apply w-full;
  }

  &--selectors {
    h5 {
      display: flex;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
    }
  }

  &__inline-selecors {
    display: flex;
  }
}
</style>
