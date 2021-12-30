<template>
  <div
    class="right-sidebar microcart max-w-full fixed bg-grey-lighter"
    :class="{ active: showMicrocart }"
    data-testid="microcart"
  >
    <div class="microcart--container">
      <div class="microcart--header">
        <button
          type="button"
          :aria-label="$t('Close')"
          class="close--button"
          @click="closeMicrocartExtend"
          data-testid="closeMicrocart"
        >
          <i class="material-icons">
            close
          </i>
        </button>
        <div class="header--title">
          <span>{{ $t('Added to Cart') }}</span>
        </div>
        <div />
      </div>
      <div class="internal-container">
        <div class="products p-0 m-0 px-6 bg-white">
          <product :key="product.sku" :product="product" />
        </div>
        <div class="mt-4 bg-white px-6 flex flex-row">
          <router-link
            class="w-1/2 mr-1"
            :to="localizedRoute({ name: 'checkout' })"
            @click.native="goToCheckout"
          >
            <full-button bg-color="hulii-turquoise" text="Checkout" link="/checkout" size="large" />
          </router-link>
          <router-link
            class="w-1/2 ml-1"
            :to="localizedRoute({ name: 'cart' })"
            @click.native="goToCheckout"
          >
            <full-button bg-color="hulii-purple" text="View Cart" link="/cart" size="large" />
          </router-link>
        </div>
        <crosssell
          v-if="upsellLinks.length > 0"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import Microcart from '@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart'
import VueOfflineMixin from 'vue-offline/mixin'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton'
import Product from './Product'
import Crosssell from './Crosssell/Crosssell'
import filter from 'lodash-es/filter'

export default {
  components: {
    Product,
    FullButton,
    Crosssell
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
      txt: '',
      product: {}
    }
  },
  computed: {
    showMicrocart () {
      return this.isMicrocartOpen && this.componentLoaded
    },
    upsellLinks () {
      let upsellLinks = filter(this.product.product_links, l => {
        return l.link_type === 'crosssell'
      })
      return upsellLinks
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
  mounted () {
    this.product = this.$store.state.ui.flyoutcart
    this.$store.commit('ui/setMaxOverlay', true)
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
    goToCheckout () {
      this.$store.commit('ui/setMicrocart', false)
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

<style lang="scss">
  .heading {
    @media (max-width: 767px) {
      margin: 12px 0 12px 15px;
      font-size: 24px;
    }
  }
  .microcart {
    transition: width 2s;
    transition: transform 300ms cubic-bezier(1, 0.93, 1, -0.95), -webkit-transform 300ms cubic-bezier(.4, 0, .2, 1);

    .microcart--container {
      @apply overflow-auto h-full;

      .microcart--header {
        @apply flex flex-row items-center justify-between mb-4 bg-white;

        .close--button {
          background: none;
          border: 0;
          cursor: pointer;
          font-size: 0;
          @apply pin-t pin-r m-4;
        }

        .header--title {
          font-weight: 700;
          font-size: 1.5rem;
        }
      }
    }
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
      @apply text-highlight;

      .disabled {
        @apply bg-transparent;
      }
    }
  }
</style>
