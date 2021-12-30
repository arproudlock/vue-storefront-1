<template>
  <div class="register--create">
    <div class="create--form">
      <form @submit.prevent="register" novalidate>
        <base-input
          class="form--item"
          type="email"
          name="email"
          autocomplete="email"
          v-model="email"
          @blur="$v.email.$touch()"
          focus
          :placeholder="$t('E-mail address *')"
          :validations="[
            {
              condition: !$v.email.required && $v.email.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.email.email && $v.email.$error,
              text: $t('Please provide valid e-mail address.')
            }
          ]"
        />
        <base-input
          class="form--item"
          type="text"
          name="fist-name"
          autocomplete="given-name"
          v-model="firstName"
          @blur="$v.firstName.$touch()"
          :placeholder="$t('First name *')"
          :validations="[
            {
              condition: !$v.firstName.required && $v.firstName.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.firstName.minLength,
              text: $t('Name must have at least 2 letters.')
            }
          ]"
        />
        <base-input
          class="form--item"
          type="text"
          name="last-name"
          autocomplete="last-name"
          v-model="lastName"
          @blur="$v.lastName.$touch()"
          :placeholder="$t('Last name *')"
          :validation="{
            condition: !$v.lastName.required && $v.lastName.$error,
            text: $t('Field is required.')
          }"
        />
        <base-input
          class="form--item"
          type="password"
          name="password"
          ref="password"
          autocomplete="new-password"
          v-model="password"
          @blur="$v.password.$touch()"
          :placeholder="$t('Password *')"
          :validations="[
            {
              condition: !$v.password.required && $v.password.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.password.minLength && $v.password.$error,
              text: $t('Password must have at least 8 letters.')
            }
          ]"
        />
        <base-input
          class="form--item"
          type="password"
          name="password-confirm"
          autocomplete="new-password"
          v-model="rPassword"
          @blur="$v.rPassword.$touch()"
          :placeholder="$t('Repeat password *')"
          :validations="[
            {
              condition: !$v.rPassword.required && $v.rPassword.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.rPassword.sameAsPassword && $v.rPassword.$error,
              text: $t('Passwords must be identical.')
            }
          ]"
        />
        <base-checkbox
          class="form--item"
          id="terms"
          v-model="conditions"
          @click="conditions = !conditions"
          @blur="$v.conditions.$reset()"
          @change="$v.conditions.$touch()"
          :validation="{
            condition: !$v.conditions.required && $v.conditions.$error,
            text: $t('You must accept the terms and conditions.')
          }"
        >
          {{ $t('I accept the') }}
          <router-link target="_blank" class="dropdown-item-link cursor-pointer ml-1 text-highlight" :to="localizedRoute('/help-center/terms-of-use')" exact>
            {{ $t('Terms and Conditions') }}
          </router-link>*
        </base-checkbox>
        <div class="create--button">
          <button
            type="submit"
            data-testid="loginSubmit"
            :disabled="loading"
          >
            {{ $t(('Sign In')) }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// TODO asdasd
import Register from '@vue-storefront/core/compatibility/components/blocks/Auth/Register'
import BaseCheckbox from 'theme/components/hulii/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/hulii/blocks/Form/BaseInput'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  validations: {
    email: {
      required,
      email
    },
    firstName: {
      minLength: minLength(2),
      required
    },
    lastName: {
      required
    },
    password: {
      minLength: minLength(8),
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    conditions: {
      required
    }
  },
  mixins: [Register],
  data () {
    return {
      loading: false,
      loadingImg: '/assets/loading/loading-white.gif'
    }
  },
  props: {
    registerActive: {
      type: Boolean,
      default: true,
      required: false
    },
    loginActive: {
      type: Boolean,
      default: false,
      required: false
    },
    loginText: {
      type: String,
      default: 'Hey there!',
      required: false
    }
  },
  components: {
    BaseCheckbox,
    BaseInput
  },
  beforeMount () {
    this.$bus.$on('register-loading', this.toggleLoading)
  },
  beforeDestroy () {
    this.$bus.$off('register-loading', this.toggleLoading)
  },
  methods: {
    register () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      this.callRegister()
    },
    toggleLoading (state) {
      this.loading = state
    },
    onSuccess () {
      this.$router.push(this.$route.redirect || '/')
    },
    onFailure (result) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: result.result,
        action1: { label: this.$t('OK') }
      })
    }
  }
}
</script>

<style lang="scss">
.register--create {
  @apply w-full;
  .create--form {
    .form--item {
      @apply mb-4;
    }
    .create--button {
      @apply mt-8 cursor-pointer text-white;
      button {
        @apply w-full bg-hulii-yellow text-white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 1rem;
        min-height: 48px;
        transition: transform .1s ease-out;
        box-shadow: inset 0 -3px 0 rgba(0, 0, 0, .15);
        line-height: 1;
        text-transform: uppercase;
        border-radius: 5px;
        padding: 0;
        margin-bottom: 10px;
        font-family: 'HuliiSans', sans-serif;
        border: none;

        &:hover {
          box-shadow: inset 0 -100px 0 rgba(0,0,0,0.15);
        }

        &:active {
          box-shadow: inset 0 -100px 0 rgba(0,0,0,0.2);
          transform: scale(0.98);
          transition: transform .1s ease-out;
        }
      }
    }
  }
}
</style>
