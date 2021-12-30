<template>
  <div
    class="product align-left w-100 pb20"
    v-observe-visibility="visibilityChanged"
  >
    <router-link
      class="block no-underline product-link"
      :to="productLink"
      data-testid="productLink"
    >
      <div
        class="product-image relative"
        :class="[{ sale: labelsActive && isOnSale }, { new: labelsActive && isNew }]"
      >
        <!-- bg-grey-lighter -->
        <category-image
          class="product-image__content"
          :image="thumbnailObj"
          :alt="product.name | htmlDecode"
          data-testid="productImage"
        />
      </div>

      <p class="product--title" v-if="!onlyImage">
        {{ product.name | htmlDecode }}
      </p>

      <span
        class="product--price-special"
        :class="'text-' + highlightColor"
        v-if="product.from_price && parseFloat(product.from_price) > 0 && !onlyImage"
      >
        From {{ product.from_price | price }}
      </span>

      <!-- <span
        class="product--price-special"
        :class="'text-' + highlightColor"
        v-if="!product.from_price && parseFloat(product.priceInclTax) > 0 && !onlyImage"
      >
        {{ product.from_price | price }}
      </span>

      <span
        class="product--price-original"
        v-if="product.special_price && parseFloat(product.originalPriceInclTax) > 0 && !onlyImage"
      >
        {{ product.originalPriceInclTax | price }}
      </span> -->
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import rootStore from '@vue-storefront/core/store'
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts'
import config from 'config'
import CategoryImage from './CategoryImage'

export default {
  mixins: [ProductTile],
  components: {
    CategoryImage
  },
  props: {
    labelsActive: {
      type: Boolean,
      default: true
    },
    onlyImage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      highlightColor: state => state.ui.highlightColor
    }),
    specialPrice () {
      let specialPrice = 0
      if (this.product.special_price > 0) {
        if (this.product.configurable_children.length > 0) {
          const configurableChildren = this.product.configurable_children.sort((a, b) => { return a.special_price - b.special_price })
          specialPrice = configurableChildren[0].special_price
        }
      }
      return specialPrice
    },
    thumbnailObj () {
      return {
        src: this.product.src,
        loading: this.product.src
      }
    }
  },
  methods: {
    onProductPriceUpdate (product) {
      if (product.sku === this.product.sku) {
        Object.assign(this.product, product)
      }
    },
    visibilityChanged (isVisible, entry) {
      if (isVisible) {
        if (config.products.configurableChildrenStockPrefetchDynamic && rootStore.products.filterUnavailableVariants) {
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
    if (this.product.configurable_children) {
      if (this.product.configurable_children.length > 0) {
        const configurableChildren = this.product.configurable_children.sort((a, b) => { return a.special_price - b.special_price })
        this.product.sku = configurableChildren[0].sku
      }
    }
  },
  beforeDestroy () {
    this.$bus.$off('product-after-priceupdate', this.onProductPriceUpdate)
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/animations/transitions';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';

$bg-secondary: color(secondary, $colors-background);
$border-secondary: color(secondary, $colors-border);
$color-white: color(white);

.product {
  @media (max-width: 767px) {
    padding-bottom: 10px;
  }

  .product--title {
    @apply mb-2;
    font-weight: 600;
    color: #000;
  }

  .product--seller {
    font-family: Gilroy-Regular;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    /* or 157% */

    display: flex;
    align-items: center;

    /* Grey */

    color: #6C6B6B;
  }

  .product--price-special {
    font-weight: 600;
  }

  .product--price-original {
    @apply text-grey line-through;
    font-weight: 600;
  }
}

.price-original {
  text-decoration: line-through;
}

%label {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: $border-secondary;
  text-transform: uppercase;
  color: $color-white;
  font-size: 12px;
}

.product-image{
  @apply flex items-center justify-center;
  overflow: hidden;
  border-radius: 15px;
  width:100%;
  height: 100%;
  max-height: 300px;

  &:hover{
    .product-image__content{
      opacity: 1;
      transform: scale(1.1);
    }
    &.sale::after,
    &.new::after{
      opacity: .8;
    }
  }
  &__content{

    padding-bottom: calc(257% / (257 / 100));
    mix-blend-mode: darken;
    transform: scale(1);
    will-change: transform;
    border-radius: 15px;
    transition: .3s opacity $motion-main, .3s transform $motion-main;
    @media (min-width: 768px) {
      padding-bottom: calc(168% / (168 / 100));
    }
    @media (min-width: 1200px) {
      padding-bottom: calc(276% / (276 / 100));
    }
  }

  &.sale{
    &::after {
      @extend %label;
      content: 'Sale';
    }
  }
  &.new{
    &::after {
      @extend %label;
      content: 'New';
    }
  }
}
</style>
