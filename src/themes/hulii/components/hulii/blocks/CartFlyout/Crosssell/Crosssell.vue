<template>
  <section
    class="crosssell-container mt-6 px-6"
  >
    <div class="text-base crosssell--title font-semibold mb-4">
      <span>{{ $t('Recommended Accessories') }}</span>
    </div>
    <div>
      <div
        v-for="product in currentProduct.crosssell['crosssell-products']"
        :key="product.id"
        class="col-6 md:col-4 lg:col-3"
      >
        <product-tile :key="product.sku" :product="product" />
      </div>
    </div>
  </section>
</template>

<script>
import store from '@vue-storefront/core/store'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import ProductTile from './ProductTile'

export default {
  name: 'Related',
  components: {ProductTile},
  beforeMount () {
    if (store.state.config.usePriceTiers) {
      this.$bus.$on('user-after-loggedin', this.refreshList)
      this.$bus.$on('user-after-logout', this.refreshList)
    }
    this.refreshList()
  },
  beforeDestroy () {
    if (store.state.config.usePriceTiers) {
      this.$bus.$off('user-after-loggedin', this.refreshList)
      this.$bus.$off('user-after-logout', this.refreshList)
    }
  },
  destroyed () {
    this.$bus.$off('product-after-load', this.refreshList)
  },
  methods: {
    refreshList () {
      let sku = this.productLinks ? this.productLinks
        .filter(pl => pl.link_type === 'crosssell')
        .map(pl => pl.linked_product_sku) : null
      let key = 'sku'
      if (sku === null || (sku.length === 0)) {
        sku = this.product.current.category.map(cat => cat.category_id)
        key = 'category_ids'
      }
      let relatedProductsQuery = this.prepareCrosssellQuery(key, sku)
      this.$store.dispatch('product/list', {
        query: relatedProductsQuery,
        size: 8,
        prefetchGroupProducts: false,
        updateState: false
      }).then((response) => {
        if (response) {
          this.$store.dispatch('product/crosssell', {
            key: this.type,
            items: response.items
          })
          this.$forceUpdate()
        }
      })
    },
    prepareCrosssellQuery (key, sku) {
      let relatedProductsQuery = new SearchQuery()

      relatedProductsQuery = relatedProductsQuery.applyFilter({key: key, value: {'in': sku}})

      if (store.state.config.products.listOutOfStockProducts === false) {
        relatedProductsQuery = relatedProductsQuery.applyFilter({key: 'stock.is_in_stock', value: {'eq': true}})
      }

      return relatedProductsQuery
    },
    segClick () {
      window.analytics.track('Product Clicked', {
        product_id: this.product.sku,
        sku: this.product.sku,
        name: this.product.name,
        brand: this.product.brand,
        price: this.product.priceInclTax,
        image_url: this.hoverThumbnail
      })
    },
    visibilityChanged (isVisible, entry) {
      if (isVisible) {
        if (store.state.config.products.configurableChildrenStockPrefetchDynamic && store.products.filterUnavailableVariants) {
          const skus = [this.product.sku]
          if (this.product.type_id === 'configurable' && this.product.configurable_children && this.product.configurable_children.length > 0) {
            for (const confChild of this.product.configurable_children) {
              const cachedItem = store.state.stock.cache[confChild.id]
              if (typeof cachedItem === 'undefined' || cachedItem === null) {
                skus.push(confChild.sku)
              }
            }
            if (skus.length > 0) {
              store.dispatch('stock/list', { skus: skus }) // store it in the cache
            }
          }
        }
      }
    }
  },
  computed: {
    currentProduct () {
      return this.$store.state.product
    },
    crosssell () {
      return this.$store.state.crosssell
    },
    productLinks () {
      return this.currentProduct.current.product_links
    },
    hoverThumbnail () {
      if (this.product.media_gallery) {
        let images = this.product.media_gallery.filter(item => item.typ === 'image')
        if (images.length > 1) {
          let thumbnail = images[images.length - 1].image
          for (let i = 0; i < images.length; i++) {
            if (images[i].lab === 'alternative') {
              thumbnail = images[i].image
              break
            }
          }
          return this.getThumbnail(thumbnail, 310, 300)
        }
      }
      return null
    },
    hoverThumbnailObj () {
      return {
        src: this.hoverThumbnail,
        loading: this.thumbnail,
        error: this.thumbnail
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.crosssell--title {
  span {
    font-weight: 800;
    line-height: 12px;
    letter-spacing: .1em;
    text-transform: uppercase;
    font-size: 12px;
  }
}
