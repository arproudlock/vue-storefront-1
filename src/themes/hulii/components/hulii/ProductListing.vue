<template>
  <div
    class="product--listing"
  >
    <div
      v-for="product in products"
      :key="product.id + Math.random() * 10000"
      class="flex"
    >
      <product-tile :product="product" v-if="product.type_id == 'simple'" />
    </div>
  </div>
</template>

<script>
import ProductTile from 'theme/components/hulii/ProductTile'
let lastHero = 0
export default {
  name: 'ProductListing',
  components: {
    ProductTile
  },
  props: {
    products: {
      type: null,
      required: true
    },
    columns: {
      type: [Number, String],
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.product--listing {
  display: grid;
  margin-bottom: 32px;
  gap: 16px 16px;
  grid-template-columns: repeat(2, 1fr);

  @screen lg {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
