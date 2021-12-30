<template>
  <div class="select-wrapper relative">
    <select
      :name="name"
      :id="name"
      :class="{
        'cl-tertiary' : options.length === 0,
        'empty': !selected
      }"
      :autocomplete="autocomplete"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @change="$emit('change', $event.target.value)"
      @input="$emit('input', $event.target.value)"
    >
      <option disabled selected value v-if="!selected" />
      <option
        v-for="(option, key) in options"
        :key="key"
        :value="option.value"
        v-bind="{selected: option.value === selected}"
      >
        {{ option.label }}
      </option>
    </select>
    <label>{{ placeholder }}</label>

    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'

export default {
  name: 'BaseSelect',
  components: {
    ValidationMessages
  },
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    selected: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    autocomplete: {
      type: String,
      required: false,
      default: ''
    },
    validations: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  @import '~theme/css/base/text';
  $color-tertiary: color(tertiary);
  $color-black: color(black);
  $color-puerto-rico: color(puerto-rico);
  $color-hover: color(tertiary, $colors-background);

.select-wrapper {
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 1.5rem;
    right: 10px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 6px 0 6px;
    border-color: $color-tertiary transparent transparent transparent;
    pointer-events: none;
  }

  select {
    @extend .h4;
    font-size: 14px;
    height: 100%;
    width: 100%;
    background: rgb(255, 255, 255);
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #bdbdbd;
    border-image: initial;
    padding: 0px 20px;
    -moz-appearance: none;
    -webkit-appearance: none;

    &:hover,
    &:focus {
      outline: none;
      border-color: #000;
    }

    &:disabled,
    &:disabled + label {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
  label {
    line-height: 20px;
    font-size: 14px;
    color: #727373;
    position: absolute;
    left: 15px;
    top: 16px;
    text-align: left;
    box-sizing: border-box;
    padding: 0 6px;
    transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
    white-space: nowrap;
    pointer-events:none;
    user-select: none;
  }
  select:focus ~ label, select:not(.empty) ~ label {
    background: #fff;
    color: #000000;
    font-size: 12px;
    font-weight: 600;
    position: absolute;
    transform: translate3d(0, -25px, 0);
  }
}
</style>
