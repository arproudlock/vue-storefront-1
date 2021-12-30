<template>
  <div id="help-center" class="container">
    <breadcrumbs
      :routes="[{name: 'Help Center', route_link: ''}]"
      :active-route="$props.title"
      class="pt-4 pl-sm"
    />
    <div class="container pt-4 pb-16">
      <div class="row gutter-md justify-between">
        <div class="md:col-3 lg:col-2 mb-8 md:pl-0">
          <nav class="static-menu mb35">
            <ul class="list-reset">
              <li class="border-b py-2" v-for="page in navigation" :key="page.id">
                <router-link :to="localizedRoute(page.link)" @click.native="setContent(page.component, page.id, page.hcid)" class="nav-link">
                  {{ page.title }}<svg class="menu-option__arrow"><use xlink:href="#right" /></svg>
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-12 md:col-9">
          <component v-if="Number(id)" :is="activeComponent" :id="Number(id)" :hcid="hcid" :type="'Page'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import Breadcrumbs from '../components/hulii/Breadcrumbs'
import FAQ from 'theme/components/hulii/blocks/HelpCenter/FAQ'
import PrivacyPolicy from 'theme/components/hulii/blocks/HelpCenter/PrivacyPolicy'
import Returns from 'theme/components/hulii/blocks/HelpCenter/Returns'
import Shipping from 'theme/components/hulii/blocks/HelpCenter/Shipping'
import TermsOfUse from 'theme/components/hulii/blocks/HelpCenter/TermsOfUse'
import Warranty from 'theme/components/hulii/blocks/HelpCenter/Warranty'
import ProductQuality from 'theme/components/hulii/blocks/HelpCenter/ProductQuality'
import ProductConditions from 'theme/components/hulii/blocks/HelpCenter/ProductConditions'
import MakingAnOrder from 'theme/components/hulii/blocks/HelpCenter/MakingAnOrder'
import AboutHulii from 'theme/components/hulii/blocks/HelpCenter/AboutHulii'
import Contact from 'theme/components/hulii/blocks/HelpCenter/Contact'
import { currentStoreView } from '@vue-storefront/core/store/lib/multistore'

export default {
  components: {
    FAQ,
    PrivacyPolicy,
    Returns,
    Shipping,
    TermsOfUse,
    Breadcrumbs,
    Contact
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$props.title,
      meta: this.$route.meta.description ? [{vmid: 'description', description: this.$route.meta.description}] : []
    }
  },
  mounted () {
    const storeView = currentStoreView()
    if (storeView.storeCode === '') {
      this.activeComponent = this.navigation.find(nav => nav.link === this.$route.path) ? this.navigation.find(nav => nav.link === this.$route.path).component : null
      this.id = this.navigation.find(nav => nav.link === this.$route.path) ? this.navigation.find(nav => nav.link === this.$route.path).id : null
      this.hcid = this.navigation.find(nav => nav.link === this.$route.path) ? this.navigation.find(nav => nav.link === this.$route.path).hcid : null
    } else {
      this.activeComponent = this.navigation.find(nav => nav.link === this.$route.path.substring(3)) ? this.navigation.find(nav => nav.link === this.$route.path.substring(3)).component : null
      this.id = this.navigation.find(nav => nav.link === this.$route.path.substring(3)) ? this.navigation.find(nav => nav.link === this.$route.path.substring(3)).id : null
      this.hcid = this.navigation.find(nav => nav.link === this.$route.path.substring(3)) ? this.navigation.find(nav => nav.link === this.$route.path.substring(3)).hcid : null
    }
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    setContent (component, id, hcid) {
      this.activeComponent = component
      this.id = id
      this.hcid = hcid;
    }
  },
  data () {
    return {
      navigation: [
        { title: i18n.t('Shipping & Delivery'), link: '/help-center/shipping-and-delivery', component: Shipping, id: 11, hcid: '1r5EQtesBefyrOPKBKAJbb' },
        { title: i18n.t('Returns'), link: '/help-center/returns', component: Returns, id: 6, hcid: '6UUgLFP6Wj8JKgQiA68Qv8' },
        { title: i18n.t('Warranty'), link: '/help-center/warranty', component: Warranty, id: 21, hcid: 'W4r8WZJp7bCK5wDO2XZDB' },
        { title: i18n.t('Product Quality'), link: '/help-center/product-quality', component: ProductQuality, id: 17, hcid: 'xkVxrDN0cUHK6R7TDDCNQ' },
        // { title: i18n.t('Product Conditions'), link: '/help-center/product-conditions', component: ProductConditions, id: 18 },
        { title: i18n.t('Making an Order'), link: '/help-center/making-an-order', component: MakingAnOrder, id: 19, hcid: '7pciRP37gJbfFe5dOJ5rH6' },
        { title: i18n.t('About Hulii'), link: '/help-center/about-hulii', component: AboutHulii, id: 16, hcid: '7D2HEaee9Yvy9NFNVdgI6s' },
        { title: i18n.t('Terms of Use'), link: '/help-center/terms-of-use', component: TermsOfUse, id: 8, hcid: '5qBWT8uLIOD63B7n1bUWqc' },
        { title: i18n.t('Privacy Policy'), link: '/help-center/privacy-policy', component: PrivacyPolicy, id: 4, hcid: '3HVX7CodKro6Np4aFu0VH5' },
        { title: i18n.t('Contact Us'), link: '/help-center/contact-us', component: Contact, id: 14, hcid: '4hNDZyWBFDTpr7xn7Hz98J' }
      ],
      activeComponent: null,
      id: null,
      hcid: null
    }
  }
}
</script>

<style lang="scss">
//@import '~theme/css/base/text';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-tertiary: color(tertiary);

.static-menu {
  .nav-link {
    @apply block font-normal py-1 flex items-center relative;
    color: #bdbdbd;

    .menu-option__arrow {
      width: 0.75rem;
      height: 0.75rem;
      right: 15px;
      transition: all 0.3s;
      position: absolute;
      fill: #333;
    }
    &:hover, &:focus {
      @apply font-semibold text-hulii-orange;
    }

    &.router-link-exact-active {
      @apply font-semibold relative text-hulii-orange fill-current;
      .menu-option__arrow {
        right: 10px;
      }
    }
  }
}
.static__content-block {
  @apply mb-2;
  h3 {
    @apply mt-0;
    font-size: 16px;
  }

  h3, h4 {
    @apply py-2
  }
}
</style>
