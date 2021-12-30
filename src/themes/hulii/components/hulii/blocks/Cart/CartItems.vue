<template>
  <div>
    <no-ssr>
      <div class="cart-items--content" v-if="productsInCart.length">
        <div class="items--header">
          <h2 v-if="productsInCart.length === 1">
            {{ $t('Your Cart') }} ({{ productsInCart.length }} {{ $t('item') }})
          </h2>
          <h2 v-if="productsInCart.length > 1">
            {{ $t('Your Cart') }} ({{ productsInCart.length }} {{ $t('items') }})
          </h2>
        </div>
        <div class="items--products" :class="{'items--multiple' : productsInCart.length === 1}">
          <product class="rounded w-full bg-white" v-for="product in productsInCart" :key="product.sku" :product="product" />
        </div>
      </div>
    </no-ssr>
    <no-ssr>
      <div v-if="!productsInCart.length">
        <div class="mt-3">
          <h1 class="mt-0">
            {{ $t('Something missing?') }}
          </h1>
          <span class="text-base">{{ $t('Fill your shopping cart to give it purpose.') }}</span>
          <div class="cart--items--button">
            <full-button bg-color="hulii-turquoise" text-color="white" text="Continue Shopping" size="large" link="/" />
          </div>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
// TODO set the max of each product for the increase qty
// TODO Replace the dropdown notifications with an inline solution.

import i18n from '@vue-storefront/i18n'
import Microcart from '@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart'
import VueOfflineMixin from 'vue-offline/mixin'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import Product from './Product'
import NoSSR from 'vue-no-ssr'
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton'

export default {
  components: {
    Product,
    'no-ssr': NoSSR,
    FullButton
  },
  mixins: [
    Microcart,
    VueOfflineMixin,
    onEscapePress
  ],
  data () {
    return {
      addCouponPressed: false,
      couponCode: '',
      componentLoaded: false,
      windowHeight: 0,
      txt: ''
    }
  },
  watch: {
    windowHeight (newHeight, oldHeight) {
      this.txt = `it changed to ${newHeight} from ${oldHeight}`
    }
  },
  props: {
    isCheckoutMode: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  computed: {
    showMicrocart () {
      return this.isMicrocartOpen && this.componentLoaded
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
      window.addEventListener('resize', () => {
        this.windowHeight = window.innerHeight
      })
    })
  },
  methods: {
    addDiscountCoupon () {
      this.addCouponPressed = true
    },
    clearCoupon () {
      this.removeCoupon()
      this.addCouponPressed = false
    },
    setCoupon () {
      this.applyCoupon(this.couponCode).then(() => {
        this.addCouponPressed = false
        this.couponCode = ''
      }).catch(() => {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t("You've entered an incorrect coupon code. Please try again."),
          action1: { label: i18n.t('OK') }
        })
      })
    },
    closeMicrocartExtend () {
      this.closeMicrocart()
      this.$store.commit('ui/setSidebar', false)
      this.addCouponPressed = false
    },
    onEscapePress () {
      this.closeMicrocart()
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-items--content {
  .items--header {
    @apply mb-4;
    h2 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
  }
  .items--products {
    @apply flex flex-col;
  }
}
  .heading {
    @media (max-width: 767px) {
      margin: 12px 0 12px 15px;
      font-size: 24px;
    }
  }
  .microcart {
    transition: width 2s;
    transition: transform 300ms cubic-bezier(1, 0.93, 1, -0.95), -webkit-transform 300ms cubic-bezier(.4, 0, .2, 1);
  }
  .vue-simple-progress, .vue-simple-progress-bar {
    border-radius: 1rem;
  }
  .cart-bottom {
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, .24);
  }
  .internal-container {
    height: calc(100vh - 60px);
  }
  .coupon__inner-button {

    button {
      background: transparent !important;
      @apply text-highlight;

      .disabled {
        @apply bg-transparent;
      }
    }
  }
  .cart--items--button {
    @apply mt-4;
    max-width: 250px;
  }
</style>
