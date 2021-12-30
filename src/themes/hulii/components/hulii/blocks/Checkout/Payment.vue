<template>
  <div v-if="isActive" class="checkout--payment">
    <div class="payment--title">
      <h2>
        {{ $t('Billing Information') }}
      </h2>
    </div>
    <div class="payment--billing">
      <div class="billing--details">
        <base-checkbox
          class="mb-8"
          id="sendToShippingAddressCheckbox"
          v-model="sendToShippingAddress"
          v-if="!isVirtualCart"
        >
          {{ $t('Same as shipping address') }}
        </base-checkbox>

        <div
          v-show="!sendToShippingAddress"
          class="billing--form"
        >
          <div class="form--split-row">
            <base-input
              class="form--item"
              type="text"
              name="first-name"
              :placeholder="$t('First name *')"
              v-model.trim="payment.firstName"
              @blur="$v.payment.firstName.$touch()"
              autocomplete="given-name"
              :validations="[
                {
                  condition: $v.payment.firstName.$error && !$v.payment.firstName.required,
                  text: $t('Field is required')
                },
                {
                  condition: !$v.payment.firstName.minLength,
                  text: $t('Name must have at least 2 letters.')
                }
              ]"
            />

            <base-input
              class="form--item"
              type="text"
              name="last-name"
              :placeholder="$t('Last name *')"
              v-model.trim="payment.lastName"
              @blur="$v.payment.lastName.$touch()"
              autocomplete="family-name"
              :validations="[{
                condition: $v.payment.lastName.$error && !$v.payment.lastName.required,
                text: $t('Field is required')
              }]"
            />
          </div>

          <base-input
            class="form--item"
            type="text"
            name="street-address"
            :placeholder="$t('Address Line 1 *')"
            v-model.trim="payment.streetAddress"
            @blur="$v.payment.streetAddress.$touch()"
            autocomplete="address-line1"
            :validations="[{
              condition: $v.payment.streetAddress.$error && !$v.payment.streetAddress.required,
              text: $t('Field is required')
            }]"
          />

          <base-input
            class="form--item"
            type="text"
            name="apartment-number"
            :placeholder="$t('Address Line 2')"
            v-model.trim="payment.apartmentNumber"
            autocomplete="address-line2"
          />

          <base-input
            class="form--item"
            type="text"
            name="city"
            :placeholder="$t('City *')"
            v-model.trim="payment.city"
            @blur="$v.payment.city.$touch()"
            autocomplete="address-level2"
            :validations="[{
              condition: $v.payment.city.$error && !$v.payment.city.required,
              text: $t('Field is required')
            }]"
          />

          <base-input
            class="form--item"
            type="text"
            name="state"
            :placeholder="$t('State / Province')"
            v-model.trim="payment.state"
            autocomplete="address-level1"
          />

          <div class="form--split-row">
            <base-select
              class="form--item"
              name="countries"
              :options="countryOptions"
              :selected="payment.country"
              :placeholder="$t('Country *')"
              :validations="[
                {
                  condition: $v.payment.country.$error && !$v.payment.country.required,
                  text: $t('Field is required')
                }
              ]"
              v-model="payment.country"
              autocomplete="country-name"
              @blur="$v.payment.country.$touch()"
              @change="$v.payment.country.$touch()"
            />
            <base-input
              class="form--item"
              type="text"
              name="zip-code"
              :placeholder="$t('Postcode *')"
              v-model.trim="payment.zipCode"
              @blur="$v.payment.zipCode.$touch()"
              autocomplete="postal-code"
              :validations="[
                {
                  condition: $v.payment.zipCode.$error && !$v.payment.zipCode.required,
                  text: $t('Field is required')
                },
                {
                  condition: !$v.payment.zipCode.minLength,
                  text: $t('Zip-code must have at least 3 letters.')
                }
              ]"
            />
          </div>

          <base-input
            class="form--item"
            type="text"
            name="phone-number"
            :placeholder="$t('Phone Number')"
            v-model.trim="payment.phoneNumber"
            autocomplete="tel"
          />
        </div>
      </div>
    </div>
    <!-- End Billing Section -->
    <div class="payment--title">
      <h2>
        {{ $t('Payment Information') }}
      </h2>
    </div>
    <div class="payment--details">
      <div v-for="(method, index) in paymentMethods" :key="index" class="payment--options">
        <!-- ApplePay/GooglePay -->
        <!-- <div class="option--container" v-if="method.code === 'applepay'" @click="setPaymentType('applepay')" id="payment-request-container">
          <label
            class="radioStyled options--label"
            :class="{'options--open' : payment.paymentMethod === method}"
          >
            <div class="label--header">
              <div class="label--title">{{ $t('Pay via ApplePay/GooglePay') }}</div>
              <div class="label--icons">
                <!-- Add ApplePay and Googlepay icons -->
        <!-- <img
                  src="/assets/components/payment/visa-grey.svg"
                  v-lazy="'/assets/components/payment/visa-grey.svg'"
                  alt="Visa"
                >
                <img
                  src="/assets/components/payment/american-express-grey.svg"
                  v-lazy="'/assets/components/payment/american-express-grey.svg'"
                  alt="American Express"
                >
                <img
                  src="/assets/components/payment/mastercard-grey.svg"
                  v-lazy="'/assets/components/payment/mastercard-grey.svg'"
                  alt="Mastercard"
                >
              </div>
            </div>
            <input
              type="radio"
              :value="method.code"
              name="payment-method"
              v-model="payment.paymentMethod"
              @change="$v.payment.paymentMethod.$touch(); changePaymentMethod();"
            >
            <span class="checkmark" />
          </label>
          <div class="options--details" v-show="payment.paymentMethod === method.code">
            <div id="payment-request-button" />
          </div>
        </div> -->
        <!-- End ApplePay/GooglePay -->
        <!-- Stripe -->
        <div class="option--container" v-if="method.code === 'stripe'" @click="setPaymentType('stripe')">
          <label
            class="radioStyled options--label"
            :class="{'options--open' : payment.paymentMethod === method}"
          >
            <div class="label--header">
              <div class="label--title">{{ $t('Pay by card') }}</div>
              <div class="label--icons">
                <img
                  src="/assets/components/payment/Apple_Pay_Mark.svg"
                  v-lazy="'/assets/components/payment/Apple_Pay_Mark.svg'"
                  alt="Apple Pay"
                >
                <img
                  src="/assets/components/payment/google-pay-mark.svg"
                  v-lazy="'/assets/components/payment/google-pay-mark.svg'"
                  alt="Google Pay"
                >
                <img
                  src="/assets/components/payment/visa.svg"
                  v-lazy="'/assets/components/payment/visa.svg'"
                  alt="Visa"
                >
                <img
                  src="/assets/components/payment/american-express.svg"
                  v-lazy="'/assets/components/payment/american-express.svg'"
                  alt="American Express"
                >
                <img
                  src="/assets/components/payment/mastercard.svg"
                  v-lazy="'/assets/components/payment/mastercard.svg'"
                  alt="Mastercard"
                >
              </div>
            </div>
            <input
              type="radio"
              :value="method.code"
              name="payment-method"
              v-model="payment.paymentMethod"
              @change="$v.payment.paymentMethod.$touch(); changePaymentMethod();"
            >
            <span class="checkmark" />
          </label>
          <div class="options--details" v-show="payment.paymentMethod === method.code">
            <payment-stripeba @reset="resetPaymentType" />
            <div class="payment--button">
              <button class=".place-order-btn"
                      data-testid="paymentSubmit"
                      @click="sendDataToCheckout"
                      :disabled="$v.payment.$invalid"
              >
                {{ $t(('Pay')) }}
              </button>
            </div>
          </div>
        </div>
        <!-- End Stripe -->
        <!-- Paypal -->
        <!-- <div class="option--container" v-if="method.code === 'vsfpaypal'" @click="setPaymentType('vsfpaypal')">
          <label
            class="radioStyled options--label"
            :class="{'options--open' : payment.paymentMethod === method}"
          >
            <div class="label--header">
              <div class="label--title">{{ $t('Pay via PayPal') }}</div>
              <div class="label--icons">
                <img src="/assets/components/payment/paypal-grey.svg" alt="PayPal">
              </div>
            </div>
            <input
              type="radio"
              :value="method.code"
              name="payment-method"
              v-model="payment.paymentMethod"
              @change="$v.payment.paymentMethod.$touch(); changePaymentMethod();"
            >
            <span class="checkmark" />
          </label>
          <div class="options--details" v-show="payment.paymentMethod === method.code">
            {{ $t('Use your PayPal account to complete your order. Once you enter your account information in the PayPal window, the order will process with Hulii.') }}
            <div class="payment--button">
              <paypal-button
                v-if="payment.paymentMethod === 'vsfpaypal'"
                @reset="resetPaymentType"
              />
            </div>
          </div>
        </div> -->
        <!-- End Paypal -->

        <!-- Zippay -->
        <!-- <div v-if="!safari && !ios">
          <div class="option--container" v-if="method.code === 'zippay'" @click="setPaymentType('zippay')">
            <label
              class="radioStyled options--label"
              :class="{'options--open' : payment.paymentMethod === method}"
            >
              <div class="label--header">
                <div class="label--title">{{ $t('Pay with Zippay') }}</div>
                <div class="label--icons">
                  <img src="https://static.zipmoney.com.au/assets/default/footer-tile/footer-tile-new.png" style="height:30px;">

                </div>
              </div>
              <input
                type="radio"
                :value="method.code"
                name="payment-method"
                v-model="payment.paymentMethod"
                @change="$v.payment.paymentMethod.$touch(); changePaymentMethod();"
              >
              <span class="checkmark" />
            </label>
            <div class="options--details" v-show="payment.paymentMethod === method.code">
              <payment-zippay @reset="resetPaymentType" />
            </div>
          </div>
        </div> -->
        <!-- End Zippay -->
      </div>
      <span class="validation-error" v-if="!$v.payment.paymentMethod.required">{{ $t('Field is required') }}</span>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { unicodeAlpha, unicodeAlphaNum } from '@vue-storefront/core/helpers/validators'
import { Payment } from 'src/modules/extend-checkout/components/Payment'
import BaseCheckbox from 'theme/components/hulii/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/hulii/blocks/Form/BaseInput'
import BaseSelect from 'theme/components/hulii/blocks/Form/BaseSelect'
import ButtonFull from 'theme/components/theme/ButtonFull'
import Tooltip from 'theme/components/core/Tooltip'
import PaymentStripeba from 'src/modules/stripe-backend-agnostic/components/PaymentStripe'
import PaypalButton from 'src/modules/paypal/components/Button'
import MixinStripe from 'src/modules/stripe-backend-agnostic/components/MixinStripe'
// import BraintreeDropin from 'src/modules/payment-braintree/components/Dropin'
import PaymentZippay from 'src/modules/payment-zippay/components/PaymentZippay'
import MixinZippay from 'src/modules/payment-zippay/components/mixinZippay'

export default {
  components: {
    BaseCheckbox,
    BaseInput,
    BaseSelect,
    ButtonFull,
    Tooltip,
    PaymentStripeba,
    PaypalButton,
    // BraintreeDropin
    PaymentZippay
  },
  mixins: [Payment, MixinStripe, MixinZippay],
  computed: {
    countryOptions () {
      return this.countries.map((item) => {
        return {
          value: item.code,
          label: item.name
        }
      })
    },
    safari () {
      return !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
    },
    ios () {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
  },
  validations () {
    if (!this.generateInvoice) {
      return {
        payment: {
          firstName: {
            required,
            minLength: minLength(2),
            unicodeAlpha
          },
          lastName: {
            required,
            unicodeAlpha
          },
          country: {
            required
          },
          streetAddress: {
            required,
            unicodeAlphaNum
          },
          zipCode: {
            required,
            minLength: minLength(3),
            unicodeAlphaNum
          },
          city: {
            required,
            unicodeAlpha
          },
          paymentMethod: {
            required
          }
        }
      }
    } else {
      return {
        payment: {
          firstName: {
            required,
            minLength: minLength(2),
            unicodeAlpha
          },
          lastName: {
            required,
            unicodeAlpha
          },
          company: {
            required,
            unicodeAlphaNum
          },
          taxId: {
            required,
            minLength: minLength(3)
          },
          country: {
            required
          },
          streetAddress: {
            required,
            unicodeAlphaNum
          },
          apartmentNumber: {
            required,
            unicodeAlphaNum
          },
          zipCode: {
            required,
            minLength: minLength(3),
            unicodeAlphaNum
          },
          city: {
            required,
            unicodeAlpha
          },
          paymentMethod: {
            required
          }
        }
      }
    }
  },
  mounted () {
    let cartItems = this.$store.state.cart.cartItems ? this.$store.state.cart.cartItems : ''
    let ga4value = 0
    let ga4Items = cartItems.map((product, index) => {
      ga4value = ga4value + product.priceInclTax
      let categories = product.url_path.split('/');
      let slug = categories.pop();
      return {
        item_id: product.sku,
        item_name: product.name,
        currency: 'AUD',
        index: index + 1,
        item_brand: product.brand,
        item_category: categories[0] ? categories[0] : null,
        item_category1: categories[1] ? categories[1] : null,
        item_category2: categories[2] ? categories[2] : null,
        item_category3: categories[3] ? categories[3] : null,
        item_category4: categories[4] ? categories[4] : null,
        item_category5: categories[5] ? categories[5] : null,
        item_category6: categories[6] ? categories[6] : null,
        price: product.priceInclTax,
        shipping_type: product.shipping_type,
        quantity: product.qty,
        seller: product.seller
      }
    });
    console.log(ga4Items);
    window.gtag('event', 'add_payment_info', {
      currency: 'AUD',
      value: ga4value,
      items: ga4Items
    });
  },
  methods: {
    segCompletedStep () {
      window.analytics.track('Checkout Step Completed', {
        checkout_id: '',
        step: 3,
        shipping_method: this.$store.state.checkout.shippingDetails.shippingMethod ? this.$store.state.checkout.shippingDetails.shippingMethod : '',
        payment_method: this.payment.paymentMethod ? this.payment.paymentMethod : ''
      })
    },
    resetPaymentType () {
      this.paymentType = null
    },
    setPaymentType (type) {
      this.paymentType = type
      this.payment.paymentMethod = type
      this.sendData()
    },
    sendData () {
      this.$bus.$emit('checkout-after-paymentDetails', this.payment, this.$v)
    },
    onSuccess () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: this.$t('You are logged in!'),
        action1: { label: this.$t('OK') }
      })
    },
    onFailure (result) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t(result.result.errorMessage ? result.result.errorMessage : result.result),
        action1: { label: this.$t('OK') }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.checkout--payment {
  .payment--title {
    margin-bottom: 25px;
    h2 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
  }
  .payment--details {
    @apply mb-8;

    .payment--options {
      @apply mb-4;

      .option--container {
        @apply mb-4 flex flex-col;
        position: relative;
        border: 1px solid #bdbdbd;
        border-radius: 5px;
        padding: 20px 10px 20px 23px;
        line-height: 18px;

        @screen md {
          padding: 20px 20px 20px 43px;
        }

        @screen lg {
          padding: 20px 20px 20px 43px;
        }
      }

      .label--header {
        @apply w-full flex justify-between;
        .label--title {
          @apply w-full;
          font-weight: 600;
          line-height: 30px;
        }
        .label--icons {
          img {
            @apply ml-2;
            width: auto;
            opacity: .575;
            height: 30px;
          }
        }
      }
      .options--details {
        @apply mt-8 text-grey;
        display: block;
      }
      input:checked ~ .label--header {
        @apply text-hulii-turquoise;
      }
    }
  }
  .billing--form {
    .form--item {
      @apply mb-4;
    }
    .form--split-row {
      @apply flex flex-row;

      .form--item {
        @apply w-1/2 mb-4;
      }
      .form--item:nth-of-type(1) {
        margin-right: 8px;
      }
      .form--item:nth-of-type(2) {
        margin-left: 8px;
      }
    }
  }
  .payment--button {
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

      &:hover {
        box-shadow: inset 0 -100px 0 rgba(0,0,0,0.15);
      }

      &:active {
        box-shadow: inset 0 -100px 0 rgba(0,0,0,0.2);
        transform: scale(0.98);
        transition: transform .1s ease-out;
      }

      &:disabled {
        @apply bg-grey;
      }
    }
  }
  .radioStyled .checkmark {
    position: absolute;
    top: 5px;
    left: -20px !important;
    height: 19px;
    width: 19px;
    border-radius: 50%;
    border: 1px solid #bdbdbd;

    @screen md {
      left: -30px !important;
    }
    @screen sm {
      left: -30px !important;
    }
  }
  @screen sm {
    .label--icons {
      @apply flex justify-end w-full;
    }
  }
}
</style>
