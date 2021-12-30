<template>
  <div class="relative base-input">
    <div
      class="relative"
      :class="size"
    >
      <input
        :class="{pr30: type === 'password', empty: value === ''}"
        :type="type === 'password' ? passType : type"
        :name="name"
        :id="name"
        :autocomplete="autocomplete"
        :value="value"
        :autofocus="autofocus"
        :ref="name"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur')"
        @keyup.enter="$emit('keyup.enter', $event.target.value)"
        @keyup="$emit('keyup', $event)"
      >
      <label class="input--label" :style="'background:' + labelBackground">{{ placeholder }}</label>
    </div>
    <button
      v-if="iconActive"
      type="button"
      class="
        icon material-icons absolute brdr-none no-outline
        p0 bg-cl-transparent cl-brdr-secondary pointer
      "
      @click="togglePassType()"
      :aria-label="$t('Toggle password visibility')"
      :title="$t('Toggle password visibility')"
    >
      {{ icon }}
    </button>
    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'

export default {
  name: 'BaseInput',
  components: {
    ValidationMessages
  },
  data () {
    return {
      passType: 'password',
      iconActive: false,
      icon: 'visibility_off'
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    name: {
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
    focus: {
      type: Boolean,
      required: false,
      default: false
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false
    },
    validations: {
      type: Array,
      default: () => []
    },
    labelBackground: {
      type: String,
      default: '#fff'
    },
    borderColor: {
      type: String,
      default: '#000'
    },
    size: {
      type: String,
      default: 'regular'
    }
  },
  methods: {
    togglePassType () {
      if (this.passType === 'password') {
        this.passType = 'text'
        this.icon = 'visibility'
      } else {
        this.passType = 'password'
        this.icon = 'visibility_off'
      }
    },
    // setFocus sets focus on a field which has a value of 'ref' tag equal to fieldName
    setFocus (fieldName) {
      if (this.name === fieldName) {
        this.$refs[this.name].focus()
      }
    }
  },
  created () {
    if (this.type === 'password') {
      this.iconActive = true
    }
  },
  mounted () {
    if (this.focus) {
      this.$refs[this.name].focus()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-tertiary: color(tertiary);
  $color-black: color(black);
  $color-puerto-rico: color(puerto-rico);
  $color-hover: color(tertiary, $colors-background);

  input {
    background: inherit;
    height: 53px;
    border: 1px solid #bdbdbd;
    box-sizing: border-box;
    color: #000;
    font-size: 14px;
    letter-spacing: 0;
    padding: 0 20px;
    text-transform: none;
    transition: border-color 0.4s cubic-bezier(0.39, 0.575, 0.565, 1);
    width: 100%;
    border-radius: 5px;

    &:hover,
    &:focus {
      outline: none;
      border-color: #000000;
    }

    &:disabled,
    &:disabled + label {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
  .small {
    input {
      height: 45px;
    }
    .input--label {
      top: 12px;
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
  input:focus ~ label, input:not(.empty) ~ label{
    background: #fff;
    color: #000000;
    font-size: 12px;
    font-weight: 600;
    position: absolute;
    transform: translate3d(0, -25px, 0);
  }

  .icon {
    right: 6px;
    top: 10px;
    &:hover,
    &:focus {
      color: $color-hover;
    }
  }
</style>
