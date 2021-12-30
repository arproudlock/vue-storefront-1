<template>
  <transition name="fade" appear>
    <div class="cart--product" :disabled="{ loading }" :class="{ 'opacity-50 disable-product' : loading}">
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
      <div class="product--contents-container">
        <div class="product--contents">
          <div class="contents--price">
            <div v-if="product.special_price > 0">
              <div class="flex flex-row">
                <div class="flex">
                  <span class="price--full">
                    {{ product.priceInclTax | price }}
                  </span>
                </div>
                <div class="flex flex-row items-end">
                  <span class="price--original">
                    {{ product.originalPriceInclTax | price }}
                  </span>
                </div>
              </div>
            </div>
            <div v-if="!product.special_price && product.priceInclTax">
              <span class="font-bold">
                {{ product.priceInclTax | price }}
              </span>
            </div>
          </div>
          <div class="contents--title">
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
              <span class="text-grey-dark hover:text-hulii-purple">{{ product.name | htmlDecode }}</span>
            </router-link>
          </div>
          <div class="contents--details">
            <div v-if="product.totals" class="details--items">
              <div v-for="(opt) in product.totals.options" :key="opt.label">
                <span class="text-sm">{{ opt.label }}: {{ opt.value }}</span>
              </div>
              <span class="text-sm mt-1">Qty: {{ product.totals.qty }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Product from '@vue-storefront/core/compatibility/components/blocks/Microcart/Product'

export default {
  data: function () {
    return {
      loading: false
    }
  },
  created () {
    this.$bus.$on('cart-after-update-completion', this.onAfterUpdate)
  },
  beforeDestroy () {
    this.$bus.$off('cart-after-update-completion')
  },
  mixins: [Product],
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
    toggleLoading () {
      this.loading = !this.loading
    }
  }
}
</script>
<style lang="scss">
.cart--product {
  @apply flex flex-wrap mt-3 p-4;

  .product--image {
    @apply w-2/5 flex items-center;

    img {
      width: auto;
      height: auto;
      max-width: 100%;
    }
  }
  .product--contents-container {
    @apply flex flex-wrap flex-row w-3/5 justify-around;

    .product--contents {
    @apply flex flex-col w-full;

      .contents--title {
        @apply mt-2;
        font-weight: 500;
        color: #000;
      }
      .contents--price {
        .price--full {
          @apply font-bold text-hulii-purple mr-4;
        }
        .price--original {
          @apply font-bold text-grey line-through;
        }
      }
      .contents--details {
        .details--items {
          @apply flex items-start flex-col text-grey mt-2;
        }
      }
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
