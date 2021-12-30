<template>
  <div @click="switchFilter(id, label)" class="selector">
    <button
      class="selector--color"
      :class="{ 'active' : active }"
      :aria-label="$t('Select color ') + label"
    >
      <div
        class="absolute block square"
        :class="bgColor(active)"
      />
    </button>
    <span>{{ label }}</span>
  </div>
</template>

<script>
import GenericSelector from '@vue-storefront/core/compatibility/components/GenericSelector'
import rootStore from '@vue-storefront/core/store'
import { mapState } from 'vuex'

export default {
  mixins: [GenericSelector],
  props: {
    list: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState({
      highlightColor: state => state.ui.highlightColor
    })
  },
  methods: {
    colorFrom (label) {
      if (rootStore.state.config.products.colorMappings) {
        if (typeof rootStore.state.config.products.colorMappings[label] !== 'undefined') {
          label = rootStore.state.config.products.colorMappings[label]
        }
      }
      if (label.indexOf('/') >= 0) label = label.replace('/', ',') // to be honest - this is a hack for colors like "ink/white"
      if (label && label.toString().indexOf(',') >= 0) {
        return 'background: linear-gradient(' + label + ')'
      } else {
        return 'background-color: ' + label
      }
    },
    bgColor (active) {
      return active ? 'bg-' + this.highlightColor : ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-event: color(tertiary);
  $color-active: color(accent);

  .selector {
    @apply flex;
    @apply items-center;
    @apply cursor-pointer;
    margin-bottom: 8px;

    .selector--color {
      @apply relative;
      @apply border-grey;
      @apply border;
      @apply mr-3;
      @apply cursor-pointer;
      @apply bg-white;
      width: 24px;
      height: 24px;
      border-radius: 2px;

      &:hover {
        .square {
          // @apply bg-grey-light;
          background-color: #372768;
        }
      }
    }

    .color-select:hover {
      @extend .selector--color:hover;
    }

    .square {
      width: 80%;
      height: 80%;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }

  }
</style>
