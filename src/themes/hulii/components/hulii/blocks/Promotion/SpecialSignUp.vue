<template>
  <div>
    <header class="modal-header py25 px65 h1 serif weight-700 bg-cl-secondary">
      <i
        slot="close"
        class="modal-close material-icons p15 cl-bg-tertiary"
        @click="close"
      >
        close
      </i>
      <!-- {{ $t('Register') }} -->
    </header>
    <div class="modal-content pt30 pb60 px65 cl-secondary newsletter">
      <!-- <div slot="content" v-if="!isSubscribed">
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
      </div> -->
      <Newsletter />
    </div>
  </div>
</template>

<script>
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from 'theme/components/hulii/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/hulii/blocks/Form/BaseInput'
import { required, email } from 'vuelidate/lib/validators'
import SubscriptionStatus from '@vue-storefront/core/modules/newsletter/mixins/SubscriptionStatus'
import Subscribe from '@vue-storefront/core/modules/newsletter/mixins/Subscribe'
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton.vue'
import i18n from '@vue-storefront/i18n'
import Newsletter from 'theme/components/hulii/blocks/Footer/Newsletter'

export default {
  mixins: [SubscriptionStatus, Subscribe],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  data () {
    return {
      hasRedirect: !!localStorage.getItem('redirect')
    }
  },
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput,
    FullButton,
    i18n,
    Newsletter
  },
  mounted () {
    let times = localStorage.getItem('newsletter-shown');
    if (times) {
      localStorage.setItem('newsletter-shown', times + 1);
    } else
    {
      localStorage.setItem('newsletter-shown', 1);
    }
  },
  beforeDestroy () {
    this.$off('validation-error')
  },
  methods: {
    close (e) {
      // if (e) localStorage.removeItem('redirect')
      this.$bus.$emit('modal-hide', 'modal-promotion')
    }
    // trySub () {
    //   console.log('try sub');
    //   this.subscribe(this.onSuccesfulSubmission, this.onSubFailure)
    // },
    // onSuccesfulSubmission () {
    //   console.log('onSuccess');
    //   this.$store.dispatch('notification/spawnNotification', {
    //     type: 'success',
    //     message: i18n.t('You have been successfully subscribed!'),
    //     action1: { label: i18n.t('OK') }
    //   })
    //   localStorage.setItem('signed-up-to-newsletter', true)
    //   this.$bus.$emit('modal-hide', 'modal-promotion')
    // },
    // onSubFailure (message) {
    //   this.$store.dispatch('notification/spawnNotification', {
    //     type: 'error',
    //     message: this.$t(message),
    //     action1: { label: this.$t('OK') }
    //   })
    // },
    // segIdentify () {
    //   window.analytics.identify({
    //     email: this.email
    //   })
    //   window.ORIBI.api('setUserEmail', this.email);
    // },
    // onSuccess () {
    //   this.$store.dispatch('notification/spawnNotification', {
    //     type: 'success',
    //     message: this.$t('You are logged in!'),
    //     action1: { label: this.$t('OK') }
    //   })
    // },
    // onFailure (result) {
    //   this.$store.dispatch('notification/spawnNotification', {
    //     type: 'error',
    //     message: this.$t(result.result),
    //     action1: { label: this.$t('OK') }
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-error: color(error);
$white: color(white);

  .modal-content {
    @media (max-width: 400px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  .redirect-error {
    background-color: $color-error;
    color: $white;
  }
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
