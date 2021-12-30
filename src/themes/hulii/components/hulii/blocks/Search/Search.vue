 <!-- Search box (used inside header) -->
<template>
  <div
    class="relative w-full"
    data-testid="search"
  >
    <div class="header-search-box">
      <input
        :show-label="false"
        ref="search"
        type="text"
        id="search_input"
        :aria-label="$t('Search Anything')"
        :placeholder="$t('Search Anything')"
        v-model="search"
        @input="makeSearch"
        @keydown.esc="closeOverlay"
        @focus="onFocus"
        @blur="onBlur"
      >
    </div>
    <div class="absolute search--results border-none z-20 w-full" @mouseenter="resultsHover = true" @mouseleave="resultsHover = false">
      <div v-show="showDrop">
        <product :key="product.id" v-for="product in results" :product="product" @click.native="resultsHover = false" class="" />
        <transition name="fade">
          <router-link
            :to="localizedRoute(link)"
            @click.native="searchTerms"
            v-if="moreResults"
            class="view-all--results w-full px-3 border-t border-grey-lighter"
          >
            <div class="text-grey-dark font-semibold flex justify-center items-center px-3 pr-4 hover:text-highlight">
              {{ $t('View all results') }}
            </div>
          </router-link>
        </transition>
        <transition name="fade">
          <div v-if="emptyResults" class="no--results w-full p-4 text-grey-dark font-semibold text-center">
            {{ $t('Hmmm, we can\'t seem to find anything.') }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'
import Product from './Product'
import VueOfflineMixin from 'vue-offline/mixin'
import { setTimeout } from 'timers'

export default {
  components: {
    Product
  },
  mixins: [SearchPanel, VueOfflineMixin],
  data () {
    return {
      searchFocus: false,
      resultsHover: false,
      showResults: 5
    }
  },
  computed: {
    link () {
      return '/s?k=' + this.search
      // return { name: 'search', params: { search: this.search } }
    },
    showDrop () {
      return (this.searchFocus && this.search !== '') || this.resultsHover
    },
    results () {
      return this.products.slice(0, this.showResults)
    },
    moreResults () {
      return this.products.length > this.showResults
    }
  },
  mounted () {
    this.$bus.$on('focusSearchInput', () => {
      if (!this.$store.state.ui.searchpanel) {
        this.$refs.search.focus()
      }
    })
  },

  methods: {
    onClose () {
      this.searchFocus = false
      this.$store.commit('ui/setSearchOverlay', this.searchFocus)
      this.$store.commit('ui/setHeaderDropdownMenu', false)
    },
    onFocus () {
      this.searchFocus = true
      this.$store.commit('ui/setSearchOverlay', this.searchFocus)
      this.$store.commit('ui/setHeaderDropdownMenu', false)
    },
    searchTerms () {
      this.searchFocus = false
      this.$store.commit('ui/setSearchOverlay', this.searchFocus)
      this.$store.commit('ui/setHeaderDropdownMenu', false)
      window.analytics.track('Products Searched', {
        query: this.search
      })
      setTimeout(() => {
        this.$router.push({
          name: 'search',
          query: {
            k: this.search
          }
        })
      }, 200)
    },
    closeOverlay () {
      setTimeout(() => {
        this.$store.commit('ui/setSearchOverlay', false)
      }, 200)
    },
    onBlur () {
      this.searchFocus = false
    }
  }
}
</script>

<style lang="scss">
  .header-search-box {
    input {
      font-size: 14px;
      outline: none;
      padding-left: .75rem;
      height: 38px;
      border-radius: 5px;
      width: 100%;
      line-height: 38px;
      border: none;

      &::placeholder {
        color: #C1C1C1;
      }
    }
  }
  .search--results {
    margin-top: 30px;
    .no--results, .view-all--results {
      font-weight: 800;
      line-height: 12px;
      letter-spacing: .1em;
      text-transform: uppercase;
      font-size: 12px;
    }
  }
</style>
