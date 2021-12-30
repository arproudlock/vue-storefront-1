<template>
  <div class="seller--store--container container">
    <!-- <breadcrumbs
      :routes="breadcrumbs.routes"
      :active-route="seller.name"
      class="seller--breadcrumbs"
    /> -->
    <div class="seller--info">
      <!-- <div class="seller--logo">
        Logo
      </div> -->
      <div class="seller--name">
        {{ storeData.name }}
      </div>
      <div class="seller--product--info">
        <!-- <div class="seller--accessories">
          {{ storeData.categories_available }}
        </div> -->
        <div class="tag">
          <span>
            {{ storeData.location }}
          </span>
          <span>
            {{ storeData.seller_since }}
          </span>
        </div>
      </div>
      <div class="sales--review">
        <!-- <span class="total--sales">
          {{ storeData.overall_star_rating }} Sales</span>
        <star-rating :stars="getRating(3)" />
        <span class="more--review">See review</span> -->
      </div>
    </div>
    <div class="seller--highlights--announcement">
      <div class="seller--highlights">
        <h3>Seller highlights:</h3>
        <p v-for="(highlight, index) in storeData.highlights" :key="index">
          {{ highlight }}
        </p>
      </div>
      <div class="seller--announcement">
        <h3>Announcement:</h3>
        <p class="last--update">
          {{ storeData.sales_to_date }}
        </p>
        <p>{{ storeData.announcement }}</p>
      </div>
    </div>
    <div class="seller--feedback--rating">
      <p>Feedback ratings</p>
      <div class="rating--list">
        <div
          class="rating--list--item"
          v-for="(review, index) in storeData.feedback_ratings"
          :key="index"
        >
          <star-rating :stars="getRating(3)" />
          <span class="total">{{ review.total_rating }}</span>
          <span class="comment">{{ review.comment }}</span>
        </div>
      </div>
    </div>
    <div class="seller--store--info">
      <p class="seller--desc">
        {{ storeData.description }}
      </p>
      <!-- <div class="seller--contact">
        <span /><span>Contact this seller</span>
      </div> -->
    </div>
    <div class="seller--related--product">
      <div class="seller--title row middle-sm">
        <h1 class="col-sm-8 mb10">
          {{ $t("Products") }}
        </h1>
      </div>
      <sidebar :filters="filters.available" class="seller--sidebar" />
      <div class="seller--products">
        <div class="products--info">
          <sort-by :has-label="true" class="info--sort-by" />
          <div class="info--divider" />
          <p class="info--total">
            {{ productsTotal }} {{ $t("items") }}
          </p>
        </div>
        <div v-if="isCategoryEmpty" class="hidden-xs">
          <h4 data-testid="noProductsInfo">
            {{ $t("No products found!") }}
          </h4>
          <p>
            {{
              $t(
                "Please change Your search criteria and try again. If still not finding anything relevant, please visit the Home page and try out some of our bestsellers!"
              )
            }}
          </p>
        </div>
        <product-listing :columns="defaultColumn" :products="products" />
      </div>
      <mobile-filters
        :highlight="highlightColor"
        :filters="filters.available"
      />
    </div>
  </div>
</template>

<script>
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue';
import StarRating from '../components/hulii/StarRating.vue';
import Dummy from '../resource/dummy.json';
import Sellers from '../resource/sellers.json';
import mVMixin from 'theme/mixins/miscellaneous';
import Seller from 'theme/mixins/seller'
import Sidebar from '../components/hulii/blocks/Category/Sidebar.vue'
import ProductListing from '../components/hulii/ProductListing.vue'
import SortBy from '../components/hulii/SortBy.vue'
import Columns from '../components/core/Columns.vue'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { mapState } from 'vuex'
import MobileFilters from 'theme/components/hulii/blocks/Category/MobileFilters.vue'

export default {
  components: { Breadcrumbs, StarRating, Sidebar, ProductListing, SortBy, Columns, ButtonFull, MobileFilters },
  mixins: [mVMixin, Seller],
  data () {
    return {
      storeData: Sellers,
      mobileFilters: false,
      defaultColumn: 3,
      seller_id: 3
    };
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
  mounted () {
    this.seller_id = this.$route.params.slug
    // this.storeData = Seller[this.seller_id]
    switch (this.seller_id) {
      case '1':
        this.storeData = Sellers.secondLife
        break;
      case '2':
        this.storeData = Sellers.mazuma
        break;
      case '3':
        this.storeData = Sellers.azod
        break;
      case '4':
        this.storeData = Sellers.becextech
        break;
      case '7':
        this.storeData = Sellers.oz
        break;
      case '8':
        this.storeData = Sellers.inl
        break;
      case '9':
        this.storeData = Sellers.phoneCycle
        break;
      case '10':
        this.storeData = Sellers.tech4Less
        break;
      case '11':
        this.storeData = Sellers.lyp
        break;
      case '12':
        this.storeData = Sellers.deals4Mates
        break;
    }
  }
};
</script>

<style lang="scss" scoped>
.seller--store--container {
  margin-top: 20px;
  display: grid;
  grid-template-areas:
    "breadcrumb breadcrumb breadcrumb breadcrumb"
    "seller-info seller-info seller-info seller-info"
    "store-info store-info store-info store-info"
    "products-container products-container products-container products-container";
  grid-template-columns: repeat(4, 1fr);
  .seller--breadcrumbs {
    justify-self: flex-start;
    margin-bottom: 18px;
    grid-area: breadcrumb / breadcrumb / breadcrumb / breadcrumb;
    display: flex;
    box-sizing: border-box;
    position: relative;
    flex-wrap: wrap;
  }
  .seller--info {
    grid-area: seller-info;
    grid-template-areas:
      "seller-logo seller-name seller-name seller-name"
      "seller-logo product-info product-info product-info"
      "sales-review sales-review sales-review sales-review";
    display: grid;
    .seller--logo {
      grid-area: seller-logo;
      background: #f8f8f8;
      border: 1px solid #efefef;
      box-sizing: border-box;
      border-radius: 10px;
      width: 116px;
      height: 116px;
      justify-content: center;
      display: grid;
      align-items: center;
    }
    .seller--name {
      grid-area: seller-name;
      font-style: normal;
      font-weight: 800;
      font-size: 36px;
      color: #372768;
    }
    .seller--product--info {
      grid-area: product-info;
      line-height: 24px;
      .seller--accessories {
        color: #2d2d2d;
      }
      .tag {
        color: #6c6b6b;
        & span:nth-child(1) {
          border-right: 2px solid #6c6b6b;
          margin-right: 5px;
        }
      }
    }
    .sales--review {
      display: flex;
      grid-area: sales-review;
      align-self: end;
      .total--sales {
        padding-right: 5px;
        border-right: 2px solid #2d2d2d;
        margin-right: 4px;
      }
      .more--review {
        text-decoration-line: underline;
        /* Grey */
        color: #6c6b6b;
        font-size: 14px;
        padding-left: 5px;
      }
    }
  }
  .seller--highlights--announcement {
    grid-area: highlight-announcement;
    display: none;
    .seller--highlights {
      width: 100%;
      border-radius: 10px;
      background-color: rgba(29, 177, 157, 0.1);
      padding: 1rem;
      margin-right: 1rem;
      h3 {
        margin: 0;
        font-size: 16px;
      }
    }
    .seller--announcement {
      width: 100%;
      background: #fafafb;
      border-radius: 10px;
      padding: 1rem;
      h3 {
        margin: 0px;
        font-size: 16px;
      }
    }
  }
  .seller--feedback--rating {
    grid-area: feedback-rating;
    display: none;
    .rating--list {
      display: grid;
      grid-template-columns: auto auto;
      font-size: 14px;
      .rating--list--item {
        display: flex;
        .total {
          padding-left: 5px;
          font-weight: bold;
        }
        .comment {
          padding-left: 5px;
        }
      }
    }
  }
  .seller--store--info {
    grid-area: store-info;
    .seller--desc {
      color: #6c6b6b;
    }
    .seller--contact {
      color: #372768;
      font-weight: 600;
      font-size: 14px;
    }
  }

  .seller--related--product {
    grid-area: products;
    grid-area: products-container;
    grid-template-areas:
        "header header header header"
        "products products products products";
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 16px;
    .seller--title {
      margin-bottom: 16px;
      grid-area: header / header / header / header;

      h1 {
        margin-top: 10px;
      }
    }
    .seller--sidebar {
      display: none;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      grid-area: sideBar / sideBar / sideBar / sideBar;
      flex-wrap: nowrap;
      box-sizing: border-box;
      position: relative;
    }
    .seller--products {
      grid-area: products / products / products / products;

      .products--info {
        @apply flex;
        @apply justify-between;
        @apply items-center;
        margin-bottom: 20px;
        .info--sort-by {
          @apply flex;
        }
        .info--divider {
          @apply flex;
        @apply bg-grey-light;
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
      }
    }
  }
}

@screen md {
    .seller--store--container{
    grid-template-areas:
        "breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb"
        "seller-info seller-info seller-info seller-info seller-info seller-info store-info store-info store-info store-info store-info store-info"
        // "seller-info seller-info seller-info seller-info seller-info seller-info highlight-announcement highlight-announcement highlight-announcement highlight-announcement highlight-announcement highlight-announcement"
        // "feedback-rating feedback-rating feedback-rating feedback-rating feedback-rating feedback-rating store-info store-info store-info store-info store-info store-info"
        "header header header header header header header header header header header header"
        "products-container products-container products-container products-container products-container products-container products-container products-container products-container products-container products-container products-container";
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 16px;
    // &.seller--grid {
    //   display: grid;
    //   grid-template-columns: repeat(12, 1fr);
    //   grid-column-gap: 16px;
    // }
    .seller--info {
      grid-template-areas:
      "seller-name seller-name highlight-announcement highlight-announcement"
      "product-info product-info product-info product-info"
      "sales-review sales-review sales-review sales-review";
      .seller--highlights--announcement {
        display:flex;
        }
      .seller--feedback--rating {
        display:grid;
      }
    }
    .seller--related--product {
    grid-area: products-container;
    grid-template-areas:
        "header header header header header header header header header header header header"
        "sideBar sideBar sideBar products products products products products products products products products";
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 16px;
    .seller--sidebar {
    display: flex;
    }
    }
    .seller--trustpilot {
      @apply justify-start;
    }
  }
}
</style>
