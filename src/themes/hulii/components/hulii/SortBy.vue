<template>
  <div class="sort-by">
    <select
      name="sortby"
      v-model="sortby"
      @change="changeOrder"
    >
      <option selected="selected" disabled value="" v-if="!hasLabel">
        {{ $t('Sort By') }}
      </option>
      <option v-for="(option, label) in sortByAttribute" :disabled="sortby === option" :value="option" :key="option">
        {{ $t(label) }}
      </option>
    </select>
  </div>
</template>

<script>
import SortBy from '@vue-storefront/core/compatibility/components/SortBy'
export default {
  mixins: [SortBy],
  props: {
    hasLabel: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      sortby: this.$store.state.config.products.defaultSortBy.attribute
    }
  }
}
</script>
<style lang="scss" scoped>
    @import '~theme/css/base/text';
    @import '~theme/css/variables/colors';
    @import '~theme/css/helpers/functions/color';
    .sort-by {
        @apply border-grey-light;
        @apply border;
        @apply border-solid;
        display: inline-flex;
        position: relative;
        border-radius: 5px;
        select {
          @extend .h4;
          padding-left: 10px;
          -moz-appearance:none !important;
          -webkit-appearance: none;  /* Remove style Chrome */
          appearance: none; /* Remove style FireFox*/
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          background-color: transparent;
          margin-right: 0;
          border: none;
          width: 200px;
          &:focus {
              outline: none;
          }
          option {
            text-transform: none;
          }
        }
        &__icon {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        }
    }
</style>
