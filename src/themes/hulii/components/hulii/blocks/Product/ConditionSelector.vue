<template>
  <active-selector-button
    v-if="active"
    :class="['w-1/5']"
    :text="label"
    :highlight-color="highlight"
    @click.native="customSwitchFilter(id, label, disabled)"
    :aria-label="$t('Select ' + label)"
  />
  <selector-button
    v-else
    :class="[{active: !disabled}, 'w-1/5']"
    :text="label"
    :highlight-color="highlight"
    @click.native="switchFilter(id, label)"
    :aria-label="$t('Select ' + label)"
  />
</template>
<script>
import GenericSelector from '@vue-storefront/core/compatibility/components/GenericSelector'
import SelectorButton from 'theme/components/hulii/blocks/Buttons/SelectorButton'
import ActiveSelectorButton from 'theme/components/hulii/blocks/Buttons/ActiveSelectorButton'
export default {
  props: {
    highlight: {
      type: null,
      required: null,
      default: null
    },
    noOfOptions: {
      type: Number,
      required: null,
      default: null
    },
    disabled: {
      type: null,
      required: null,
      default: null
    },
    active: {
      type: null,
      required: null,
      default: null
    }
  },
  mixins: [GenericSelector],
  components: {
    SelectorButton,
    ActiveSelectorButton
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-active: color(secondary);
  $color-disabled: color(secondary, $colors-border);

  .generic-selector {
    height: 40px;
    padding-left: 8px;
    padding-right: 8px;
    min-width: 50px;

    &:hover,
    &:focus {
      border-width: 2px;
    }

    &.active {
      border-color: $color-active;
      border-width: 2px;
      color: $color-active;
    }
  }
  :disabled {
      border-color: $color-disabled;
      color: $color-disabled;
      cursor: not-allowed;

      &:hover,
      &:after {
        border-width: 1px;
      }
  }

  .disabled {
      border-color: $color-disabled;
      color: $color-disabled;
      cursor: not-allowed;

      &:hover,
      &:after {
        border-width: 1px;
      }
  }
</style>
