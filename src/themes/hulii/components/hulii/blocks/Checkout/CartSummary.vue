<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div>
    <div class="cart--summary">
      <div class="summary--content">
        <router-link :to="localizedRoute('/cart')" class="summary--header">
          <h2>{{ $t('Order Summary') }}</h2>
        </router-link>
        <product v-for="product in productsInCart" :key="product.sku" :product="product" />
      </div>
      <div class="summary--discounts">
        <router-link :to="localizedRoute('/cart')" class="discounts--link">
          {{ $t('Have a discount code?') }}
        </router-link>
      </div>
      <div v-if="productsInCart && productsInCart.length" class="summary--totals">
        <div v-for="(segment, index) in totals" :key="index" class="totals--item" v-if="segment.code !== 'grand_total'">
          <!-- v-if="segment.code !== 'grand_total' && segment.code !== 'tax'" -->
          <div class="totals--label">
            {{ segment.title }}
          </div>
          <div v-if="segment.value != null" class="totals--value">
            {{ segment.value | price }}
          </div>
        </div>

        <div class="totals--item" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
          <div class="grand--label">
            {{ segment.title }}
          </div>
          <div class="grand--value">
            {{ segment.value | price }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary'
import Product from './Product'

export default {
  components: {
    Product
  },
  mixins: [CartSummary]
}
</script>

<style lang="scss" scoped>
  .cart--summary {
    .summary--content {
      padding-bottom: 150px;
      .summary--header {
        @apply flex justify-center mb-4;
        color: #000;
        h2 {
          @apply mb-4;
          font-size: 1.5rem;
        }
      }
    }
    .summary--totals {
      border-top: 1px solid #e7e7e7;
      padding: 20px 30px 50px 40px;
      box-sizing: border-box;
      right: 0;
      position: absolute;
      // bottom: 30px;
      width: 100%;

      .totals--item {
        @apply flex flex-row justify-between;

        .totals--label, .totals--value {
          @apply text-grey;
        }
        .grand--label, .grand--value {
          @apply text-hulii-turquoise mt-4 font-semibold;
        }
      }
    }

    .summary--discounts {
      @apply text-grey;
      padding: 20px 30px 50px 40px;

      .discounts--link {
        @apply text-hulii-turquoise;
      }
    }
  }
</style>
