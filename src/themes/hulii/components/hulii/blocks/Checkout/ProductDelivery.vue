<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="radioStyled options--label summary--product-delivery">
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
          {{ $t('Shipped By ') }}:
          <span>
            {{ product.seller_name }}
          </span>
        </span>
      </div>
      <div class="product--price">
        <div>
          <!-- <span class="h4 cl-error" v-if="product.totals.base_discount_amount">{{ Number(product.totals.row_total_with_discount) | price }} </span> -->
          <!-- <br> -->
          <span class="price-original h5">Expect delivery in {{ product.shipping_from }} - {{ product.shipping_to }} working days.</span>
          <!-- <span v-if="!product.totals.base_discount_amount" class="h4">{{ Number(product.totals.row_total) | price }}</span> -->
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
.summary--product-delivery {
  @apply flex flex-row mb-8 mt-8;
  padding: 0 20px;
  // max-width: 400px;
  // border: 1px solid black;

  img {
    max-width: 80px;
    max-height: 84px;
  }

  .product--image {
    max-width: 80px;
    max-height: 84px;
    padding-bottom: 50px;
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
      @apply flex justify-start;
      @apply text-grey;
      font-size: 14px;
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
