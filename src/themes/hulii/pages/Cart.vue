<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div class="container">
    <div class="cart">
      <div class="cart--items">
        <cart-items />
      </div>
      <div class="cart--summary">
        <order-summary />
      </div>
    </div>
  </div>
</template>

<script>
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary'
import CartItems from 'theme/components/hulii/blocks/Cart/CartItems'
import OrderSummary from 'theme/components/hulii/blocks/Cart/OrderSummary'
import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton'
import NoSSR from 'vue-no-ssr'
import { isServer } from '@vue-storefront/core/helpers'

export default {
  name: 'Cart',
  components: {
    CartItems,
    'no-ssr': NoSSR,
    OrderSummary,
    FullButton
  },
  mixins: [CartSummary],
  data () {
    return {
      config: {
        perPageCustom: [[576, 2], [1024, 4]],
        paginationEnabled: true,
        loop: false,
        paginationSize: 6,
        grand_total: null
      }
    }
  },
  computed: {
    ourBestsellersCollection () {
      return this.$store.state.homepage.bestsellers
    }
  },
  metaInfo () {
    return {
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      let ourBestsellersQuery = prepareQuery({ queryConfig: 'bestSellers' })
      store.dispatch('category/list', {}).then(categories => {
        store.dispatch('product/list', {
          query: ourBestsellersQuery,
          size: 8,
          sort: 'created_at:desc'
        }).then(res => {
          if (res) {
            store.state.homepage.bestsellers = res.items
            EventBus.$emitFilter('errorpage-after-load', { store: store, route: route }).then(results => {
              return resolve()
            }).catch(err => {
              console.error(err)
              return resolve()
            })
          }
        })
      })
    })
  },
  // Hide header menu on Compare pages
  beforeMount () {
    this.$store.commit('ui/setHeaderMenu', false)
  },
  mounted () {
    if (!isServer) {
      // let cartItems = this.$store.state.cart.cartItems ? this.$store.state.cart.cartItems : ''
      // let cartProducts = cartItems.map((product, index) => {
      //   return {
      //     product_id: product.sku,
      //     sku: product.sku,
      //     name: product.name,
      //     price: product.priceInclTax,
      //     position: index + 1,
      //     image_url: product.image
      //   }
      // })
      let cartItems = this.$store.state.cart.cartItems ? this.$store.state.cart.cartItems : ''
      let ga4Items = cartItems.map((product, index) => {
        let categories = product.url_path.split('/');
        let slug = categories.pop();
        return {
          item_id: product.sku,
          item_name: product.name,
          currency: 'AUD',
          index: index + 1,
          item_brand: product.brand,
          item_category: categories[0] ? categories[0] : null,
          item_category1: categories[1] ? categories[1] : null,
          item_category2: categories[2] ? categories[2] : null,
          item_category3: categories[3] ? categories[3] : null,
          item_category4: categories[4] ? categories[4] : null,
          item_category5: categories[5] ? categories[5] : null,
          item_category6: categories[6] ? categories[6] : null,
          price: product.priceInclTax,
          shipping_type: product.shipping_type,
          quantity: product.qty,
          seller: product.seller
        }
      });
      this.totals.forEach(segment => {
        if (segment.code == 'grand_total') {
          this.grand_total = segment.value;
        }
      });
      console.log(ga4Items);
      window.gtag('event', 'view_cart', {
        currency: 'AUD',
        value: this.grand_total,
        items: ga4Items
      });
      // window.analytics.track('Cart Viewed', {
      //   cart_id: this.$store.state.cart.cartServerToken ? this.$store.state.cart.cartServerToken : '',
      //   products: cartProducts
      // })

    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';

$color-white: color(white);
$border: mix(#000, $color-white, 10%);
$color-product-bg: #f5f5f5;

$products-column-width-mobile: 140px;
$products-column-width: 280px;
$features-column-width-mobile: 110px;
$features-column-width: 210px;

*,
*::after,
*::before {
  box-sizing: border-box;
}

.cart {
  display: grid;
  grid-template-areas:
    "items items items items"
    "summary summary summary summary";
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 32px;
  margin-top: 30px;

  .cart--items {
    grid-area: items;
    h1 {
      display: flex;
      text-align: left;
      font-size: 1.5rem;
      margin-bottom: 30px;
    }
  }
  .cart--summary {
    grid-area: summary;
  }
  @screen lg {
    grid-template-areas:
      "items items items items items items items items . summary summary summary";
    grid-template-columns: repeat(12, 1fr);
  }
}
.compare {

  &__products-wrapper {
    @apply border-t border-b overflow-x-auto scrolling-touch;
  }

  &__products-columns {
    @apply flex p-0;

    margin: 0 0 0 $features-column-width-mobile;

    @screen lg {
      margin-left: $features-column-width;
    }
  }

  &__products-table {
    @apply relative overflow-hidden;
  }

  &__features {
    @apply border-t border-b absolute pin-t pin-l;

    z-index: 1;
    width: $features-column-width-mobile;
    opacity: .95;

    @screen lg {
      width: $features-column-width;
    }
  }

  &__product {
    @apply list-reset relative text-center float-left;

    width: $products-column-width-mobile;
    transition: opacity .3s, visibility .3s, transform .3s;

    @screen lg {
      width: $products-column-width;
    }
  }

  &__attributes {
    @apply text-xs font-medium leading-tight text-left px-1 py-4;

    @screen lg {
      @apply text-sm px-2 py-6;
    }
  }

  &__top-info {
    @apply border-r bg-grey-lightest text-center relative overflow-hidden cursor-pointer;

    height: 250px;
    width: $products-column-width-mobile;
    transition: height .3s;

    @screen lg {
      height: 385px;
      width: $products-column-width;
    }

    .compare__features & {
      @extend .compare__attributes;
      width: $features-column-width-mobile;
      cursor: auto;

      @screen lg {
        width: $features-column-width;
      }
    }
  }

  &__features-list {
    @apply m-0 p-0;
  }

  &__features-item {
    @extend .compare__attributes;
    @apply text-base border-t border-r overflow-hidden whitespace-no-wrap;

    list-style: none;
    text-overflow: ellipsis;

    .compare__products-columns & {
      @apply font-normal text-center;
    }
  }

  &__remove {
    @apply absolute pin-t pin-r;
  }
}
.bottom-checkout {
  z-index: 300;
}
</style>
