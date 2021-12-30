<template>
  <div class="order-summary">
    <no-ssr>
      <div v-if="productsInCart && productsInCart.length">
        <div class="summary--header">
          <h2>{{ $t('Order Summary') }}</h2>
        </div>
        <div class="summary--details">
          <div v-for="(segment, index) in totals" :key="index" class="flex flex-row details--item" v-if="segment.code !== 'grand_total'">
            <!-- <div v-for="(segment, index) in totals" :key="index" class="flex flex-row details--item" v-if="segment.code !== 'grand_total' && segment.code !== 'tax'"> -->
            <span class="details--title">{{ segment.title }}</span>
            <span class="flex text-right">{{ segment.value | price }}</span>
          </div>
        </div>
        <div class="summary--total">
          <div class="flex">
            {{ $t('Order Total') }}
          </div>
          <!-- <button v-if="appliedCoupon || segment.code === 'discount'" type="button" class="close delete-button" @click="clearCoupon">
            <font-awesome-icon icon="close" /> Remove Discount
          </button> -->
          <div v-for="(segment, index) in totals" :key="index" class="flex text-right" v-if="segment.code === 'grand_total'">
            {{ segment.value | price }}
          </div>
          <div class="total--conditions">
            <p class="conditions--contents">
              {{ $t('By placing this order you agree to') }}
              <router-link target="_blank" :to="localizedRoute('/help-center/terms-of-use')" class="contents--link">
                {{ $t('Hulii\'s terms') }}
              </router-link>
            </p>
          </div>
        </div>
        <!-- Add Coupon -->
        <div v-if="productsInCart.length">
          <div class="row py20">
            <div v-if="OnlineOnly && !addCouponPressed && !appliedCoupon" class="col-xs-12">
              <full-button
                bg-color="hulii-turquoise" text-color="white"
                @click.native="addDiscountCoupon" text="Enter discount code"
              >
                {{ $t('Enter discount code') }}
              </full-button>
            </div>
            <div v-if="OnlineOnly && addCouponPressed" class="col-xs-12 coupon-wrapper">
              <div class="coupon-input">
                <!-- <label class="h6 cl-secondary p-1">{{ $t('Discount code') }}</label> -->
                <base-input type="text" id="couponinput" :autofocus="false" v-model.trim="couponCode" @keyup.enter="setCoupon" placeholder="Discount Code" />
              </div>
              <full-button class="pt-1" bg-color="hulii-turquoise" text-color="white" :disabled="!couponCode" @click.native="setCoupon" text="Add discount code">
                {{ $t('Add discount code') }}
              </full-button>
            </div>
          </div>
        </div>
        <div class="summary--button">
          <full-button bg-color="hulii-turquoise" size="large" text="Proceed to Checkout" link="/checkout" class="w-full button--checkout" />
          <div class="button--conditions">
            <p class="conditions--contents">
              {{ $t('Some rules and restrictions may apply') }}.
              <router-link target="_blank" :to="localizedRoute('/help-center/terms-of-use')" class="contents--link">
                {{ $t('See Details.') }}
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </no-ssr>
    <div class="summary--payment">
      <img
        src="/assets/components/payment/visa-grey.svg"
        v-lazy="'/assets/components/payment/visa-grey.svg'"
        alt="Visa"
      >
      <img
        src="/assets/components/payment/american-express-grey.svg"
        v-lazy="'/assets/components/payment/american-express-grey.svg'"
        alt="American Express"
      >
      <!-- <img
        src="/assets/components/payment/paypal-grey.svg"
        v-lazy="'/assets/components/payment/paypal-grey.svg'"
        alt="Paypal"
      > -->
      <img
        src="/assets/components/payment/mastercard-grey.svg"
        v-lazy="'/assets/components/payment/mastercard-grey.svg'"
        alt="Mastercard"
      >
    </div>
    <div class="summary--trustpilot">
      <trustpilot-micro-score />
    </div>
    <div class="my-3 border-t pt-3">
      <div class="flex-row flex pt-3">
        <font-awesome-icon class="mr-2 mt-3" icon="lock" />
        <div class="flex flex-col text-sm">
          <p class="font-semibold flex">
            {{ $t('Secure Shopping') }}
          </p>
          <p class="flex text-grey">
            {{ $t('Our checkout meets the credit card industry’s rigorous PCI security standards') }}.
          </p>
        </div>
      </div>
      <div class="flex-row flex pt-3">
        <font-awesome-icon class="mr-2 mt-3 small-icon" icon="eye-slash" />
        <div class="flex flex-col text-sm">
          <p class="font-semibold flex">
            {{ $t('Privacy Protection') }}
          </p>
          <p class="flex text-grey">
            {{ $t('Your privacy is always our number-one priority') }}.
          </p>
        </div>
      </div>
      <div class="flex-row flex pt-3">
        <font-awesome-icon class="mr-2 mt-3" icon="phone" />
        <div class="flex flex-col text-sm">
          <p class="font-semibold flex">
            {{ $t('Exceptional Customer Service') }}
          </p>
          <p class="flex text-grey">
            {{ $t('We’ve got your back. Chat to us live 7 days a week') }}.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import NoSSR from 'vue-no-ssr'
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary'
import VueOfflineMixin from 'vue-offline/mixin'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton'
import TrustpilotMicroScore from 'theme/components/hulii/blocks/Trustpilot/TrustpilotMicroScore'
import BaseInput from 'theme/components/hulii/blocks/Form/BaseInput'

export default {
  components: {
    'no-ssr': NoSSR,
    FullButton,
    TrustpilotMicroScore,
    BaseInput
  },
  mixins: [
    CartSummary,
    VueOfflineMixin,
    onEscapePress
  ],
  data () {
    return {
      addCouponPressed: false,
      couponCode: '',
      appliedCoupon: false,
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
      this.appliedCoupon = false
    },
    setCoupon () {
      this.applyCoupon(this.couponCode).then((response) => {
        this.addCouponPressed = false
        this.couponCode = ''
        console.log(response)
        if (response) {
          this.appliedCoupon = true
          this.$store.dispatch('notification/spawnNotification', {
            type: 'info',
            message: i18n.t('Discount code applied.'),
            action1: { label: i18n.t('OK') }
          })
        } else {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'warning',
            message: i18n.t("You've entered an incorrect discount code. Please try again."),
            action1: { label: i18n.t('OK') }
          })
        }
      }).catch(() => {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t("You've entered an incorrect discount code. Please try again."),
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
  .order-summary {
    @apply flex flex-col justify-center;

    .summary--header {
      @apply mb-4;
      border-bottom: 1px solid #e7e7e7;

      h2 {
        @apply mb-4;
        font-size: 1.5rem;
      }
    }
    .summary--details {
      @apply flex flex-col justify-between mb-4 text-grey-dark text-sm pb-4;
      border-bottom: 1px solid #e7e7e7;

      .details--item {
        @apply flex justify-between mt-2;
        &:nth-of-type(1) {
          @apply mt-0;
        }
      }
    }
    .summary--total {
      @apply flex flex-wrap justify-between mb-4 text-hulii-turquoise font-semibold pb-4;
      border-bottom: 1px solid #e7e7e7;

      .total--conditions {
        @apply block w-full mt-1;

        .conditions--contents {
          @apply text-xxs block w-full font-thin mb-0 text-center;
          color: #000;

          .contents--link {
            @apply ml-1 underline;
          }
        }
      }
    }
    .summary--button {
      @apply flex flex-col w-full pb-4 mb-4;
      border-bottom: 1px solid #e7e7e7;

      .button--conditions {
        @apply flex w-full text-center;

        .conditions--contents {
          @apply text-xxs block w-full font-thin text-center mb-0;

          .contents--link {
            @apply ml-1 underline;
          }
        }
      }

      .button--checkout {
        min-height: 48px;
        font-weight: 600;
        font-size: 1rem;
        text-align: center;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .summary--payment {
      @apply w-full mb-4 pb-4;
      border-bottom: 1px solid #e7e7e7;
      margin: 0px auto;
      display: flex;
      justify-content: space-between;
      img {
        width: auto;
        opacity: 0.575;
      }
    }
    .summary--trustpilot {
      @apply flex w-full mt-3 border-t justify-center;
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
  .cart-bottom {
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, .24);
  }
  .internal-container {
    height: calc(100vh - 60px);
  }
  .coupon__inner-button {
    margin-left: -74px !important;

    button {
      @apply text-white bg-highlight;
      color: white !important;
      box-shadow: none !important;

      &:hover {
        box-shadow: none !important;
      }

      .disabled {
        @apply bg-highlight;
        opacity: 0.8;
      }
    }
  }
  .checkout--payment-icon {
    max-height: 25px;
  }
</style>
