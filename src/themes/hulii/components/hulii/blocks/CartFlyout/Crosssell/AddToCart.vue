
<template>
  <button @click.native="addToCart(product, uid); segAddProduct()" :disabled="canBeAdded(product)" data-testid="addToCart" class="w-full border-highlight" :class="{'bg-primary': !canBeAdded(product) || added}">
    <div class="flex items-center justify-center">
      <span>{{ failed ? $t('Error while adding') : added || loading ? '' :$t('Add to Cart') }}</span>
      <svg v-show="failed" viewBox="0 0 17.313 17.311" class="vt-icon ml-1 fill-white">
        <use xlink:href="#error" />
      </svg>
    </div>
  </button>
</template>

<script>
import { formatProductMessages } from '@vue-storefront/core/filters/product-messages'
import focusClean from 'theme/components/theme/directives/focusClean'
import { AddToCart } from '@vue-storefront/core/modules/cart/components/AddToCart'
import { setTimeout } from 'timers'
export default {
  mixins: [AddToCart],
  directives: { focusClean },
  data () {
    return {
      loading: false,
      added: false,
      failed: false
    }
  },
  computed: {
    uid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0
        let v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }
  },
  methods: {
    onAfterRemovedVariant () {
      this.$forceUpdate()
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
    },
    canBeAdded (product) {
      return this.loading || this.failed || formatProductMessages(product.errors) !== ''
    },
    onBeforeAdd (product) {
      this.loading = true
      this.added = false
      this.failed = false
    },
    onAfterAdd ({type}) {
      this.loading = false
      if (type === 'success') {
        this.added = true
        this.failed = false
        this.$store.commit('ui/setMicrocart', true)
      } else {
        this.added = false
        this.failed = true
      }
      setTimeout(() => {
        this.added = false
        this.failed = false
      }, 3000)
    },
    onAfterUpdate (value) {
      this.loading = false
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-removevariant', this.onAfterRemovedVariant)
    this.$bus.$on(`cart-before-add-${this.uid}`, this.onBeforeAdd)
    this.$bus.$on(`cart-after-add-${this.uid}`, this.onAfterAdd)
  },
  beforeDestroy () {
    this.$bus.$off('product-after-removevariant')
    this.$bus.$off(`cart-before-add-${this.uid}`)
    this.$bus.$off(`cart-after-add-${this.uid}`)
  }
}
</script>

<style lang="scss" scoped>
.loader {
  display: inline-block;
  border: 3px solid #fff;
  border-top: 3px solid config('colors.primary');
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

button {

    span {
      transition: opacity 166ms ease-in-out 0s, clip-path 500ms cubic-bezier(1, -0.08, 0.85, 0.75) 0s;
    }

    svg {
      transition: opacity 166ms ease-in-out 0s, clip-path 500ms cubic-bezier(1, -0.08, 0.85, 0.75) 0s;
    }
}
</style>
