<template>
  <div
    class="product align-left w-100 pb20"
    v-observe-visibility="visibilityChanged"
  >
  <!-- v-if="product.type_id == 'simple'" -->
    <router-link
      class="block no-underline product-link"
      :to="productLink"
      data-testid="productLink"
    >
      <div
        class="product-image relative"
        :class="[
          { sale: labelsActive && isOnSale },
          { new: labelsActive && isNew },
        ]"
      >
        <!-- bg-grey-lighter -->
        <product-image
          class="product-image__content"
          :image="thumbnailObj"
          :alt="product.name | htmlDecode"
          data-testid="productImage"
        />
      </div>

      <p class="product--title" v-if="!onlyImage">
        {{ product.name | htmlDecode }}
      </p>

      <span class="product--seller" v-if="!onlyImage">
        {{ product.seller_name | htmlDecode }}
      </span>
      <span class="star-rating"> <star-rating :stars="getRating(product.product_reviews.av_stars)" v-if="product.product_reviews.count" />
        <!-- <span>({{ product.product_reviews.count > 1 ? product.product_reviews.count + ' reviews' : product.product_reviews.count ? product.product_reviews.count + ' review' : 'No reviews yet' }})</span> -->
      </span>
      <!-- <trustpilot-product-mini :prodid="product.id" :skus="product.tp_skus" tpstyle="position:relative; max-width:155px;" /> -->
      <span
        class="product--price-special"
        :class="'text-' + highlightColor"
        v-if="
          product.special_price &&
            parseFloat(product.special_price) > 0 &&
            !onlyImage
        "
      >
        {{ specialPrice | price }}
      </span>

      <span
        class="product--price-special"
        :class="'text-' + highlightColor"
        v-if="
          !product.special_price &&
            parseFloat(product.priceInclTax) > 0 &&
            !onlyImage
        "
      >
        {{ product.priceInclTax | price }}
      </span>

      <span
        class="product--price-original"
        v-if="
          product.special_price &&
            parseFloat(product.originalPriceInclTax) > 0 &&
            !onlyImage
        "
      >
        {{ product.originalPriceInclTax | price }}
      </span>
      <span v-if="product.badge">
        <product-info :badge="product.badge" />
      </span>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import rootStore from '@vue-storefront/core/store';
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts';
import config from 'config';
import ProductImage from './ProductImage';
import StarRating from './StarRating';
import Product from 'theme/components/core/blocks/Checkout/Product.vue';
import ProductInfo from './ProductInfo'
import mVMixin from 'theme/mixins/miscellaneous';
import TrustpilotProductMini from 'theme/components/hulii/blocks/Trustpilot/TrustpilotProductMini';
export default {
  mixins: [ProductTile, mVMixin],
  components: {
    ProductImage,
    StarRating,
    ProductInfo,
    TrustpilotProductMini
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
      highlightColor: (state) => state.ui.highlightColor
    }),
    specialPrice () {
      let specialPrice = 0;
      if (this.product.special_price > 0) {
        if (this.product.configurable_children.length > 0) {
          const configurableChildren = this.product.configurable_children.sort(
            (a, b) => {
              return a.special_price - b.special_price;
            }
          );
          specialPrice = configurableChildren[0].special_price;
        }
      }
      return specialPrice;
    },
    thumbnailObj () {
      return {
        src: this.thumbnail,
        loading: this.thumbnail
      };
    }
  },
  methods: {
    onProductPriceUpdate (product) {
      if (product.sku === this.product.sku) {
        Object.assign(this.product, product);
      }
    },
    visibilityChanged (isVisible, entry) {
      if (isVisible) {
        if (
          config.products.configurableChildrenStockPrefetchDynamic &&
          rootStore.products.filterUnavailableVariants
        ) {
          const skus = [this.product.sku];
          if (
            this.product.type_id === 'configurable' &&
            this.product.configurable_children &&
            this.product.configurable_children.length > 0
          ) {
            for (const confChild of this.product.configurable_children) {
              const cachedItem = rootStore.state.stock.cache[confChild.id];
              if (typeof cachedItem === 'undefined' || cachedItem === null) {
                skus.push(confChild.sku);
              }
            }
            if (skus.length > 0) {
              rootStore.dispatch('stock/list', { skus: skus }); // store it in the cache
            }
          }
        }
      }
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-priceupdate', this.onProductPriceUpdate);
    if (this.product.configurable_children) {
      if (this.product.configurable_children.length > 0) {
        const configurableChildren = this.product.configurable_children.sort(
          (a, b) => {
            return a.special_price - b.special_price;
          }
        );
        this.product.sku = configurableChildren[0].sku;
      }
    }
  },
  beforeDestroy () {
    this.$bus.$off('product-after-priceupdate', this.onProductPriceUpdate);
  }
};
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";
@import "~theme/css/variables/colors";
@import "~theme/css/helpers/functions/color";

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
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    /* or 157% */

    display: flex;
    align-items: center;

    /* Grey */

    color: #6c6b6b;
  }

  .product--price-special {
    font-weight: 600;
  }

  .product--price-original {
    @apply text-grey;
      @apply line-through;
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

.product-image {
  @apply flex;
      @apply items-center;
      @apply justify-center;
  overflow: hidden;
  border-radius: 15px;
  width: 100%;
  height: 100%;
  max-height: 300px;
  background: #FAFAFB;

  &:hover {
    .product-image__content {
      opacity: 1;
      transform: scale(1.1);
    }
    &.sale::after,
    &.new::after {
      opacity: 0.8;
    }
  }
  &__content {
    padding-bottom: calc(257% / (257 / 100));
    mix-blend-mode: darken;
    transform: scale(1);
    will-change: transform;
    border-radius: 15px;
    transition: 0.3s opacity $motion-main, 0.3s transform $motion-main;
    @media (min-width: 768px) {
      padding-bottom: calc(168% / (168 / 100));
    }
    @media (min-width: 1200px) {
      padding-bottom: calc(276% / (276 / 100));
    }
  }

  &.sale {
    &::after {
      @extend %label;
      content: "Sale";
    }
  }
  &.new {
    &::after {
      @extend %label;
      content: "New";
    }
  }
}
.star-rating {
  display: flex;
  span {
    color: #6c6b6b;
  }
}
</style>
