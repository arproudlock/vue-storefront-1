<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <modal name="modal-switcher-store" :width="500">
    <p slot="header">
      {{ $t('Choose your country or region') }}?
    </p>
    <div slot="content" class="py-4">
      <div :class="{ 'columns': enableColumns }">
        <a :href="storeView.url" class="country country-available hover:font-semibold" :class="{'country--active' : storeCode == storeView.i18n.defaultCountry}" v-for="(storeView, storeCode) in storeViews" :key="storeCode" v-if="!storeView.disabled && storeCode && typeof storeView === 'object' && storeView.i18n">
          <img :src="'/assets/flags/' + storeCode + '.svg'" class="country--flag">
          <span>{{ $t(storeView.i18n.fullCountryName) }}</span>
        </a>
      </div>
    </div>
  </modal>
</template>
<script>
import Modal from 'theme/components/hulii/Modal.vue'
import store from '@vue-storefront/core/store'
export default {
  components: {
    Modal
  },
  data () {
    return {
      minCountryPerColumn: 3,
      componentLoaded: false
    }
  },
  computed: {
    storeViews () {
      let stores = store.state.config.storeViews
      // let sortable = []
      // for (let s in stores) {
      //   sortable.push([s, stores[s]])
      // }
      // let sorted = sortable.sort((a, b) => { return a.i18n.fullCountryName - b.i18n.fullCountryName })
      return stores
    },
    config () {
      return store.state.config
    },
    enableColumns () {
      var enableStoreViews = Object.keys(store.state.config.storeViews).filter((key) => {
        var value = store.state.config.storeViews[key]
        return (typeof value === 'object' && value.disabled === false)
      })
      return enableStoreViews.length > this.minCountryPerColumn
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-switcher-store')
      this.$store.commit('ui/setMaxOverlay', false)
    }
  }
}
</script>
<style lang="scss" scoped>
  h3 {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  .columns {
    -moz-column-count: 1;
    column-count: 1;

    @screen md {
      -moz-column-count: 2;
      column-count: 2;
      column-gap: 15px;
    }
    .country {
      -webkit-column-break-inside: avoid;
      page-break-inside: avoid;
      break-inside: avoid;
    }
  }
  .country {
    @apply text-grey-dark flex items-center;
    margin-bottom: 2em;
    .country--flag {
      @apply mr-4;
      max-width: 25px;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    margin-left: -1em;
    li {
      display: inline-block;
      margin-left: 1em;
      a {
        font-size: 0.9em;
      }
    }
  }
</style>
