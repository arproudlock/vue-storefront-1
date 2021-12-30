<template>
  <div class="ellipse-rating-main">
    <div
      v-for="(ellipse, index) in maxEllipse"
      :key="index"
      class="rating-icon"
    >
      <ellipse-icon :opacity-val="setOpacity(index)" />
    </div>
  </div>
</template>

<script>
import EllipseIcon from '../../assets/star/EllipseIcon.vue';
export default {
  components: { EllipseIcon },
  name: 'EllipseRating',
  props: {
    ellipses: {
      type: Array,
      required: true
    },
    maxEllipse: {
      default: 5,
      type: Number
    }
  },
  methods: {
    setOpacity (index) {
      if (this.ellipses && this.ellipses.length - 1 >= index) {
        if (this.ellipses[index] === 0.5) {
          return 0.2;
        } else {
          return 1;
        }
      } else {
        return 0.2;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ellipse-rating-main {
  display: flex;
  .rating-icon {
    margin-right: 3px;
  }
}
</style>
