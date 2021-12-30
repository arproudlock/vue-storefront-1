<template>
  <div class="header">
    <header
      class="header-menu w-full"
    >
      <div
        class="h-full bg-white"
      >
        <div class="header-checkout--bar">
          <div class="checkout--logo">
            <logo :color="true" width="auto" height="41px" src="/assets/logo-color.svg" />
          </div>
          <ul class="checkout--steps" v-show="!activeSection.personalDetails">
            <li :class="{'active' : activeSection.shipping, 'editable' : addressFilled}" @click="edit('shipping')">
              <span>1</span><span class="steps--name">Address</span>
            </li>
            <div class="steps--break" />
            <li :class="{'active' : activeSection.delivery, 'editable' : deliveryFilled}" @click="edit('delivery')">
              <span>2</span><span class="steps--name">Delivery</span>
            </li>
            <div class="steps--break" />
            <li :class="{'active' : activeSection.payment, 'editable' : paymentFilled}" @click="edit('payment')">
              <span>3</span><span class="steps--name">Payment</span>
            </li>
          </ul>
          <div class="checkout--cart">
            <div class="current--total" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
              <div class="grand--value">
                {{ segment.value | price }}
              </div>
            </div>
            <router-link
              class="cart--icon"
              :to="localizedRoute({ name: 'cart' })"
              data-testid="openMicrocart"
              :aria-label="$t('Open microcart')"
            >
              <div class="minicart--icon">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 211.71 237.97"><title>Hulii Bag icon_Full-purple</title><g id="Layer_1-2" data-name="Layer 1"><path d="M95.1,2c-16.82,6.29-38.22,27.52-41,84.33H10.14A10.15,10.15,0,0,0,.08,97.71l15.49,121A22.06,22.06,0,0,0,37.46,238H175.12A22.07,22.07,0,0,0,197,218.55l14.6-120.92a10.14,10.14,0,0,0-10.07-11.35H158.14c0-61.83-26.41-79.5-41.5-84.55A32.42,32.42,0,0,0,95.1,2Zm51.13,84.33H66c0-53.35,25.44-74.67,40.75-74.67C123.59,11.61,146.23,34.47,146.23,86.28Z" transform="translate(0 0)" style="fill:#372768" /></g></svg>
              </div>
              <no-ssr>
                <span
                  class="minicart-count absolute flex justify-center items-center text-xxs font-semibold text-white"
                  v-cloak
                  v-if="totalQuantity"
                  data-testid="minicartCount"
                >
                  {{ totalQuantity }}
                </span>
              </no-ssr>
            </router-link>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Logo from 'theme/components/hulii/Logo'
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary'
import NoSSR from 'vue-no-ssr'

export default {
  name: 'Header',
  components: {
    Logo,
    'no-ssr': NoSSR
  },
  mixins: [CartSummary],
  props: {
    activeSection: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      addressFilled: false,
      deliveryFilled: false
    }
  },
  beforeMount () {
    this.$bus.$on('checkout-step-completed', this.filledSteps)
  },
  beforeDestroy () {

  },
  computed: {
    ...mapGetters({
      totalQuantity: 'cart/getItemsTotalQuantity'
    }),
    ...mapState({
      currentUser: state => state.user.current
    }),
    paymentFilled () {
      return this.addressFilled && this.deliveryFilled
    }
  },
  methods: {
    edit (value) {
      if (value === 'shipping' && this.addressFilled === true) {
        this.$bus.$emit('checkout-before-edit', value)
      } else if (value === 'delivery' && this.deliveryFilled === true) {
        this.$bus.$emit('checkout-before-edit', value)
      } else if (value === 'payment' && this.deliveryFilled === true && this.addressFilled === true) {
        this.$bus.$emit('checkout-before-edit', value)
      }
    },
    filledSteps (val) {
      if (val === 'address') {
        this.addressFilled = true
      } else if (val === 'delivery') {
        this.deliveryFilled = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';

header {
  height: 61px;
  top: -62px;
  z-index: 2;
  transition: top 0.2s ease-in-out;
  &.is-visible {
    top: 0;
  }
  &.header-menu {
    @apply bg-white;
    .header-checkout--bar {
      @apply flex items-center h-full relative items-center justify-between;
      padding: 10px 0;

      @apply screen md {
        padding-left: 45px;
      }

      .checkout--logo {
        order: 2;

        @screen md {
          order: 1;
          position: absolute;
        }
      }

      .header-menu--logo {
        margin-right: 20px;

        @screen lg {
          margin-right: 40px;
        }
      }
      .checkout--steps {
        @apply text-grey flex flex-row pl-0 items-center;
        order: 1;
        display: flex;
        min-width: 100px;

        .steps--name {
          @apply hidden;
        }
        .steps--break {
          @apply hidden;
          height: 1px;
          background: #bdbdbd;
          width: 20%;
        }
        li {
          @apply mr-4;
          vertical-align: top;
          zoom: 1;
          list-style: none;
          font-size: 13px;

          &.editable {
            @apply cursor-pointer;

            &:hover {
              &:after {
                background: #00344B;
                content: "";
                height: 1px;
                left: 0;
                opacity: 0;
                position: absolute;
                top: 125%;
                transform: scaleX(0);
                transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                width: 100%;
              }
            }
          }

          &.active {
            @apply text-hulii-turquoise font-semibold;
          }
        }
        @screen md {
          order: 2;
          justify-content: flex-end;
          width: 100%;
        }
        @screen lg {
          max-width: 572px;
          margin: auto;
          justify-content: space-between;

          .steps--name {
            @apply block;
          }
          .steps--break {
            display: flex;
            justify-content: space-between;
          }
          li {
            @apply mr-0 flex;
            span {
              &:nth-of-type(1) {
                @apply mr-2;
              }
            }
          }
        }
      }
      .checkout--cart {
        @apply flex justify-end text-grey;
        order: 3;
        min-width: 100px;

        .current--total {
          @apply flex items-center mr-2;
          font-size: 13px;
        }

        .cart--icon {
          max-height: 56px;
          svg {
            fill: #372768;
            width: 24px;
          }
        }
        @screen md {
          @apply hidden;
        }
      }
    }
  }
}
.header-placeholder {
  height: 61px;
}
.minicart--icon {
  display: inline-block;
  margin-top: 2px;
  position: relative;
  vertical-align: top;
  max-height: 56px;
  svg {
    fill: #fff;
    width: 24px;
  }
}
.minicart-count {
  font-size: 11px;
  font-weight: bold;
  height: 10px;
  line-height: 10px;
  position: absolute;
  right: 3px;
  text-align: center;
  top: 16px;
  transition: color 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
  width: 18px;
}
</style>
