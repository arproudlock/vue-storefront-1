<template>
  <div>
    <section class="checkout--container" v-show="!isThanks">
      <!-- <checkout-header :active-section="activeSection" /> -->
      <div class="checkout--contents">
        <p v-show="isLoading">
          Finalising Order... Please wait
        </p>
        <p v-show="!isLoading">
          checkoutId = {{ checkoutId }}
        </p>
      </div>
    </section>
    <thank-you-page v-show="isThanks" />
  </div>
</template>

<script>
// import Checkout from '@vue-storefront/core/pages/Checkout'
// import CheckoutHeader from 'theme/components/hulii/blocks/Checkout/Header'
import ThankYouPage from 'theme/components/hulii/blocks/Checkout/ThankYouPage'
import { mapState } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
export default {
  components: {
    ThankYouPage
    // CheckoutHeader
  },
  mixins: [],
  computed: {
    ...mapState({
      currentUser: state => state.user.current
    })
  },
  data () {
    return {
      isThanks: false,
      result: null,
      checkoutId: null,
      isLoading: true
    }
  },
  beforeMount () {
    this.result = this.$route.query.result;
    this.checkoutId = this.$route.query.checkout_id;
  },
  mounted () {
    if (this.checkoutId) {
      this.isLoading = false;
    }
  }
}
</script>

<style lang="scss">

</style>
