<template>
  <div class="product--highlight" v-if="showBadge">
    <img :src="product.img" alt="product-name" class="info-icon">
    <p class="meta-data">
      {{ product.info }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ProductInfo',
  props: {
    badge: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      product: {
        img: '',
        info: ''
      },
      showBadge: true
    };
  },
  mounted () {
    switch (this.badge) {
      case 'free-express':
        this.product.img = '/assets/star/shipping.svg';
        this.product.info = 'Express Shipping';
        break;

      case 'top-rated-seller':
        this.product.img = '/assets/star/Vector.svg';
        this.product.info = 'Top Rated';
        break;

      case 'popular-product':
        this.product.img = '/assets/star/Vector.svg';
        this.product.info = 'Popular';
        break;

      case 'limited-stock':
        this.product.img = '/assets/star/Vector.svg';
        this.product.info = 'Limited Stock';
        break;

      case 'none':
        this.showBadge = false;
        break;
    }
  }
};
</script>

<style lang="scss" scoped>
.product--highlight {
  display: flex;
  line-height: 0px;
  .meta-data {
    color: #1db19d;
    font-size: 14px;
    padding-left: 4px;
    font-weight: 400;
  }
}
</style>
