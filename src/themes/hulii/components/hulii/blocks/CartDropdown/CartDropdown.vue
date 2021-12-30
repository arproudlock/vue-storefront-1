<template>
  <div class="dropdown--cart">
    <no-ssr>
      <div class="cart--products" v-if="productsInCart.length">
        <product v-for="product in productsInCart" :key="product.sku" :product="product" />
      </div>
    </no-ssr>
    <no-ssr>
      <div v-if="!productsInCart.length">
        <div class="my-3 p-2 cart-dropdown--empty">
          <empty-account-icon />
          <h3 class="text-base font-semibold text-center mt-4">
            {{ $t('Your cart is empty!') }}
          </h3>
          <p class="text-base text-center mb-1">
            {{ $t('Fill your shopping cart to give it purpose.') }}
          </p>
          <p class="text-base text-center mb-1 mt-0">
            {{ $t('Continue shopping on') }}
            <router-link :to="localizedRoute('/')" exact class="text-highlight">
              {{ $t('Hulii') }}
            </router-link>
          </p>
        </div>
      </div>
    </no-ssr>
    <no-ssr>
      <div class="cart--button" v-if="productsInCart.length">
        <full-button size="large" bg-color="hulii-turquoise" text="Checkout" link="/checkout" class="btn" />
        <router-link :to="localizedRoute('/cart')" class="button--link">
          {{ $t('View Cart') }}
        </router-link>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import Product from './Product'
import Microcart from '@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart'
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton'
import NoSSR from 'vue-no-ssr'
import EmptyAccountIcon from './EmptyAccountIcon'

export default {
  components: {
    Product,
    FullButton,
    'no-ssr': NoSSR,
    EmptyAccountIcon
  },
  data () {
    return {
      totalAmount: {}
    }
  },
  mixins: [
    Microcart
  ],
  mounted () {
    const vm = this
    vm.totalAmount.value = this.totals.find(v => v.code === 'grand_total').value
  }
}
</script>

<style lang="scss">
.dropdown--cart {
  @apply w-full cursor-default;

  .cart--products {
    @apply product-listing px-2 pb-2;
  }
  .cart--button {
    @apply p-4 flex flex-col justify-center;
    border-top: 2px solid #fafafb;

    .btn {
      min-height: 48px;
      font-weight: 600;
      font-size: 1rem;
      display: flex;
      justify-content: center;
    }

    .button--link {
      @apply text-grey text-center mt-4;
      font-weight: 600;
    }
  }
}
.product-listing {
    max-height: 270px;
    overflow-x: hidden;
    overflow-y: auto;
}
.cart-dropdown--empty {
  svg {
    display: flex;
    width: 100px;
    margin: auto;
  }
}
</style>
