<template>
  <div class="default-layout">
    <overlay v-if="overlayActive" />
    <search-overlay v-if="overlaySearchActive" />
    <search-results v-if="overlaySearchActive" />
    <loader />
    <div id="viewport" class="w-100 relative">
      <main-header />
      <!-- <nav-header /> -->
      <!-- <trust-bar /> -->
      <async-sidebar
        :async-component="SearchPanel"
        :is-open="isSearchPanelOpen"
        @close="$store.commit('ui/setSearchpanel')"
      />
      <async-sidebar
        :async-component="Microcart"
        :is-open="isMicrocartOpen"
        @close="$store.commit('ui/setMicrocart')"
      />
      <async-sidebar
        :async-component="Wishlist"
        :is-open="isWishlistOpen"
        @close="$store.commit('ui/setWishlist')"
      />
      <async-sidebar
        :async-component="SidebarMenu"
        :is-open="isSidebarOpen"
        @close="$store.commit('ui/setSidebar')"
        direction="left"
      />
      <async-drawer
        :async-component="ConditionExplanation"
        :is-open="isConditionsExplanationOpen"
        @close="$store.commit('ui/setConditionsExplanation')"
      />
      <slot />
      <main-footer />
      <notification />
      <sign-up />
      <promotion />
      <cookie-notification />
      <offline-badge />
      <order-confirmation :orders-data="ordersData" v-if="loadOrderConfirmation" />
    </div>
    <vue-progress-bar />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AsyncSidebar from 'theme/components/hulii/blocks/AsyncSidebar/AsyncSidebar.vue'
import AsyncDrawer from 'theme/components/hulii/blocks/AsyncDrawer/AsyncDrawer.vue'
import MainHeader from 'theme/components/hulii/blocks/Header/Header.vue'
import MainFooter from 'theme/components/hulii/blocks/Footer/Footer.vue'
import Overlay from 'theme/components/hulii/Overlay.vue'
import SearchOverlay from 'theme/components/hulii/SearchOverlay.vue'
import SearchResults from 'theme/components/hulii/blocks/Search/SearchResults'
import Loader from 'theme/components/hulii/Loader.vue'
import Notification from 'theme/components/hulii/Notification.vue'
import SignUp from 'theme/components/hulii/blocks/Auth/SignUp.vue'
import Promotion from 'theme/components/hulii/blocks/Promotion/Promotion.vue'
import CookieNotification from 'theme/components/hulii/CookieNotification.vue'
import OfflineBadge from 'theme/components/hulii/OfflineBadge.vue'
import { isServer } from '@vue-storefront/core/helpers'
import HighlightColor from 'theme/mixins/highlightColor'
import Head from 'theme/head'
import config from 'config'

const SidebarMenu = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-sidebar-menu" */ 'theme/components/hulii/blocks/SidebarMenu/SidebarMenu.vue')
const Microcart = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-microcart" */ 'theme/components/hulii/blocks/CartFlyout/CartFlyout.vue')
const ConditionExplanation = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-microcart" */ 'theme/components/hulii/blocks/Product/ConditionExplanation.vue')
const Wishlist = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-wishlist" */ 'theme/components/hulii/blocks/Wishlist/Wishlist.vue')
const SearchPanel = () => import(/* webpackChunkName: "vsf-search-panel" */ 'theme/components/hulii/blocks/SearchPanel/SearchPanel.vue')
const OrderConfirmation = () => import(/* webpackChunkName: "vsf-order-confirmation" */ 'theme/components/hulii/blocks/Checkout/OrderConfirmation.vue')

export default {
  data () {
    return {
      loadOrderConfirmation: false,
      ordersData: [],
      Microcart,
      Wishlist,
      SearchPanel,
      SidebarMenu,
      ConditionExplanation
    }
  },
  mixins: [HighlightColor],
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay,
      overlaySearchActive: state => state.ui.searchOverlay,
      isSearchPanelOpen: state => state.ui.searchpanel,
      isSidebarOpen: state => state.ui.sidebar,
      isMicrocartOpen: state => state.ui.microcart,
      isWishlistOpen: state => state.ui.wishlist,
      isConditionsExplanationOpen: state => state.ui.conditionsExplanation
    })
  },
  methods: {
    onOrderConfirmation (payload) {
      this.loadOrderConfirmation = true
      this.ordersData = payload
      this.$bus.$emit('modal-show', 'modal-order-confirmation')
    },
    fetchMenuData () {
      return this.$store.dispatch('category/list', { level: config.entities.category.categoriesDynamicPrefetch && config.entities.category.categoriesDynamicPrefetchLevel >= 0 ? config.entities.category.categoriesDynamicPrefetchLevel : null, includeFields: config.entities.optimize && isServer ? config.entities.category.includeFields : null, skipCache: isServer })
    }
  },
  serverPrefetch () {
    return this.fetchMenuData()
  },
  beforeMount () {
    // Progress bar on top of the page
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start()
      this.$Progress.increase(40)
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
    this.$bus.$on('offline-order-confirmation', this.onOrderConfirmation)
  },
  beforeDestroy () {
    this.$bus.$off('offline-order-confirmation', this.onOrderConfirmation)
  },
  metaInfo: Head,
  components: {
    MainHeader,
    MainFooter,
    Overlay,
    SearchOverlay,
    Loader,
    Notification,
    SignUp,
    CookieNotification,
    OfflineBadge,
    OrderConfirmation,
    AsyncSidebar,
    AsyncDrawer,
    SearchResults,
    Promotion
  }
}
</script>

<style lang="scss" src="theme/css/main.scss"></style>
