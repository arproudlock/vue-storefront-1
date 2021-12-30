<template>
  <div>
    <footer class="bg-grey-lighter" :class="{ 'border-top border-secondary bg-grey-lighter': isCheckoutPage && !isThankYouPage }" v-show="isThankYouPage || !isCheckoutPage">
      <div class="container footer--upper">
        <div class="footer--upper__container">
          <div class="upper__container--left">
            <div class="upper__trust-logos">
              <img class="mr-4 apple_pay_mark"
                   src="/assets/components/payment/Apple_Pay_Mark.svg"
                   v-lazy="'/assets/components/payment/Apple_Pay_Mark.svg'"
                   alt="visa"
              >
              <img class="mr-4"
                   src="/assets/components/payment/google-pay-mark.svg"
                   v-lazy="'/assets/components/payment/google-pay-mark.svg'"
                   alt="visa"
              >
              <img class="mr-4"
                   src="/assets/components/payment/visa.svg"
                   v-lazy="'/assets/components/payment/visa.svg'"
                   alt="visa"
              >
              <img
                class="mr-4"
                src="/assets/components/payment/mastercard.svg"
                v-lazy="'/assets/components/payment/mastercard.svg'"
                alt="mastercard"
              >
              <img
                class="mr-4"
                src="/assets/components/payment/american-express.svg"
                v-lazy="'/assets/components/payment/american-express.svg'"
                alt="american express"
              >
              <!-- <img
                class="mr-4"
                src="/assets/components/payment/paypal.svg"
                v-lazy="'/assets/components/payment/paypal.svg'"
                alt="paypal"
              > -->
            </div>
          </div>
          <div class="upper__container--right">
            <!-- <div class="upper__store-switcher">
              <store-switcher v-if="multistoreEnabled" class="px-6" />
            </div> -->
            <!-- <div class="upper__language-switcher">
              <language-switcher v-if="multistoreEnabled" class="px-6" />
            </div> -->
            <a href="mailto:hello@hulii.com" class="menu-link upper__email">hello@hulii.com</a>
            <a :href="`tel:` + getPhone" class="menu-link upper__tel">{{ getPhone }}</a>
          </div>
        </div>
      </div>
      <div
        class="footer--lower"
      >
        <div class="container">
          <div class="footer--lower__container">
            <div class="flex flex-col lower__newsletter">
              <Newsletter />
              <div class="lower__social">
                <div class="my-2">
                  <a target="_blank" rel="noopener" class="menu-link social--icon" href="https://www.instagram.com/huliiofficial/">
                    <instagram fill="#000" />
                  </a>
                </div>
                <div class="my-2">
                  <a target="_blank" rel="noopener" class="menu-link social--icon" href="https://www.facebook.com/Hulii-257870748498497/">
                    <facebook fill="#000" />
                  </a>
                </div>
                <div class="my-2">
                  <a target="_blank" rel="noopener" class="menu-link social--icon" href="https://twitter.com/HuliiOfficial">
                    <twitter fill="#000" />
                  </a>
                </div>
                <div class="my-2">
                  <a target="_blank" rel="noopener" class="menu-link social--icon" href="https://www.linkedin.com/company/hulii/">
                    <linkedin fill="#000" />
                  </a>
                </div>
              </div>
            </div>
            <div class="lower__menu">
              <div class="hidden md:block md:col-3 md:mr-8">
                <h3 class="text-sm">
                  {{ $t('Company') }}
                </h3>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/about-hulii')" exact>
                    {{ $t('About Hulii') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/blog')" exact>
                    {{ $t('Blog') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <a target="_blank" rel="noopener" class="menu-link" href="https://au.trustpilot.com/review/hulii.com">
                    {{ $t('Reviews') }}
                  </a>
                </div>
              </div>
              <div class="hidden md:block md:col-3 md:mr-8">
                <h3 class="text-sm">
                  {{ $t('Our Terms') }}
                </h3>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/terms-of-use')" exact>
                    {{ $t('Terms of Service') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/privacy-policy')" exact>
                    {{ $t('Privacy Policy') }}
                  </router-link>
                </div>
              </div>
              <div class="hidden md:block md:col-3">
                <h3 class="text-sm">
                  {{ $t('Help & Support') }}
                </h3>
                <!-- <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/product-quality')" exact>
                    {{ $t('Product Quality') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/shipping-and-delivery')" exact>
                    {{ $t('Shipping') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/returns')" exact>
                    {{ $t('Returns') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/warranty')" exact>
                    {{ $t('Warranty') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/contact-us')" exact>
                    {{ $t('Contact Us') }}
                  </router-link>
                </div> -->
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/returns')" exact>
                    {{ $t('Returns') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/warranty')" exact>
                    {{ $t('Warranty') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/product-quality')" exact>
                    {{ $t('Our Grading') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/contact-us')" exact>
                    {{ $t('Contact Us') }}
                  </router-link>
                </div>
              </div>
            </div>
            <div class="footer-menu md:hidden col-12 lg:col-8 mt-8 lg:mt-0">
              <Accordion class="md:hidden" :title="$t('Company')" :open="false">
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/about-hulii')" exact>
                    {{ $t('About Hulii') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/blog')" exact>
                    {{ $t('Blog') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <a target="_blank" rel="noopener" class="menu-link" href="https://au.trustpilot.com/review/hulii.com">
                    {{ $t('Reviews') }}
                  </a>
                </div>
              </Accordion>
              <Accordion class="md:hidden" :title="$t('Our Terms')" :open="false">
                <!-- <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/become-a-renewal-partner')" exact>
                    {{ $t('Become a Renewal Partner') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/blog')" exact>
                    {{ $t('Blog') }}
                  </router-link>
                </div> -->
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/terms-of-use')" exact>
                    {{ $t('Terms of Service') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/privacy-policy')" exact>
                    {{ $t('Privacy Policy') }}
                  </router-link>
                </div>
              </Accordion>
              <Accordion class="md:hidden" :title="$t('Help & Support')" :open="false">
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/returns')" exact>
                    {{ $t('Returns') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/warranty')" exact>
                    {{ $t('Warranty') }}
                  </router-link>
                </div>
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/product-quality')" exact>
                    {{ $t('Our Grading') }}
                  </router-link>
                </div>
                <!-- <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/shipping-and-delivery')" exact>
                    {{ $t('Shipping') }}
                  </router-link>
                </div> -->
                <div class="my-2">
                  <router-link class="menu-link" :to="localizedRoute('/help-center/contact-us')" exact>
                    {{ $t('Contact Us') }}
                  </router-link>
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex py-2 bg-white"
      >
        <div class="container flex">
          <a href="#" class="menu-link text-xs text-grey-dark py-1 justify-start">© {{ currentYear }} Hulii | ABN 66 628 238 951</a>
          <!-- <div class="flex legal justify-end">
            <router-link class="menu-link text-grey-dark text-xs underline px-6 py-1" :to="localizedRoute('/help-center/terms-of-use')" exact>
              {{ $t('Terms of Use') }}
            </router-link>
            <router-link class="menu-link text-grey-dark text-xs underline py-1" :to="localizedRoute('/help-center/privacy-policy')" exact>
              {{ $t('Privacy Policy') }}
            </router-link>
          </div> -->
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { AccountButton } from '@vue-storefront/core/modules/user/components/AccountButton'
import CurrentPage from 'theme/mixins/currentPage'
import StoreSwitcher from 'theme/components/hulii/StoreSwitcher.vue'
import LanguageSwitcher from 'theme/components/hulii/LanguageSwitcher.vue'
import Newsletter from 'theme/components/hulii/blocks/Footer/Newsletter'
import countryInformation from 'theme/resource/country-information.json'
import Accordion from 'theme/components/hulii/Accordion'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import NoSSR from 'vue-no-ssr'
import Facebook from 'theme/components/hulii/blocks/SocialIcons/Facebook'
import Instagram from 'theme/components/hulii/blocks/SocialIcons/Instagram'
import Linkedin from 'theme/components/hulii/blocks/SocialIcons/Linkedin'
import Twitter from 'theme/components/hulii/blocks/SocialIcons/Twitter'

export default {
  mixins: [CurrentPage, AccountButton],
  name: 'MainFooter',
  components: {
    Newsletter,
    StoreSwitcher,
    LanguageSwitcher,
    Accordion,
    'no-ssr': NoSSR,
    Facebook,
    Instagram,
    Linkedin,
    Twitter
  },
  data () {
    const storeView = currentStoreView()
    return {
      store: storeView.storeCode,
      phone: null
    }
  },
  computed: {
    multistoreEnabled () {
      return this.$store.state.config.storeViews.multistore
    },
    currentYear () {
      return (new Date()).getFullYear()
    },
    getPhone () {
      let country = this.store === '' ? 'us' : this.store
      return countryInformation[country]['contactInformation']['phone']
    },
    isThankYouPage () {
      return this.$store.state.checkout.isThankYouPage ? this.$store.state.checkout.isThankYouPage : false
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  @apply mt-12;

  @screen md {
    @apply mt-0;
  }
}
.footer--upper {
  @apply bg-grey-lighter;
  border-bottom: 1px solid #e7e7e7;

  .footer--upper__container {
    @apply flex flex-col items-center items-center justify-between py-2;

    .upper__container--left {
      @apply flex flex-row justify-center w-full;

      @screen md {
        @apply flex-row mb-0;
      }

      .upper__trust-logos {
        @apply flex;
        justify-content: center;
        align-items: center;

        img {
          height: 50px;
        }
        .apple_pay_mark {
          height: 30px !important;
        }
      }
    }
    .upper__container--right {
      @apply justify-center flex items-center mt-4;
      flex-wrap: wrap;

      .upper__store-switcher, .upper__language-switcher {
        @apply text-sm text-grey-dark font-semibold cursor-pointer;
      }

      .upper__email {
        @apply text-sm text-grey-dark px-6 font-semibold cursor-pointer;
      }

      .upper__tel {
        @apply py-4 text-sm text-grey-dark pl-6 pr-6 font-semibold cursor-pointer;

        @screen md {
          @apply py-0;
        }
      }
    }
  }
  @screen md {
    .footer--upper__container {
      @apply flex-row;
      .upper__container--left {
        @apply justify-start;
        width: inherit;
      }
      .upper__container--right {
        @apply justify-end mt-0;
      }
      .upper__tel {
        @apply pr-0;
      }
    }
  }
}
.footer--lower {
  @apply bg-grey-lighter my-4;

  .footer--lower__container {
    @apply flex flex-col justify-center;

    @screen md {
      @apply justify-between;
    }

    .lower__newsletter {
      flex-grow: 1;
    }
    .lower__social {
      @apply flex flex-row items-center mt-2;

      .social--icon {
        @apply mr-4 block;
      }
    }
    .lower__menu {
      @apply hidden;

      h3 {
        font-weight: 800;
        line-height: 12px;
        letter-spacing: .1em;
        text-transform: uppercase;
        font-size: 12px;
      }

      @screen md {
        @apply flex mt-8 justify-end;
      }

      @screen lg {
        @apply mt-0;
        width: 650px;
      }
      .menu-link {
        @apply text-base font-light text-grey-dark text-sm leading-normal;
      }
    }

  }
  @screen md {
    @apply my-10;
    .footer--lower__container {
      @apply flex-row;
    }
  }
}
.icon {
  transition: 0.3s all;
}
.small-icon {
  width: 12px;
}
</style>
