<template>
  <div>
    <template v-if="!passwordSent">
      <form @submit.prevent="sendEmail" novalidate>
        <div class="mb-5">
          <p class="mb-5">
            {{ $t('Enter the email address associated with your Hulii account.') }}
          </p>
          <base-input
            type="email"
            name="email"
            v-model="email"
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
        </div>
        <button-full class="bg-highlight text-base py-4 w-full rounded-normal px-6 items-center flex justify-center border-highlight mb-6" type="submit">
          {{ $t('Reset password') }}
        </button-full>
        <div class="text-center text-sm">
          {{ $t('or') }}
          <a href="#" @click.prevent="switchElem" class="text-highlight">
            {{ $t('return to Log In') }}
          </a>
        </div>
      </form>
    </template>
    <template v-if="passwordSent">
      <form class="py20 text-center">
        <p class="mb-6">
          {{ $t("We've sent password reset instructions to your email. Check your inbox and follow the link.") }}
        </p>
        <button-full class="bg-highlight text-base py-4 w-full rounded-normal px-6 items-center flex justify-center border-highlight" type="submit">
          {{ $t('Back to Log In') }}
        </button-full>
      </form>
    </template>
  </div>
</template>

<script>

import ButtonFull from 'theme/components/theme/ButtonFull'
import BaseInput from 'theme/components/hulii/blocks/Form/BaseInput'
import { required, email } from 'vuelidate/lib/validators'
import i18n from '@vue-storefront/i18n'

export default {
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    sendEmail () {
      // todo: send email with reset password instructions

      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: i18n.t('OK') }
        })
        return
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Resetting your password'))
      this.$store.dispatch('user/resetPassword', { email: this.email }).then((response) => {
        this.$bus.$emit('notification-progress-stop')
        if (response.code === 200) {
          this.passwordSent = true
        } else {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: i18n.t(response.result) || i18n.t('Error while sending reset password e-mail'),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
        }
      }).catch((err) => {
        console.error(err)
        this.$bus.$emit('notification-progress-stop')
      })
    },
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'login')
    }
  },
  name: 'ForgotPass',
  data () {
    return {
      email: '',
      passwordSent: false
    }
  },
  components: {
    ButtonFull,
    BaseInput
  }
}
</script>

<style lang="scss" scoped>
</style>
