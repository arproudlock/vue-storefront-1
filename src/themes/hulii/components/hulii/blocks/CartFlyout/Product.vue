<template>
  <div class="cart--product">
    <div class="product--image">
      <img class="blend" v-lazy="thumbnail">
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
          <span class="text-grey-dark hover:text-hulii-purple">{{ product.meta_title | htmlDecode }}</span>
        </div>
        <div class="contents--details">
          <div v-for="opt in product.options" :key="opt.label" class="details--items">
            <span class="text-sm capitalize">{{ opt.label }}: {{ opt.value }}</span>
          </div>
          <div class="details--item">
            <span class="text-sm text-grey">Qty: {{ product.qty }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@vue-storefront/core/compatibility/components/blocks/Microcart/Product'

export default {
  mixins: [Product]
}
</script>
<style lang="scss">
.flyout--image {
  max-width: 110px;
  height: auto;
}
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
    @apply flex flex-col w-full justify-center;

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
</style>
