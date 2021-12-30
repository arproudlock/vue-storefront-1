<template>
  <div class="star-rating-main">
    <div v-for="(star, index) in maxStar" :key="index" class="rating-icon">
      <star-icon :color-code="setColor(index)" />
    </div>
  </div>
</template>

<script>
import StarIcon from '../../assets/star/StarIcon.vue';
export default {
  components: { StarIcon },
  name: 'StarRating',
  props: {
    stars: {
      type: Array,
      required: true
    },
    maxStar: {
      default: 5,
      type: Number
    }
  },
  methods: {
    setColor (index) {
      if (this.stars && this.stars.length - 1 >= index) {
        if (this.stars[index] === 0.5) {
          return '#8d8d8d';
        } else {
          return '#2D2D2D';
        }
      } else {
        return '#cccccc';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.star-rating-main {
  display: flex;
  .rating-icon {
    margin-right: 3px;
  }
}
</style>
