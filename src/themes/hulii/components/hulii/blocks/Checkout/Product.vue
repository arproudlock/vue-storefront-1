<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="summary--product">
    <product-image :image="image" class="product--image" />
    <div class="product--details">
      <div class="product--title">
        {{ product.meta_title | htmlDecode }}
      </div>
      <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
        {{ product.errors | formatProductMessages }}
      </div>
      <div class="product--total-options" v-if="product.totals && product.totals.options">
        <div v-for="opt in product.totals.options" :key="opt.label">
          <span class="opn">{{ opt.label }}: </span>
          <span class="opv" v-html="opt.value" />
        </div>
      </div>
      <div class="product--options" v-else-if="product.options">
        <div v-for="opt in product.options" :key="opt.label">
          <span class="opn">{{ opt.label }}: </span>
          <span class="opv" v-html="opt.value" />
        </div>
      </div>
      <div>
        <span class="product--quantity">
          {{ $t('Qty') }}:
          <span>
            {{ product.qty }}
          </span>
        </span>
      </div>
      <div class="product--price">
        <div v-if="isOnline && product.totals">
          <span class="h4 cl-error" v-if="product.totals.base_discount_amount">{{ Number(product.totals.row_total_with_discount) | price }} </span>
          <span class="price-original h5" v-if="product.totals.base_discount_amount">{{ Number(product.totals.row_total) | price }}</span>
          <span v-if="!product.totals.base_discount_amount" class="h4">{{ Number(product.totals.row_total) | price }}</span>
        </div>
        <div v-else>
          <span class="h4 cl-error" v-if="product.special_price">{{ product.priceInclTax * product.qty | price }} </span>
          <span class="price-original h5" v-if="product.special_price">{{ product.originalPriceInclTax * product.qty | price }}</span>
          <span v-if="!product.special_price" class="h4">{{ product.priceInclTax * product.qty | price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Product } from '@vue-storefront/core/modules/checkout/components/Product'
import { onlineHelper } from '@vue-storefront/core/helpers'
import ProductImage from 'theme/components/hulii/ProductImage'

export default {
  computed: {
    isOnline () {
      return onlineHelper.isOnline
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    }
  },
  mixins: [Product],
  components: {
    ProductImage
  }
}
</script>

<style lang="scss" scoped>
.summary--product {
  @apply flex flex-row mb-8 mt-8;
  padding: 0 20px;

  .product--image {
    max-width: 80px;
    padding-bottom: calc(700% / (600 / 20));
  }
  .product--details {
    @apply w-full;

    .product--title {
      @apply mb-2;
      font-weight: 500;
      font-size: 16px;
    }
    .product--total-options {
      @apply text-grey;
      font-size: 14px;
    }
    .product--options {
      @apply text-grey;
      font-size: 14px;
    }
    .product--quantity {
      @apply text-grey;
      font-size: 14px;
    }
    .product--price {
      @apply flex justify-end;
      font-weight: 500;
      span {
        font-size: 16px;
      }
    }
  }
}
</style>
