<template>
  <modal name="modal-switcher-language" :width="500">
    <p slot="header">
      {{ $t('Select your preferred language') }}?
    </p>
    <div slot="content" class="py-4">
      <div :class="{ 'columns': enableColumns }">
        <div v-for="(lang, index) in languages" :key="index" class="col-md-6 mb-2">
          <button-full
            class="border-none ripple tracking-normal rounded-normal text-sm text-grey-dark leading-normal text-sm bg-grey-light items-center flex justify-center py-3 px-5 w-full mr-2"
            :class="{'full-button' : currentLang === lang.code, 'full-light-button' : currentLang !== lang.code}"
            @click.native="changeLanguage(lang.code)"
          >
            {{ lang.name }}
          </button-full>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import Modal from 'theme/components/core/Modal.vue'
import store from '@vue-storefront/core/store'
import { loadLanguageAsync } from '@vue-storefront/i18n'
import ButtonFull from 'theme/components/theme/ButtonFull'

export default {
  components: {
    Modal,
    ButtonFull
  },
  data () {
    return {
      minCountryPerColumn: 3,
      componentLoaded: false,
      selectedLanguage: '',
      languages: [
        {'name': 'English', 'code': 'en-US'},
        {'name': '中文', 'code': 'zh-CN'}
      ]
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
    currentLang () {
      return this.$i18n.locale
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
      this.$bus.$emit('modal-hide', 'modal-switcher-language')
      this.$store.commit('ui/setMaxOverlay', false)
    },
    changeLanguage (selectedLanguage) {
      loadLanguageAsync(selectedLanguage)
      this.$bus.$emit('modal-hide', 'modal-switcher-language')
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
  .full-button {
    border: none !important;
    @apply bg-highlight;
    color: white !important;
  }
  .full-light-button {
    color: #333 !important;
    border: none !important;
    background-color: #e7e7e7 !important;
  }
</style>
