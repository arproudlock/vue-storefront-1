<template>
  <div class="base--checkbox">
    <div class="relative">
      <input
        class="checkbox--input"
        type="checkbox"
        :id="id"
        :checked="value"
        @keyup.enter="$emit('click')"
        @click="$emit('click')"
        @blur="$emit('blur')"
        @change="$emit('change', $event.target.checked)"
        :disabled="disabled"
      >
      <label
        class="pointer"
        :for="id"
      >
        <slot />
      </label>
    </div>
    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'

export default {
  name: 'BaseCheckbox',
  components: {
    ValidationMessages
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    },
    validations: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-silver: color(silver);
  $color-active: color(secondary);
  $color-white: color(white);

  label {
    @apply ml-10;
    line-height: 30px;
    user-select: none;
    &:before {
      content: '';
      position: absolute;
      top: 3px;
      left: 0;
      width: 22px;
      height: 22px;
      background-color: $color-white;
      border: 1px solid $color-silver;
      cursor: pointer;
    }
  }

  input {
    position: absolute;
    top: 3px;
    left: 0;
    opacity: 0;
    &:checked + label {
      &:before {
        width: 22px;
        min-width: 22px;
        max-width: 22px;
        height: 22px;
        min-height: 22px;
        max-height: 22px;
        border-radius: 2px;
        border-color: #bdbdbd;
        background: transparent;
        cursor: pointer;
      }
      &:after {
        @apply bg-hulii-turquoise;
        content: '';
        position: absolute;
        top: 6px;
        left: 3px;
        width: 18px;
        height: 18px;
      }
    }
    &:hover,
    &:focus {
      + label {
        &:before {
          border-color: $color-active;
        }
      }
    }
    &:disabled + label {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
      &:hover,
      &:focus {
        &:before {
          border-color: $color-silver;
          cursor: not-allowed;
        }
      }
    }
  }
</style>
