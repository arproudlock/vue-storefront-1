<template>
  <div id="category" class="container category--grid">
    <breadcrumbs :routes="breadcrumbs.routes" :active-route="category.name" class="category--breadcrumbs" />
    <trustpilot-micro-score
      class="category--trustpilot"
    />
    <!-- <trustpilot-micro-count
      class="category--trustpilot"
    /> -->
    <div
      class="category--title row middle-sm"
      :class="'text-' + highlightColor"
    >
      <h1 class="col-sm-8 mb10">
        {{ category.name }}
      </h1>
    </div>
    <sidebar :filters="filters.available" class="category--sidebar" />
    <div class="category--products">
      <div class="products--info">
        <sort-by :has-label="true" class="info--sort-by" />
        <div class="info--divider" />
        <!-- <div class="info-filter-button">
          <mobile-filters :highlight="highlightColor" :filters="filters.available" />
        </div> -->
        <p class="info--total">
          {{ productsTotal }} {{ $t('items') }}
        </p>
      </div>
      <div v-if="isCategoryEmpty" class="hidden-xs">
        <h4 data-testid="noProductsInfo">
          {{ $t('No products found!') }}
        </h4>
        <p>{{ $t('Please change Your search criteria and try again. If still not finding anything relevant, please visit the Home page and try out some of our bestsellers!') }}</p>
      </div>
      <product-listing :columns="defaultColumn" :products="products" />
    </div>
    <mobile-filters :highlight="highlightColor" :filters="filters.available" />
    <!-- <recently-shopped-box v-if="store === 'au'" /> -->
  </div>
</template>

<script>
import Category from '@vue-storefront/core/pages/Category'
import Sidebar from '../components/hulii/blocks/Category/Sidebar.vue'
import ProductListing from '../components/hulii/ProductListing.vue'
import Breadcrumbs from '../components/hulii/Breadcrumbs.vue'
import SortBy from '../components/hulii/SortBy.vue'
// import Columns from '../components/core/Columns.vue'
// import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import CategoryData from 'theme/resource/category-data.json'
import MobileFilters from 'theme/components/hulii/blocks/Category/MobileFilters.vue'
import { mapState } from 'vuex'
import TrustpilotMicroScore from 'theme/components/hulii/blocks/Trustpilot/TrustpilotMicroScore'
// import TrustpilotMicroCount from 'theme/components/hulii/blocks/Trustpilot/TrustpilotMicroCount'
// import builder from 'bodybuilder'

// Attempt to Fix AMP:
import { localizedRoute, currentStoreView } from '@vue-storefront/core/lib/multistore'
import { htmlDecode } from '@vue-storefront/core/filters'
import RecentlyShoppedBox from 'src/modules/recently-shopped/components/RecentlyShoppedBox'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    // ButtonFull,
    ProductListing,
    Breadcrumbs,
    Sidebar,
    SortBy,
    // Columns,
    MobileFilters,
    TrustpilotMicroScore
    // RecentlyShoppedBox,
    // FontAwesomeIcon
    // TrustpilotMicroCount,
  },
  data () {
    return {
      store: currentStoreView().storeCode,
      mobileFilters: false,
      defaultColumn: 3
    }
  },
  async asyncData ({ store, route }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
    await store.dispatch('category/mergeSearchOptions', { // this is just an example how can you modify the search criteria in child components
      sort: store.state.config.products.defaultSortBy.attribute + (store.state.config.products.defaultSortBy.order ? ':' + store.state.config.products.defaultSortBy.order : '')
      // searchProductQuery: builder().query('range', 'price', { 'gt': 0 }).andFilter('range', 'visibility', { 'gte': 2, 'lte': 4 }) // this is an example on how to modify the ES query, please take a look at the @vue-storefront/core/helpers for refernce on how to build valid query
    })
  },
  computed: {
    ...mapState({
      highlightColor: state => state.ui.highlightColor
    })
  },
  methods: {
    getCategoryIcon (name) {
      const catData = CategoryData.categories.filter((cat) => {
        return cat.category = name
      })
      const icon = catData[0] ? catData[0].icon : 'https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/menu/smartphones.svg'
      return icon
    },
    getCategoryColor (name) {
      const catData = CategoryData.categories.filter((cat) => {
        return cat.category = name
      })
      const color = catData[0] ? catData[0].color : 'hulii-purple'
      return color
    },
    openFilters () {
      this.mobileFilters = true
    },
    closeFilters () {
      this.mobileFilters = false
    },
    notify () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('Please select the field which You like to sort by'),
        action1: { label: this.$t('OK') }
      })
    },
    columnChange (column) {
      this.defaultColumn = column
    }
  },
  metaInfo () {
    const storeView = currentStoreView()
    const { meta_title, meta_description, name, slug } = this.getCurrentCategory
    const meta = meta_description ? [
      { vmid: 'description', name: 'description', content: htmlDecode(meta_description) }
    ] : []
    const categoryLocaliedLink = localizedRoute({
      name: 'category-amp',
      params: { slug }
    }, storeView.storeCode)
    const ampCategoryLink = this.$router.resolve(categoryLocaliedLink).href
    // return {
    //   link: [ { rel: 'amphtml', href: ampCategoryLink } ],
    //   title: htmlDecode(meta_title || name),
    //   meta
    // }
    return {
      title: htmlDecode(meta_title || name),
      meta
    }
  },
  mixins: [Category]
}
</script>

<style lang="scss" scoped>
#category {
  padding-top: 20px;
  grid-template-areas:
    "breadcrumb breadcrumb breadcrumb breadcrumb"
    "trustpilot trustpilot trustpilot trustpilot"
    "header header header header"
    "products products products products";

  &.category--grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 16px;
  }
  .category--breadcrumbs {
    justify-self: flex-start;
    margin-bottom: 18px;
    grid-area: breadcrumb / breadcrumb / breadcrumb / breadcrumb;
    display: flex;
    box-sizing: border-box;
    position: relative;
    flex-wrap: wrap;
  }
  .category--trustpilot {
    @apply justify-center;
    margin-bottom: 18px;
    grid-area: trustpilot;
    display: flex;
    box-sizing: border-box;
    position: relative;
    flex-wrap: wrap;
  }
  .category--title {
    margin-bottom: 16px;
    grid-area: header / header / header / header;

    h1 {
      margin-top: 10px;
    }
  }
  .category--sidebar {
    display: none;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    grid-area: sideBar / sideBar / sideBar / sideBar;
    flex-wrap: nowrap;
    box-sizing: border-box;
    position: relative;
  }
  .category--products {
    grid-area: products / products / products / products;

    .products--info {
      @apply flex justify-between items-center;
      margin-bottom: 20px;
      .info--sort-by {
        @apply flex;
      }
      .info--divider {

          @apply flex bg-grey-light;
          flex-grow: 1;
          height: 1px;
          margin-left: 20px;
          margin-right: 20px;
        }

      .info--total {

          @apply flex;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;

      }
      .info-filter-button {

        svg {
          height: 24px;
          width: 24px;
          margin-right: 4px;
        }
        @screen md {
          display: none;
        }
      }
    }
  }
  @screen md {
    grid-template-areas: "breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb trustpilot trustpilot trustpilot"
    "header header header header header header header header header header header header"
    "sideBar sideBar sideBar products products products products products products products products products";
    &.category--grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-column-gap: 16px;
    }
    .category--sidebar {
      @apply flex;
    }
    .category--trustpilot {
      @apply justify-start;
    }
  }
}
  .btn {
    &__filter {
      min-width: 100px;
    }
  }
  .divider {
    width: calc(100vw - 8px);
    bottom: 20px;
    left: -36px;
  }
  .category-filters {
    width: 242px;
  }

  .mobile-filters {
    display: none;
    overflow: auto;
  }

  .mobile-filters-button {
    display: none;
  }

  .mobile-sorting {
    display: none;
  }

  .category-title {
    line-height: 65px;
  }

  .sorting {
    label {
      margin-right: 10px;
    }
  }

  @media (max-width: 64em) {
    .products-list {
      max-width: 530px;
    }
  }

  @media (max-width: 770px) {
    .category--title {
      margin: 0;
      font-size: 36px;
      line-height: 40px;
    }

    .products-list {
      width: 100%;
      max-width: none;
    }

    .mobile-filters {
      display: block;
    }

    .mobile-filters-button {
      display: block;
      height: 45px;
    }

    .sorting {
      display: none;
    }

    .mobile-sorting {
      display: block;
    }

    .category-filters {
      display: none;
    }

    .product-listing {
      justify-content: center;;
    }

    .mobile-filters {
      position: fixed;
      background-color: #F2F2F2;
      z-index: 5;
      padding: 0 40px;
      left: 0;
      width: 100vw;
      height: 100vh;
      top: 0;
      box-sizing: border-box;
    }

    .mobile-filters-body {
      padding-top: 50px;
    }
  }

  .close-container {
    left: 0;
  }

  .close {
    margin-left: auto;
  }
</style>
<style lang="scss">
.product-image {
  max-height: unset !important;
}
</style>
