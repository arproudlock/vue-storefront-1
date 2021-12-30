<template>
  <div class="newsletter">
    <h3 slot="header" class="newsletter--header text-sm mb-4">
      {{ $t('Join us') }}
    </h3>
    <p>and you'll be the first to know about special deals and big sales events</p>
    <div slot="content" v-if="!isSubscribed">
      <form @submit.prevent="subscribe(onSuccesfulSubmission)" novalidate class="flex flex-row w-full">
        <div class="newsletter--input w-full">
          <base-input
            type="email"
            name="email"
            v-model="email"
            class="email--input"
            autocomplete="email"
            label-background="#fafafb"
            :placeholder="$t('E-mail address *')"
            size="small"
            :validations="[
              {
                condition: $v.email.$error && !$v.email.required,
                text: $t('Field is required.')
              },
              {
                condition: !$v.email.email && $v.email.$error,
                text: $t('Please provide valid e-mail address.')
              }
            ]"
          />
        </div>
        <div
          class="btn"
        >
          <button
            :to="localizedRoute('/')"
            class="text-white bg-hulii-purple"
            type="Subscribe"
            @click.native="$v.email.$touch(); segIdentify()"
          >
            {{ $t('Subscribe') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import SubscriptionStatus from '@vue-storefront/core/modules/newsletter/mixins/SubscriptionStatus'
import Subscribe from '@vue-storefront/core/modules/newsletter/mixins/Subscribe'
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton.vue'
import i18n from '@vue-storefront/i18n'
import BaseInput from 'theme/components/hulii/blocks/Form/BaseInput.vue'

export default {
  name: 'Newsletter',
  components: {
    FullButton,
    BaseInput
  },
  mixins: [
    SubscriptionStatus, Subscribe
  ],
  beforeDestroy () {
    this.$off('validation-error')
  },
  methods: {
    onSuccesfulSubmission () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('You have been successfully subscribed to our newsletter!'),
        action1: { label: i18n.t('OK') }
      })
      this.$bus.$emit('modal-hide', 'modal-newsletter')
    },
    segIdentify () {
      window.analytics.identify({
        email: this.email
      })
      window.ORIBI.api('setUserEmail', this.email);
    }
  }
}
</script>

<style lang="scss" scoped>
  .newsletter {
    .newsletter--header {
      font-weight: 800;
      line-height: 12px;
      letter-spacing: .1em;
      text-transform: uppercase;
      font-size: 12px;
    }
  }
  .newsletter-btn {
    padding-left: 52px;
    padding-right: 52px;
  }

  .subscribe-button {
    min-width: 100px;
  }

  .newsletter--input {
    max-width: 400px;
  }

  .email--input {
    height: 45px;
  }
  label {

  }

  .btn button {
    font-family: 'HuliiSans',sans-serif;
    font-weight: 600;
    font-size: 13px;
    line-height: 1;
    text-transform: uppercase;
    border-radius: 5px;
    padding: 0;
    margin-bottom: 10px;
    box-shadow: inset 0 -3px 0 rgba(0,0,0,0.15);
    transition: transform .1s ease-out;
    height: 100%;
    padding: 0 13px;
    margin-left: 10px;
    border: none;

    &:hover {
      box-shadow: inset 0 -100px 0 rgba(0,0,0,0.15);
    }

    &:active {
      box-shadow: inset 0 -100px 0 rgba(0,0,0,0.2);
      transform: scale(0.99);
      transition: transform .1s ease-out;
    }

    a {
      @apply flex justify-center items-center;
      padding: 13px 23px;
    }
  }

  @media (max-width: 1023px) {
    .newsletter-button {
      padding-top: 25px;
      text-align: center;
    }
  }

  @media (max-width: 767px) {
    .h3 {
      font-size: 18px;
      text-align: center;
    }
  }
</style>
