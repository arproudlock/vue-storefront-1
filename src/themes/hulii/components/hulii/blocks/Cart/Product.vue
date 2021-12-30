<template>
  <transition name="fade" appear>
    <div class="items--product" :disabled="{ loading }" :class="{ 'opacity-50 disable-product' : loading}">
      <div class="product--image">
        <router-link
          :to="localizedRoute({
            name: product.type_id + '-product',
            params: {
              parentSku: product.parentSku ? product.parentSku : product.sku,
              slug: product.slug,
              childSku: product.sku
            }
          })"
          data-testid="productLink"
        >
          <img class="blend" v-lazy="thumbnail">
        </router-link>
      </div>
      <div class="flex flex-wrap flex-row w-10/12 justify-around">
        <div class="flex flex-col w-1/2">
          <div class="font-light text-sm text-grey leading-normal">
            {{ product.brand }}
          </div>
          <div class="font-medium cl-accent serif">
            <router-link
              :to="localizedRoute({
                name: product.type_id + '-product',
                params: {
                  parentSku: product.parentSku ? product.parentSku : product.sku,
                  slug: product.slug,
                  childSku: product.sku
                }
              })"
              data-testid="productLink"
            >
              <span class="text-grey-dark hover:text-highlight">{{ product.meta_title | htmlDecode }}</span>
            </router-link>
          </div>
          <div class="mt-2">
            <div>
              <div v-for="(opt) in product.options" :key="opt.label">
                <span class="text-sm leading-normal capitalize">{{ opt.label }}: {{ opt.value }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-1/2 flex-col justify-between">
          <div v-if="!product.totals" class="flex items-end flex-col leading-normal">
            <span class="text-grey-dark block font-semibold" v-if="product.special_price">{{ product.priceInclTax * product.qty | price }} </span>
            <span v-if="!product.special_price" class="font-semibold">{{ product.priceInclTax * product.qty | price }}</span>
          </div>
          <div v-if="product.totals" class="flex items-end flex-col leading-normal">
            <span class="text-grey-dark text-base font-medium block" v-if="product.totals.base_discount_amount">{{ Number(product.totals.row_total_with_discount) | price }}</span>
            <span class="price-original block text-xs text-grey line-through" v-if="product.totals.base_discount_amount">{{ Number(product.totals.row_total) | price }}</span>
            <span v-if="!product.totals.base_discount_amount" class="font-semibold">{{ Number(product.totals.row_total) | price }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm flex justify-end mb-3 mt-4">
              <span class="weight-700 flex text-grey justify-end ml-1 w-full">
                <div class="flex justify-end">
                  <qty-input
                    v-model.number="product.qty"
                    :id="'qty-' + product.sku"
                    :product="product"
                    :max="1"
                    data-testid="productQtyInput"
                    size="md"
                    @qtyChanging="toggleLoading"
                  />
                  <!--<apply-button @click.native="updateQuantity" class="ml-1" />-->
                </div>
              </span>
            </span>
            <div class="flex flex-row justify-end items-center">
              <div @click="removeItem(); segRemoveProduct()" class="ml-4 items-center flex">
                <span class="ml-1 text-xs cursor-pointer text-grey underline">{{ $t('Remove') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Product from '@vue-storefront/core/compatibility/components/blocks/Microcart/Product'
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist'
import { AddToWishlist } from '@vue-storefront/core/modules/wishlist/components/AddToWishlist'
import { RemoveFromWishlist } from '@vue-storefront/core/modules/wishlist/components/RemoveFromWishlist'
import QtyInput from 'theme/components/hulii/DynamicQtyInput'

export default {
  components: {
    QtyInput
  },
  data: function () {
    return {
      loading: false
    }
  },
  created () {
    this.$bus.$on('cart-after-itemchanged', this.onAfterUpdate)
  },
  beforeDestroy () {
    this.$bus.$off('cart-after-itemchanged')
  },
  mixins: [Product, IsOnWishlist, AddToWishlist, RemoveFromWishlist],
  computed: {
    countryOptions () {
      const list = [{'id': '1', 'value': '1'}, {'id': '2', 'value': '2'}, {'id': '3', 'value': '3'}, {'id': '4', 'value': '4'}, {'id': '5', 'value': '5'}, {'id': '6', 'value': '6'}, {'id': '7', 'value': '7'}, {'id': '8', 'value': '8'}, {'id': '9', 'value': '9'}]
      return list.map((item) => {
        return {
          value: item.id,
          label: item.value
        }
      })
    },
    getStarRating () {
      const rating = 3.4
      return rating
    },
    getReviewCounts () {
      // TODO get review dynamically
      const reviews = 133
      return reviews
    }
  },
  methods: {
    onAfterUpdate (value) {
      this.loading = false
    },
    segRemoveProduct () {
      window.analytics.track('Product Removed', {
        cart_id: this.$store.state.cart.cartServerToken ? this.$store.state.cart.cartServerToken : '',
        product_id: this.product.sku,
        sku: this.product.sku,
        name: this.product.name,
        brand: this.product.brand,
        variant: this.product.options ? this.product.options[0].label + ' - ' + this.product.options[0].value : '',
        price: this.product.priceInclTax,
        quantity: this.product.qty,
        url: this.$route.path,
        image_url: this.product.image
      })
      let categories = this.product.url_path.split('/');
      let slug = categories.pop();
      let ga4Item = {
        item_id: this.product.sku,
        item_name: this.product.name,
        currency: 'AUD',
        item_brand: this.product.brand,
        item_category: categories[0] ? categories[0] : null,
        item_category1: categories[1] ? categories[1] : null,
        item_category2: categories[2] ? categories[2] : null,
        item_category3: categories[3] ? categories[3] : null,
        item_category4: categories[4] ? categories[4] : null,
        item_category5: categories[5] ? categories[5] : null,
        item_category6: categories[6] ? categories[6] : null,
        price: this.product.priceInclTax,
        shipping_type: this.product.shipping_type,
        quantity: this.product.qty,
        seller: this.product.seller
      };
      console.log(ga4Item);
      window.gtag('event', 'remove_from_cart', {
        currency: 'AUD',
        value: this.product.priceInclTax,
        items: ga4Item
      });
    },
    toggleLoading () {
      this.loading = !this.loading
    }
  }
}
</script>
<style lang="scss">
.items--product {
  @apply flex flex-row mb-4 pt-4;
  border-top: 1px solid #e7e7e7;

  .product--image {
    @apply flex w-2/12 pr-3;

    img {
      width: auto;
      height: auto;
      max-width: 100%;
    }
  }

}
.input-max-width {
  max-width: 150px;
}
.disable-product {
  pointer-events: none;
}
</style>
