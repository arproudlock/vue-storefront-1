<template>
  <add-to-cart-button @click.native="addToCart(product); openCartFlyout(); segAddProduct()" :disabled="isProductDisabled" data-testid="addToCart" :price="price" :added="added">
    {{ $t('Add to cart') }}
  </add-to-cart-button>
</template>

<script>
import { formatProductMessages } from '@vue-storefront/core/filters/product-messages'
import focusClean from 'theme/components/theme/directives/focusClean'
import AddToCartButton from 'theme/components/hulii/blocks/Buttons/AddToCartButton.vue'
import { AddToCart } from '@vue-storefront/core/modules/cart/components/AddToCart'

export default {
  props: {
    price: {
      type: Number,
      default: ''
    },
    type: {
      type: String,
      default: 'regular'
    },
    added: {
      type: Boolean,
      default: false
    }
  },
  mixins: [AddToCart],
  directives: { focusClean },
  components: { AddToCartButton },
  methods: {
    onAfterRemoedVariant () {
      this.$forceUpdate()
    },
    notifyUser (notificationData) {
      this.$store.dispatch('notification/spawnNotification', notificationData, { root: true })
    },
    openCartFlyout () {
      if (this.type === 'regular') {
        setTimeout(() => { this.$store.dispatch('ui/toggleMicrocart') }, 500)
      }
    },
    onBeforeAdd (product) {
      this.loading = true;
      if (this.type === 'regular') {
        this.$store.commit('ui/setFlyoutCart', this.product)
      }
    },
    segAddProduct () {
      window.analytics.track('Product Added', {
        cart_id: this.$store.state.cart.cartServerToken ? this.$store.state.cart.cartServerToken : '',
        product_id: this.product.sku,
        sku: this.product.sku,
        name: this.product.name,
        brand: this.product.brand,
        variant: this.product.options ? this.product.options[0].label + ' - ' + this.product.options[0].value : '',
        price: this.product.priceInclTax,
        quantity: this.product.qty,
        url: this.$route.path,
        image_url: this.product.image
      })
      let categories = this.product.url_path.split('/');
      let slug = categories.pop();
      let ga4Item = {
        item_id: this.product.sku,
        item_name: this.product.name,
        currency: 'AUD',
        item_brand: this.product.brand,
        item_category: categories[0] ? categories[0] : null,
        item_category1: categories[1] ? categories[1] : null,
        item_category2: categories[2] ? categories[2] : null,
        item_category3: categories[3] ? categories[3] : null,
        item_category4: categories[4] ? categories[4] : null,
        item_category5: categories[5] ? categories[5] : null,
        item_category6: categories[6] ? categories[6] : null,
        price: this.product.priceInclTax,
        shipping_type: this.product.shipping_type,
        quantity: this.product.qty,
        seller: this.product.seller
      };
      console.log(ga4Item);
      window.gtag('event', 'add_to_cart', {
        currency: 'AUD',
        value: this.product.priceInclTax,
        items: ga4Item
      });
    }
  },
  computed: {
    isProductDisabled () {
      return this.disabled || formatProductMessages(this.product.errors) !== '' || this.isAddingToCart
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-removevariant', this.onAfterRemovedVariant)
    this.$bus.$on(`cart-before-add`, this.onBeforeAdd)
  },
  beforeDestroy () {
    this.$bus.$off('product-after-removevariant')
    this.$bus.$off(`cart-before-add`)
  }
}
</script>
