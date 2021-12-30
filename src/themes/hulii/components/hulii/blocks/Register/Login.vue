<template>
  <div class="register--login">
    <transition name="fade">
      <div v-show="!forgotPassword" class="login--form">
        <form @submit.prevent="login" novalidate>
          <base-input
            class="mb-4"
            type="email"
            name="email"
            v-model="email"
            @blur="$v.email.$touch()"
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
            class="mb-4"
            type="password"
            name="password"
            v-model="password"
            @blur="$v.password.$touch()"
            :placeholder="$t('Password *')"
            :validation="{
              condition: !$v.password.required && $v.password.$error,
              text: $t('Field is required.')
            }"
          />
          <div class="login--forgot">
            <a href="#" class="text-hulii-yellow" @click.prevent="toggleForgotPassword">
              {{ $t('Forgot your password?') }}
            </a>
          </div>
          <div class="login--remember">
            <base-checkbox
              class=""
              id="remember"
              v-model="remember"
              @click="remember = !remember"
            >
              {{ $t('Remember me') }}
            </base-checkbox>
          </div>
          <div class="login--button">
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
    </transition>
    <transition name="fade">
      <div v-show="forgotPassword">
        <forgot-pass />
      </div>
    </transition>
  </div>
</template>

<script>
import Login from '@vue-storefront/core/compatibility/components/blocks/Auth/Login'
import BaseCheckbox from 'theme/components/hulii/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/hulii/blocks/Form/BaseInput'
import { required, email } from 'vuelidate/lib/validators'
import ForgotPass from './ForgotPass'
export default {
  mixins: [Login],
  components: {
    BaseCheckbox,
    BaseInput,
    ForgotPass
  },
  data () {
    return {
      forgotPassword: false,
      loading: false,
      loadingImg: '/assets/loading/loading-white.gif'
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  beforeMount () {
    this.$bus.$on('login-loading', this.toggleLoading)
  },
  beforeDestroy () {
    this.$bus.$off('login-loading', this.toggleLoading)
  },
  methods: {
    toggleForgotPassword () {
      this.forgotPassword = !this.forgotPassword
    },
    login () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      this.callLogin()
    },
    remindPassword () {
      if (!(typeof navigator !== 'undefined' && navigator.onLine)) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Reset password feature does not work while offline!'),
          action1: { label: this.$t('OK') }
        })
      } else {
        this.callForgotPassword()
      }
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
        message: this.$t(result.result),
        action1: { label: this.$t('OK') }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.register--login {
  @apply w-full;

  .login--form {
    .login--forgot {
      @apply mt-2;
    }
    .login--remember {
      @apply mt-4;
    }
    .login--button {
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
