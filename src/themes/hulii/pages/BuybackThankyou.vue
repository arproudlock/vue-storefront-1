<template>
  <div id="thank-you">
    <div class="thank-you container">
      <div class="thank-you--breadcrumbs">
        <breadcrumbs
          :routes="[{name: 'Home', route_link: '/'}]"
          :active-route="this.$t('Completed Buyback Order')"
        />
      </div>
      <div class="thank-you--content">
        <header class="thank-you--header">
          <h1>
            {{ $t('Thank You') }}
          </h1>
          <p class="thank-you--subtitle">
            <!-- {{ $t('Both us and the Earth thank you for your order! You are actively helping to reducing global e-waste through making this purchase. We\'ll get started on your order right away. You should be receiving an order confirmation email shortly. If you have any questions please call us on') }} -->
            <!-- {{ $t('Both us and the Earth thank you for your order! You are actively helping to reducing global e-waste through making this purchase. We\'ll get started on your order right away. You should be receiving an order confirmation email shortly.') }} -->
            {{ $t('By placing this buyback order you are doing your bit for our planet! We\'ll get started on your order right away. You will be receiving a buyback confirmation email shortly with further information to complete your buyback.') }}
            <br>
            <br>
            <!-- {{ $t('If you have any questions please call us on') }} -->
            {{ $t('If you have any questions please ') }}
            <!-- <a :href="`tel:` + getPhone" class="menu-link upper__tel">{{ getPhone }}.</a> -->
            <router-link class="menu-link" :to="localizedRoute('/help-center/contact-us')" exact>
              {{ $t('contact us.') }}
            </router-link>
          </p>
        </header>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      orderNumber: '1001-005'
    }
  }
}
</script>

<style lang="scss" scoped>
.thank-you {
  // @apply w-full;
  // display: grid;
  padding-top: 20px;
  // grid-template-columns: repeat(12, 1fr);
  // grid-column-gap: 16px;
  // grid-template-areas:
  //   "breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb"
  //   "content content content content content content content content content content content content";
  margin-bottom: 50px;
  .thank-you--breadcrumbs {
    // grid-area: breadcrumb;
  }
  .thank-you--container {
    display: flex;
    justify-content: center;
  }
  .thank-you--content {
    // grid-area: content;
    .thank-you--header {
      @apply text-center;
      h1 {
        @apply text-hulii-hot-pink;
        line-height: 75px;
        font-size: 60px;
      }
      .thank-you--subtitle {
        max-width: 700px;
        margin: auto;
        font-weight: 600;
        user-select: none;
      }
    }
  }
}
  .thank-you-content {
    padding-left: 0;

    p {
      line-height: 25px
    }

    @media (min-width: 64em) {
      h4 {
        font-size: 24px;
      }
    }
  }
  .thank-you-improvment {
    padding: 0 20px 15px;

    @media (min-width: 64em) {
      padding: 0 40px 10px;
    }

    textarea {
      min-height: 100px;
    }
  }
</style>
