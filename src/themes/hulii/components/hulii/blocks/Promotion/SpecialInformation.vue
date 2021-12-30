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
      <div slot="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla felis leo, vitae vestibulum quam posuere eu. Nunc nec tempor orci. Duis ac tempus quam. Nam porta sapien sit amet placerat euismod. Fusce malesuada arcu vel lorem rhoncus fringilla. Vestibulum condimentum ante a neque tristique tincidunt. Vestibulum sed mi quis urna pellentesque varius non id lorem. Fusce sed congue risus, pellentesque placerat ipsum.
        </p>
        <div class="btn email--input align-center">
          <button class="text-white bg-hulii-purple" @click="close">
            Close
          </button>
        </div>
      </div>
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
  beforeDestroy () {
    this.$off('validation-error')
  },
  methods: {
    close (e) {
      // if (e) localStorage.removeItem('redirect')
      this.$bus.$emit('modal-hide', 'modal-promotion')
    },
    onSuccesfulSubmission () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('You have been successfully subscribed!'),
        action1: { label: i18n.t('OK') }
      })
      this.$bus.$emit('modal-hide', 'modal-promotion')
    },
    segIdentify () {
      window.analytics.identify({
        email: this.email
      })
      window.ORIBI.api('setUserEmail', this.email);
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
        message: this.$t(result.result),
        action1: { label: this.$t('OK') }
      })
    }
  },
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput,
    FullButton,
    i18n
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
