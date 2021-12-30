<template>
  <div v-if="isActive" class="checkout--delivery">
    <div class="delivery--title" id="deliveryTop">
      <h2>
        {{ $t('Delivery Information') }}
      </h2>
    </div>
    <product-delivery v-for="product in productsInCart" :key="product.sku" :product="product" />
    <!-- <div v-for="(method, index) in shippingMethods" :key="index" class="delivery--options">
      <label
        class="radioStyled options--label"
        :class="{'options--open' : shipping.shippingMethod === method.method_code}"
      >
        <div class="label--type">
          <span>{{ method.method_title }}</span>
          <div class="type--arrival">
            <span class="flex">{{ $t('Arrives between ') }}</span>
            <span class="arrival--date">{{ getDays(method.method_code, 'minDays') }}</span>
            <span class="flex">{{ $t('and') }}</span>
            <span class="arrival--date">{{ getDays(method.method_code, 'maxDays') }}</span>
          </div>
        </div>
        <div class="label--price">
          <span class="flex" v-if="method.amount !== 0">{{ method.amount | price }}</span>
          <span class="flex" v-if="method.amount === 0">{{ $t('Free!') }}</span>
        </div>
        <input
          type="radio"
          :value="method.method_code"
          name="shipping-method"
          v-model="shipping.shippingMethod"
          @change="$v.shipping.shippingMethod.$touch(); changeShippingMethod();"
        >
        <span class="checkmark" />
      </label>
    </div> -->
    <!-- <span class="validation-error" v-if="$v.shipping.shippingMethod.$error && !$v.shipping.shippingMethod.required">
      {{ $t('Field is required') }}
    </span> -->
    <div class="delivery--button">
      <button
        data-testid="deliverySubmit"
        @click="sendDataToCheckout"
        :disabled="$v.shipping.$invalid"
      >
        {{ $t(('Continue')) }}
      </button>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { unicodeAlpha, unicodeAlphaNum } from '@vue-storefront/core/helpers/validators'
import { Delivery } from 'src/modules/extend-checkout/components/Delivery'
import countryInformation from 'theme/resource/country-information.json'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/hulii/blocks/Form/BaseInput'
import BaseSelect from 'theme/components/hulii/blocks/Form/BaseSelect'
import ButtonFull from 'theme/components/theme/ButtonFull'
import Tooltip from 'theme/components/core/Tooltip'
import moment from 'moment'
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary'
import ProductDelivery from './ProductDelivery'

export default {
  components: {
    ButtonFull,
    Tooltip,
    BaseCheckbox,
    BaseInput,
    BaseSelect,
    ProductDelivery
  },
  mixins: [Delivery, CartSummary],
  data () {
    const storeView = currentStoreView()
    return {
      store: storeView.storeCode
    }
  },
  validations: {
    shipping: {
      shippingMethod: {
        required
      }
    }
  },
  computed: {
    productsInCart () {
      return this.$store.state.cart.cartItems
    }
  },
  mounted () {

  },
  methods: {
    getDays (methodCode, type) {
      window.scrollTo(0, 0);
      let date = new Date()
      let country = this.store === '' ? 'us' : this.store
      if (methodCode === 'freeshipping') {
        let days = countryInformation[country]['shipping']['standard'][type] - 1
        let dayOfTheWeek = date.getDay()
        let calendarDays = days
        let deliveryDay = dayOfTheWeek + days
        if (deliveryDay >= 6) {
          // deduct this-week days
          days -= 6 - dayOfTheWeek
          // count this coming weekend
          calendarDays += 2
          // how many whole weeks?
          let deliveryWeeks = Math.floor(days / 5)
          // two days per weekend per week
          calendarDays += deliveryWeeks * 2
        }
        date.setTime(date.getTime() + calendarDays * 24 * 60 * 60 * 1000)
        return moment(date).format('ddd, MMM DD')
      } else if (methodCode === 'flatrate') {
        let days = countryInformation[country]['shipping']['express'][type] - 1
        let dayOfTheWeek = date.getDay()
        let calendarDays = days
        let deliveryDay = dayOfTheWeek + days
        if (deliveryDay >= 6) {
          // deduct this-week days
          days -= 6 - dayOfTheWeek
          // count this coming weekend
          calendarDays += 2
          // how many whole weeks?
          let deliveryWeeks = Math.floor(days / 5)
          // two days per weekend per week
          calendarDays += deliveryWeeks * 2
        }
        date.setTime(date.getTime() + calendarDays * 24 * 60 * 60 * 1000)
        return moment(date).format('ddd, MMM DD')
      }
    },
    segCompletedStep () {
      window.analytics.track('Checkout Step Completed', {
        checkout_id: '',
        step: 2,
        shipping_method: this.shipping.shippingMethod ? this.shipping.shippingMethod : '',
        payment_method: this.$store.state.checkout.paymentDetails.paymentMethod ? this.$store.state.checkout.paymentDetails.paymentMethod : ''
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.checkout--delivery {
  .delivery--title {
    margin-bottom: 25px;
    h2 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
  }
  .delivery--options {
    @apply mb-4;
    .options--label {
      @apply flex flex-row justify-between font-normal;

      .label--type {
        .type--arrival {
          @apply flex flex-wrap text-sm mt-1;
          font-size: 13px;

          .arrival--date {
            @apply font-semibold mx-1 text-hulii-turquoise;
          }
        }
      }
      .label--price {
        @apply flex;
        font-weight: 600;
      }
    }
  }
  .delivery--button {
    button {
      @apply bg-hulii-turquoise w-full mt-4;
      border: 0;
      color: white;
      min-height: 48px;
      font-weight: 600;
      font-size: 1rem;
      font-family: 'HuliiSans', sans-serif;
      text-transform: capitalize;
      border-radius: 5px;
      box-shadow: inset 0 -3px 0 rgba(0, 0, 0, .15);
      transition: transform .1s ease-out;

      &:disabled {
        @apply bg-grey;
      }
    }
  }
}
</style>
