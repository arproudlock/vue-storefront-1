<template>
  <div v-if="isActive" class="checkout--registration">
    <div class="registration--title">
      <h2>
        {{ $t(registrationType === 1 ? 'Sign Up' : registrationType === 2 ? 'Sign In' : 'Check Out') }}
      </h2>
      <div v-if="registrationType === 1 || registrationType === 2" class="registration--toggle-sign-in">
        {{ $t('Or') }}
        <a v-if="registrationType === 1" class="toggle--link" @click="toggleRegistration(2)">
          {{ $t('sign into your account') }}
        </a>
        <a v-if="registrationType === 2" class="toggle--link" @click="toggleRegistration(1)">
          {{ $t('sign up for an account') }}
        </a>
      </div>
      <div v-else class="registration--guest-welcome">
        <!-- {{ $t('Just visiting? Check out as a guest.') }} -->
      </div>
    </div>
    <div class="registration--form">
      <template v-if="registrationType === 1">
        <form @submit.prevent="callRegister" novalidate>
          <base-input
            class="form--item"
            type="email"
            name="email-address"
            :placeholder="$t('Email Address *')"
            v-model="register.emailAddress"
            @blur="$v.register.emailAddress.$touch()"
            autocomplete="email"
            @keyup.enter="sendDataToCheckout"
            :validations="[
              {
                condition: $v.register.emailAddress.$error && !$v.register.emailAddress.required,
                text: $t('Please provide valid email address.')
              },
              {
                condition: !$v.register.emailAddress.email && $v.register.emailAddress.$error,
                text: $t('Please provide valid email address.')
              }
            ]"
          />
          <base-input
            class="form--item"
            type="password"
            name="password"
            ref="password"
            :placeholder="$t('Password *')"
            v-model="register.password"
            @blur="$v.register.password.$touch()"
            autocomplete="new-password"
            :validations="[{
              condition: $v.register.password.$error && !$v.register.password.required,
              text: $t('A password is required.')
            }]"
          />
          <div class="registration--button">
            <button
              type="submit"
              data-testid="registerSubmit"
              :disabled="$v.register.$invalid || buttonLoading"
            >
              {{ $t(('Continue')) }}
            </button>
          </div>
        </form>
      </template>
      <template v-if="registrationType === 2">
        <form @submit.prevent="login" novalidate>
          <base-input
            class="form--item"
            type="email"
            name="email"
            autocomplete="email"
            v-model="register.emailAddress"
            @blur="$v.register.emailAddress.$touch()"
            :placeholder="$t('Email Address *')"
            :validations="[
              {
                condition: !$v.register.emailAddress.required && $v.register.emailAddress.$error,
                text: $t('Please provide valid email address.')
              },
              {
                condition: !$v.register.emailAddress.email && $v.register.emailAddress.$error,
                text: $t('Please provide valid email address.')
              }
            ]"
          />
          <base-input
            class="form--item"
            type="password"
            name="password"
            v-model="register.password"
            @blur="$v.register.password.$touch()"
            :placeholder="$t('Password *')"
            :validations="[{
              condition: !$v.register.password.required && $v.register.password.$error,
              text: $t('A password is required.')
            }]"
          />
          <!-- <div class="row">
            <div class="col-xs-5 col-sm-6 mb35 flex end-xs middle-xs">
              <a href="#" @click.prevent="remindPassword">
                {{ $t('Forgot the password?') }}
              </a>
            </div>
          </div> -->
          <div class="registration--button">
            <button
              type="submit"
              data-testid="loginSubmit"
              :disabled="$v.register.$invalid || buttonLoading"
            >
              {{ $t('Log in to your account') }}
            </button>
          </div>
        </form>
      </template>
      <template v-if="registrationType === 3" class="registration--guest-form">
        <base-input
          class="form--item"
          type="email"
          name="email-address"
          autocomplete="email"
          :placeholder="$t('Email Address *')"
          v-model="guest.emailAddress"
          @blur="$v.guest.emailAddress.$touch()"
          @keyup.enter="sendDataToCheckout"
          :validations="[
            {
              condition: $v.guest.emailAddress.$error && !$v.guest.emailAddress.required,
              text: $t('Please provide valid email address.')
            },
            {
              condition: !$v.guest.emailAddress.email && $v.guest.emailAddress.$error,
              text: $t('Please provide valid email address.')
            }
          ]"
        />
        <div class="registration--button">
          <button
            data-testid="personalDetailsSubmit"
            @click="sendDataToCheckout"
            :disabled="$v.guest.$invalid"
          >
            {{ $t((isVirtualCart ? 'Continue to payment' : 'Continue')) }}
          </button>
        </div>
        <!-- <div class="registration--back-to-sign" @click="toggleRegistration(1)">
          {{ $t('Sign up / Sign in') }}
        </div> -->
      </template>
    </div>
    <div v-if="registrationType === 1 || registrationType === 2" class="registration--guest">
      <span class="reigstration--break">{{ $t('Or') }}</span>
      <div class="registration--guest--container">
        <outline-button color="hulii-turquoise" text="Continue As A Guest" class="guest--button" @click.native="toggleRegistration(3)" />
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import { PersonalDetails } from 'src/modules/extend-checkout/components/PersonalDetails'
import Login from '@vue-storefront/core/compatibility/components/blocks/Auth/Login'

import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/hulii/blocks/Form/BaseInput'
import OutlineButton from 'theme/components/hulii/blocks/Buttons/OutlineButton'
import Tooltip from 'theme/components/core/Tooltip'

export default {
  components: {
    OutlineButton,
    Tooltip,
    BaseCheckbox,
    BaseInput
  },
  data () {
    return {
      registrationType: 3,
      const: null,
      register: {
        emailAddress: '',
        password: ''
      },
      guest: {
        emailAddress: ''
      },
      buttonLoading: false
    }
  },
  mixins: [PersonalDetails, Login],
  validations: {
    register: {
      emailAddress: {
        required,
        email
      },
      password: {
        required
      }
    },
    guest: {
      emailAddress: {
        required,
        email
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
    // console.log(ga4Items);
    window.gtag('event', 'begin_checkout', {
      currency: 'AUD',
      value: ga4value,
      items: ga4Items
    });
  },
  methods: {
    toggleRegistration (val) {
      this.registrationType = val
      if (val === 1) {
        this.createAccount = true
      } else {
        this.createAccount = false
      }
    },
    callRegister () {
      // TODO Move to theme
      // this.$bus.$emit('notification-progress-start', i18n.t('Creating your account'))
      this.buttonLoading = true
      this.$bus.$emit('register-loading', true)
      this.$store.dispatch('user/register', { email: this.register.emailAddress, password: this.register.password, firstname: 'New', lastname: 'User' }).then((result) => {
        // TODO Move to theme
        // this.$bus.$emit('notification-progress-stop')
        this.$bus.$emit('register-loading', false)
        if (result.code !== 200) {
          this.onFailure(result)
          // If error includes a word 'password', focus on a corresponding field
          if (result.result.includes('password')) {
            this.$refs['password'].setFocus('password')
            this.password = ''
            this.rPassword = ''
          }
        } else {
          this.login()
        }
      }).catch(err => {
        // TODO Move to theme
        this.onFailure({ result: 'Unexpected authorization error. Check your Network conection.' })
        this.$bus.$emit('notification-progress-stop')
        Logger.error(err, 'user')()
      })
    },
    login () {
      if (this.$v.register.$invalid) {
        this.$v.register.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      this.email = this.register.emailAddress
      this.password = this.register.password
      this.callLogin()
    },
    onSuccess () {
      this.sendDataToCheckout()
    },
    onFailure (result) {
      this.buttonLoading = false
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t(result.result),
        action1: { label: this.$t('OK') }
      })
    },
    sendDataToCheckout () {
      if (this.registrationType === 1) {
        // Sign Up
        this.personalDetails.password = this.register.password
        this.personalDetails.createAccount = true
      } else if (this.registrationType === 2) {
        // Log In
        this.personalDetails.createAccount = false
      } else {
        // Guest Checkout
        this.personalDetails.emailAddress = this.guest.emailAddress
        this.personalDetails.createAccount = false
        try { window.ORIBI.api('setUserEmail', this.guest.emailAddress) } catch (e) {};
      }
      this.$bus.$emit('checkout-after-personalDetails', this.personalDetails, this.$v)
      this.isFilled = true
      this.isValidationError = false
      this.buttonLoading = true
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout--registration {
  .registration--title {
    margin-bottom: 25px;
    h2 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
    .registration--toggle-sign-in {
      @apply text-grey;
      margin-top: 9px;
      .toggle--link {
        @apply text-hulii-turquoise cursor-pointer;
        user-select: none;
      }
    }
    .registration--guest-welcome {
      @apply text-grey;
    }
  }
  .registration--form {
    input {
      margin-top: 25px;
    }
    .form--item {
      @apply mb-4;
    }
    .registration--back-to-sign {
      @apply flex justify-center items-center mt-4 cursor-pointer text-grey;
      user-select: none;
    }
  }
  .registration--guest {
    .reigstration--break {
      @apply text-center block relative mt-4;
      &::after, &::before {
        content: '';
        width: calc(50% - 30px);
        position: absolute;
        top: 10px;
        right: 0;
        height: 1px;
        border-top: 1px solid #e7e7e7;
      }
      &::before {
        left: 0;
      }
    }
    .registration--guest--container {
      @apply mt-4;
      .guest--button {
        min-height: 48px;
        font-weight: 600;
        font-size: 1rem;
        text-transform: capitalize;
      }
    }
  }
}
.link {
  text-decoration: underline;
}

.login-prompt {
  @media (min-width: 1200px) {
    margin-top: 30px;
  }
}
.registration--button {
  button {
    @apply bg-hulii-turquoise w-full;
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
</style>
