<template>
  <div class="flex flex-row items-center checkout-product-item p-2 mb-3 bg-white">
    <div class="pr-4 flex flyout--image">
      <img class="blend max-h-full" v-lazy="thumbnail">
    </div>
    <div class="flex w-full">
      <div class="w-full flex flex-wrap">
        <div class="w-full mt-2 flex-col flex">
          <div class="font-light text-sm text-grey leading-normal">
            {{ product.brand }}
          </div>
          <div class="font-medium cl-accent serif">
            <span class="font-bold">{{ product.name | htmlDecode }}</span>
            <span v-for="opt in product.options" :key="opt.label">
              <div class="flex flex-row">
                <span class="capitalize text-grey font-normal mr-1">{{ opt.label }}:</span>
                <span class="font-medium">{{ opt.value }}</span>
              </div>
            </span>
          </div>
          <div class="flex mt-2 justify-between">
            <add-to-cart
              :product="product"
              :price="product.priceInclTax"
              class="atc--button"
              type="crosssell"
              :added="added"
              @click.native="addItemToCart"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rootStore from '@vue-storefront/core/store'
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts'
import AddToCart from 'theme/components/hulii/AddToCart.vue'

export default {
  mixins: [ProductTile],
  props: {
    labelsActive: {
      type: Boolean,
      requred: false,
      default: true
    },
    onlyImage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      added: false
    }
  },
  components: {
    AddToCart
  },
  computed: {
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
  },
  methods: {
    addItemToCart () {
      this.added = true
      setTimeout(() => {
        this.added = false
      }, 3000)
    },
    onProductPriceUpdate (product) {
      if (product.sku === this.product.sku) {
        Object.assign(this.product, product)
      }
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
        if (rootStore.state.config.products.configurableChildrenStockPrefetchDynamic && rootStore.products.filterUnavailableVariants) {
          const skus = [this.product.sku]
          if (this.product.type_id === 'configurable' && this.product.configurable_children && this.product.configurable_children.length > 0) {
            for (const confChild of this.product.configurable_children) {
              const cachedItem = rootStore.state.stock.cache[confChild.id]
              if (typeof cachedItem === 'undefined' || cachedItem === null) {
                skus.push(confChild.sku)
              }
            }
            if (skus.length > 0) {
              rootStore.dispatch('stock/list', { skus: skus }) // store it in the cache
            }
          }
        }
      }
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-priceupdate', this.onProductPriceUpdate)
  },
  beforeDestroy () {
    this.$bus.$off('product-after-priceupdate', this.onProductPriceUpdate)
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/animations/transitions';

%label {
  @apply text-xs font-medium tracking-sm absolute pin-t pin-l flex justify-center items-center uppercase border border-solid;

  padding: 7px 10px;
  line-height: 8px;
}
.flyout--image {
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 80px;
  }
}
.atc--button {
  @apply mt-4;
  padding: 0 20px;
}
.product-image {
  overflow: hidden;

  .hover-image {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transition: visibility $duration-main $motion-main, opacity $duration-main $motion-main;
  }

  &:hover {
    &.sale::after,
    &.new::after {
      opacity: 0.8;
    }

    .hover-image {
      visibility: visible;
      opacity: 1;
    }

    .default-image {
      opacity: 0;
    }
  }

  img {
    display: block;
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    margin: auto;
    mix-blend-mode: darken;
    transition: opacity $duration-main $motion-main;

    &[lazy="loaded"] {
      animation: products-loaded;
      animation-duration: 0.3s;
    }

    @keyframes products-loaded {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  &.sale {
    &::after {
      @extend %label;
      @apply m-1 text-error border-error-lighter bg-error-lightest;
      content: 'Sale';
    }
  }

  &.new {
    &::after {
      @extend %label;
      @apply m-1 text-primary border-primary-lighter bg-primary-lightest;
      content: 'New';
    }
  }
}

.product-link {
  .product-name {
    transition: color $duration-main $motion-main;
  }

  &:hover {
    .product-name {
      @apply text-primary;
    }
  }
}
</style>
