<template>
  <div id="checkout">
    <section class="checkout--container" v-show="!isThankYouPage">
      <checkout-header :active-section="activeSection" />
      <div class="checkout--contents">
        <transition name="fade" mode="out-in">
          <personal-details
            class="relative"
            v-if="!currentUser"
            :is-active="activeSection.personalDetails"
            :focused-field="focusedField"
          />
        </transition>
        <transition name="fade" mode="out-in">
          <shipping class="relative" :is-active="activeSection.shipping" v-if="!isVirtualCart" />
        </transition>
        <transition name="fade" mode="out-in">
          <delivery class="relative" :is-active="activeSection.delivery" v-if="!isVirtualCart" />
        </transition>
        <transition name="fade" mode="out-in">
          <payment class="relative" :is-active="activeSection.payment" />
        </transition>
        <transition name="fade" mode="out-in">
          <order-review class="relative" :is-active="activeSection.orderReview" />
        </transition>
        <div id="custom-steps" />
      </div>
    </section>
    <section class="checkout--summary" v-show="!isThankYouPage">
      <div class="summary--container">
        <cart-summary />
      </div>
    </section>
    <thank-you-page v-show="isThankYouPage" />
  </div>
</template>

<script>
import Checkout from '@vue-storefront/core/pages/Checkout'
import CheckoutHeader from 'theme/components/hulii/blocks/Checkout/Header'
import PersonalDetails from 'theme/components/hulii/blocks/Checkout/PersonalDetails'
import Shipping from 'theme/components/hulii/blocks/Checkout/Shipping'
import Delivery from 'theme/components/hulii/blocks/Checkout/Delivery'
import Payment from 'theme/components/hulii/blocks/Checkout/Payment'
import OrderReview from 'theme/components/hulii/blocks/Checkout/OrderReview'
import CartSummary from 'theme/components/hulii/blocks/Checkout/CartSummary'
import ThankYouPage from 'theme/components/hulii/blocks/Checkout/ThankYouPage'
import { mapState } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  components: {
    PersonalDetails,
    Shipping,
    Payment,
    OrderReview,
    CartSummary,
    ThankYouPage,
    CheckoutHeader,
    Delivery
  },
  data () {
    return {
      activeSection: {
        personalDetails: true,
        shipping: false,
        delivery: false,
        payment: false,
        orderReview: false
      }
    }
  },
  mixins: [Checkout],
  computed: {
    ...mapState({
      currentUser: state => state.user.current
    })
  },
  beforeMount () {
    this.$bus.$on('checkout-after-deliveryDetails', this.onAfterDeliveryDetails)
    const storeView = currentStoreView()
    if (this.currentUser) {
      this.activeSection.shipping = true
      this.activeSection.personalDetails = false
      let userDetails
      userDetails.emailAddress = this.currentUser.email
      userDetails.firstName = this.currentUser.firstname
      userDetails.lastName = this.currentUser.lastname
      this.$bus.$emit('checkout-after-personalDetails', userDetails, true)
    }
  },
  beforeDestroy () {
    this.$bus.$off('checkout-after-deliveryDetails', this.onAfterDeliveryDetails)
  },
  methods: {
    notifyEmptyCart () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Shopping cart is empty. Please add some products before entering Checkout'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyOutStock (chp) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: chp.name + this.$t(' is out of the stock!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyNotAvailable () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('Some of the ordered products are not available!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyStockCheck () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Stock check in progress, please wait while available stock quantities are checked'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyNoConnection () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('There is no Internet connection. You can still place your order. We will notify you if any of ordered products is not available because we cannot check it right now.'),
        action1: { label: this.$t('OK') }
      })
    },
    onAfterPersonalDetails (receivedData, validationResult) {
      this.personalDetails = receivedData
      this.validationResults.personalDetails = validationResult

      if (this.isVirtualCart === true) {
        this.activateSection('payment')
      } else {
        this.activateSection('shipping')
        this.$bus.$emit('load-shipping');
      }
      this.savePersonalDetails()
      this.focusedField = null
    },
    onAfterShippingDetails (receivedData, validationResult) {
      this.shipping = receivedData
      this.validationResults.shipping = validationResult
      this.activateSection('delivery')
      this.saveShippingDetails()

      const storeView = currentStoreView()
      storeView.tax.defaultCountry = this.shipping.country
    },
    onAfterDeliveryDetails (receivedData, validationResult) {
      this.shipping = receivedData
      this.validationResults.shipping = validationResult
      this.activateSection('payment')
      this.saveShippingDetails()

      const storeView = currentStoreView()
      storeView.tax.defaultCountry = this.shipping.country
    }
  }
}
</script>

<style lang="scss">
  @import '~theme/css/base/text';
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $bg-secondary: color(secondary, $colors-background);
  $color-tertiary: color(tertiary);
  $color-secondary: color(secondary);
  $color-error: color(error);
  $color-white: color(white);
  $color-black: color(black);

  #checkout {
    @apply flex;
    .checkout--container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      flex: 1;

      margin-left:5px;
      margin-right:5px;
      @screen md {
        margin-left: 32px;
        margin-right: 32px;
      }

      .checkout--contents {
        @apply mt-8;
        width: 100%;
        display: flex;
        justify-content: center;
        padding-bottom: 100px;
        .checkout--registration {
          @apply w-full;
          max-width: 400px;
        }
        .checkout--shipping, .checkout--delivery, .checkout--payment {
          @apply w-full;
          max-width: 572px;
          margin-top: 20px;

          @screen md {
            @apply mt-0;
          }

          @screen lg {
            padding: 0;
          }
        }
      }
    }
    .checkout--summary {
      @apply bg-grey-lighter hidden;
      border-left: 5px solid #18b9a1;
      min-height: 100vh;
      width: 400px;

      @screen md {
        @apply flex flex-col;
      }

      .summary--container {
        @apply h-full;
        margin-top: 5px;
        position: relative;

        .summary--header {
          @apply flex justify-center;
          color: #000;
          border-bottom: 1px solid #e7e7e7;
          margin-left: 20px;
          margin-right: 20px;
          h2 {
            font-size: 1.5rem;
            margin-bottom: 10px;
          }
        }
      }
    }

    .checkout--payment {
      .radioStyled {
        @apply mb-0;
        transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
        cursor: pointer;
        user-select: none;
        border: none;
        padding: 0;

        &.options--open {
        }

        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .checkmark {
          position: absolute;
          top: 0px;
          left: 0px;

          height: 19px;
          width: 19px;
          border-radius: 50%;
          border: 1px solid #bdbdbd;

          @screen md {
            left: -30px;
          }

          &:after {
            @apply bg-hulii-turquoise;
            content: "";
            position: absolute;
            display: none;
            top: 2px;
            left: 2px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
          }
        }

        input:checked ~ .checkmark:after {
          display: block;
        }

        .options--label {
          padding-left:30px;
          @screen md {
            padding-left: 0px;
          }
        }
      }
    }

    .number-circle {
      width: 35px;
      height: 35px;

      @media (max-width: 768px) {
        width: 25px;
        height: 25px;
        line-height: 25px;
      }
    }
    .radioStyled {
      @apply mb-4;
      display: flex;
      position: relative;
      border: 1px solid #bdbdbd;
      border-radius: 5px;
      padding: 20px 20px 20px 43px;
      line-height: 18px;
      transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
      cursor: pointer;
      user-select: none;

      &.options--open {
      }

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }

      .checkmark {
        position: absolute;
        top: 30px;
        left: 9px;
        height: 19px;
        width: 19px;
        border-radius: 50%;
        border: 1px solid #bdbdbd;

        &:after {
          @apply bg-hulii-turquoise;
          content: "";
          position: absolute;
          display: none;
          top: 2px;
          left: 2px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
        }
      }

      input:checked ~ .checkmark:after {
        display: block;
      }
    }
  }

  .line {
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 37px;
      z-index: -1;
      width: 1px;
      height: 100%;
      background-color: $bg-secondary;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .checkout-title {
    @media (max-width: 767px) {
      background-color: $bg-secondary;
      margin-bottom: 25px;

      h1 {
        font-size: 36px;
      }
    }
  }
</style>
