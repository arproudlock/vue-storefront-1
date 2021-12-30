<template>
  <div id="my_account">
    <div class="container account--container">
      <div class="account--breadcrumb">
        <breadcrumbs
          :routes="[{name: 'Home', route_link: '/'}]"
          active-route="My Account"
        />
      </div>
      <nav class="account--menu serif h4 mb35">
        <ul class="m0 p0">
          <li class="menu--item" v-for="(page, index) in navigation" :key="index" @click="notify(page.title)">
            <router-link :to="localizedRoute(page.link)" :class="'text-' + page.color">
              {{ page.title }}
            </router-link>
          </li>
        </ul>
      </nav>
      <no-ssr>
        <div class="account--content">
          <component :is="this.$props.activeBlock" />
        </div>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import MyAccount from '@vue-storefront/core/pages/MyAccount'
import Breadcrumbs from 'theme/components/hulii/Breadcrumbs'
import MyProfile from 'theme/components/hulii/blocks/MyAccount/MyProfile'
import MyShippingDetails from 'theme/components/hulii/blocks/MyAccount/MyShippingDetails'
import MyNewsletter from 'theme/components/hulii/blocks/MyAccount/MyNewsletter'
import MyOrders from 'theme/components/hulii/blocks/MyAccount/MyOrders'
import MyOrder from 'theme/components/hulii/blocks/MyAccount/MyOrder'
import MyFavourites from 'theme/components/hulii/blocks/MyAccount/MyFavourites'
import NoSSR from 'vue-no-ssr'

export default {
  data () {
    return {
      navigation: [
        { title: this.$t('Profile'), link: '/my-account', image: 'https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/my-account/details.svg', color: 'hulii-turquoise' },
        { title: this.$t('Shipping Details'), link: '/my-account/shipping-details', image: 'https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/my-account/shipping-address.svg', color: 'hulii-hot-pink' },
        { title: this.$t('Orders'), link: '/my-account/orders', image: 'https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/my-account/orders.svg', color: 'hulii-orange' },
        { title: this.$t('Favourites'), link: '/my-account/favourites', image: 'https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/my-account/recently-viewed.svg', color: 'hulii-yellow' }
      ]
    }
  },
  components: {
    Breadcrumbs,
    MyProfile,
    MyShippingDetails,
    MyNewsletter,
    MyOrders,
    MyOrder,
    MyFavourites,
    'no-ssr': NoSSR
  },
  mixins: [MyAccount],
  methods: {
  }
}
</script>

<style lang="scss">
@import '~theme/css/base/text';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-tertiary: color(tertiary);

.account--container {
  padding-top: 20px;
  grid-template-areas:
    "breadcrumb breadcrumb breadcrumb breadcrumb . . . . . . . ."
    "menu menu menu content content content content content content content content content";
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 16px;

  .account--breadcrumb {
    margin-bottom: 60px;
    grid-area: breadcrumb;
    display: flex;
  }

  .account--menu {
    grid-area: menu;
    display: flex;

    ul {
      list-style: none;
    }

    .menu--item {
      @apply flex flex-row items-center mb-4;
      font-weight: 600;
      a {
        opacity: 0.7;
        &:hover,
        .router-link-exact-active {
          opacity: 1;
          &:after {
            opacity: 0;
          }
        }
      }
      &:after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: $color-tertiary;
      }
      .router-link-active {
        opacity: 1;
      }
    }
  }

  .account--content {
    grid-area: content;
    display: flex;
    margin-bottom: 50px;
  }
}
</style>
