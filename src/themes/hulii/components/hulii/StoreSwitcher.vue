<template>
  <div>
    <a href="#" class="store-locale flex items-center text-grey-dark font-semibold text-sm underline leading-normal" @click.prevent="launchModal">
      <img
        class="country--icon"
        :src="storeImage"
        v-lazy="storeImage"
        :alt="getCurrentStore"
      >
      {{ country }} ({{ currency }})
    </a>
    <modal-switcher />
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/store/lib/multistore'
const ModalSwitcher = () => import(/* webpackChunkName: "vsf-languages-modal" */ 'theme/components/hulii/blocks/Switcher/Store.vue')
export default {
  data () {
    const storeView = currentStoreView()
    return {
      store: storeView.storeCode,
      country: storeView.i18n.defaultCountry,
      lang: storeView.i18n.defaultLanguage,
      currency: storeView.i18n.currencyCode
    }
  },
  components: {
    ModalSwitcher
  },
  computed: {
    storeImage () {
      let storeCode = currentStoreView().storeCode
      if (storeCode !== '') {
        return '/assets/flags/' + storeCode + '.svg'
      } else {
        return '/assets/flags/us.svg'
      }
    },
    getCurrentStore () {
      let storeCode = currentStoreView().storeCode
      if (storeCode !== '') {
        return 'Hulii in' + storeCode
      } else {
        return 'Hulii in US'
      }
    }
  },
  methods: {
    launchModal () {
      this.$bus.$emit('modal-show', 'modal-switcher-store')
    }
  }
}
</script>
<style lang="scss" scoped>
.country--icon {
  @apply mr-2;
  width: 24px;
}
</style>
