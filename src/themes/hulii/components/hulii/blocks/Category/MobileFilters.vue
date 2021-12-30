<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div
    class="mobile-filter--container"
  >
    <div class="filter--content">
      <div
        class="filter--content--container"
        :class="{'container--open' : openFilters}"
      >
        <div class="content--filters">
          <div class="filters--close" @click="toggleFilters">
            <svg class="" viewBox="0 0 60 30" fill="none"><path opacity="0.25" d="M9 11L30 19L51 11" stroke="#333333" stroke-width="6" stroke-linecap="round" /></svg>
          </div>
          <div
            v-if="category.children_count > 0"
            class="sidebar--refine"
          >
            <refine-by />
          </div>
          <div
            v-for="(filter, filterIndex) in availableFilters"
            :key="filterIndex"
            class="sidebar--selectors"
          >
            <h5>
              {{ $t(filterIndex) | capitalize }}
            </h5>
            <div v-if="filterIndex==='color'">
              <color-selector
                context="category"
                code="color"
                v-for="(color, index) in filter"
                :key="index"
                :id="color.id"
                :label="color.label"
              />
            </div>
            <div v-else-if="filterIndex==='size'">
              <size-selector
                context="category"
                code="size"
                class="size-select mr10 mb10"
                v-for="(size, index) in sortById(filter)"
                :key="index"
                :id="size.id"
                :label="size.label"
              />
            </div>
            <div v-else-if="filterIndex==='price'">
              <!-- <price-slider
                context="category"
                code="price"
                :id="getMaxPrice"
                :from="getMinPrice"
                :to="getMaxPrice"
                content="Price"
                label="Price Label"
              /> -->
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
      </div>
    </div>
    <div class="filter--button">
      <button
        :class="'bg-' + highlight"
        @click="toggleFilters"
      >
        <svg class="nk0bqu-4 dPByiu" viewBox="0 0 24 24" fill="none"><path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="white" /></svg>
        <h3
          v-if="!openFilters"
        >
          {{ $t('Filter') }}
        </h3>
        <h3
          v-else
        >
          {{ $t('Apply Filters') }}
        </h3>
      </button>
    </div>
    <!-- <div class="filters-header-item">
      <a @click="toggleFilters">
        <p>
          <!-- <svg class="nk0bqu-4 dPByiu" viewBox="0 0 24 24" fill="none">
                <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="grey" />
              </svg> -->
    <!-- <font-awesome-icon icon="filter" />
          Filters
        </p>
      </a>
    </div> -->
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

  props: {
    highlight: {
      type: String,
      required: false,
      default: 'hulii-purple'
    },
    filters: {
      type: Object,
      required: true
    },
    showFilters: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      openFilters: false
    }
  },
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
      // console.log('before', allFilter.memory)
      allFilter.memory.slice().sort((a, b) => (parseInt(a.label.replace(/\D/g, '')) > parseInt(b.label.replace(/\D/g, ''))) ? 1 : -1)
      // console.log('after', allFilter.memory, allFilter.memory[0].label.replace(/\D/g, ''))
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
  methods: {
    toggleFilters () {
      this.$store.commit('ui/setOverlay', false)
      this.openFilters = !this.openFilters
    }
  }
}
</script>

<style lang="scss" scoped>
  .mobile-filter--container {
    .filter--content {
      position: fixed;
      bottom: 0px;
      left: 0px;
      right: 0px;
      top: 0px;
      visibility: hidden;
      z-index: 1;
      margin-left: -32px;

      &::-webkit-scrollbar {
        display: none;
      }

      .filter--content--container {
        cursor: pointer;
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
        top: 0px;
        overflow-y: auto;
        visibility: hidden;
        background: none;
        transition: all 0.3s cubic-bezier(0.4, 0, 1, 1) 0s;
        &::-webkit-scrollbar {
          display: none;
        }

        &.container--open {
          visibility: visible;
          background: rgba(0, 0, 0, 0.5);
          transition: all 0.3s cubic-bezier(0, 0, 0.2, 1) 0s;

          .content--filters {
            margin-top: 82px;
            min-height: calc(100vh - 82px);
            visibility: visible;
            display: flex;
            flex-direction: column;
            transform: translateY(0px);
            box-shadow: rgba(0, 0, 0, 0.13) 0px -7px 15px;
            padding: 0px 32px 16px;
            background: rgba(255, 255, 255, 0.96);
            border-radius: 8px 8px 0px 0px;
            transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0s;
            width: calc(100vw - 64px);
            padding-bottom: 60px;
          }
        }
        .content--filters {
          margin-top: 82px;
          width: 100%;
          min-height: calc(100vh - 82px);
          transform: translateY(100%);
          visibility: visible;
          display: flex;
          flex-direction: column;
          padding: 0px 32px 16px;
          background: rgba(255, 255, 255, 0.96);
          border-radius: 8px 8px 0px 0px;
          transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1) 0s;

          .filters--close {
            align-self: center;
            width: 56px;
            margin: 16px 0px 24px;
          }
        }
      }
    }
    .filter--button {
      position: fixed;
      bottom: 18px;
      width: 100%;
      display: flex;
      justify-content: center;
      z-index: 2;
      left: 0;

      button {
        position: relative;
        box-shadow: rgba(0, 0, 0, 0.13) 0px 7px 15px, rgba(0, 0, 0, 0.05) 0px 0px 3px;
        visibility: visible;
        opacity: 1;
        transition: opacity 0.3s cubic-bezier(0, 0, 0.2, 1) 0s;
        min-width: 96px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 16px;
        margin: 8px;
        border-radius: 5px;
        overflow: hidden;
        outline: none;
        border: none;

        svg {
          height: 24px;
          width: 24px;
          margin-right: 4px;
        }

        h3 {
          font-weight: bold;
          line-height: 18px;
          font-size: 16px;
          margin: 0;
          color: #fff;
        }
      }
      @screen md {
        display: none;
      }
    }

    .filters-header-item {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
    }
  }
</style>
