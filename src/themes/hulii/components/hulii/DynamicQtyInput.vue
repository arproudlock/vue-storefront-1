<template>
  <div class="dynamic--qty" :class="'qty-input__' + size">
    <label class="pb-2 hidden" for="quantity">{{ $t('Quantity') }}</label>
    <div class="dynamic--buttons">
      <button @click.prevent="decrementEvent" class="dynamic--minus" :disabled="product.qty === 1" :class="{ 'disabled-button' : product.qty === 1 }">
        <font-awesome-icon class="" icon="minus" />
      </button>
      <div class="flex h-full justify-end label-floating relative">
        <input
          type="text"
          min="0"
          max="2"
          :id="id"
          :name="name"
          readonly
          focus
          class="text-sm px-3 input-field bg-transparent outline-none focus:text-grey-dark rounded-normal text-grey-dark"
          :value="value"
          @input="inputEvent"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
          @keyup.enter="keyupEnter"
          @keyup.up="incrementEvent"
          @keyup.down="decrementEvent"
          @change="updateQuantity"
          @keyup="keyup"
        >
      </div>
      <button @click.prevent="incrementEvent" class="dynamic--plus">
        <font-awesome-icon class="" icon="plus" />
      </button>
    </div>
  </div>
</template>

<script>
import { MicrocartProduct } from '@vue-storefront/core/modules/cart/components/Product.ts'

export default {
  name: 'QtyInput',
  data () {
    return {
      isEditing: true
    }
  },
  props: {
    id: {
      type: String,
      default: 'quantity',
      required: false
    },
    max: {
      type: Number,
      required: true
    },
    autocomplete: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      default: 'quantity',
      required: false
    },
    selected: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Array,
      required: false,
      default: () => []
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Quantity'
    },
    value: {
      type: [String, Number],
      default: '1',
      required: false
    },
    size: {
      type: String,
      default: 'md',
      required: false
    },
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClickButton (event) {
      this.$emit('qtyChanging')
    },
    keyup ($event) {
      this.$emit('keyup', $event)
    },
    keyupEnter ($event) {
      let value = parseInt($event.target.value)
      if (isNaN(value)) {
        value = 0
      }
      this.$emit('keyup.enter', value)
    },
    inputEvent ($event) {
      let value = parseInt($event.target.value)
      if (isNaN(value)) {
        value = 0
      }
      this.$emit('input', value)
    },
    incrementEvent ($event) {
      this.$emit('qtyChanging')
      let value = parseInt(this.value)
      if (isNaN(value)) {
        value = 0
      }
      const newValue = value + 1
      this.$emit('input', value + 1)
      this.updateQuantity(newValue)
    },
    decrementEvent ($event) {
      this.$emit('qtyChanging')
      let value = parseInt(this.value)
      if (isNaN(value)) {
        value = 0
      }
      const newValue = value > 1 ? value - 1 : 1
      this.$emit('input', value > 1 ? value - 1 : 1)
      this.updateQuantity(newValue)
    },
    updateQuantity (value) {
      // additional logic will be moved to theme
      this.qty = parseInt(value)
      if (this.qty <= 0) {
        this.qty = this.product.qty
      }
      MicrocartProduct.methods.updateQuantity.call(this, this.qty)
      this.isEditing = !this.isEditing
      const editing = 'true'
      return editing
    }
  }
}
</script>

<style lang="scss" scoped>
%qty-input {
  @apply border border-grey text-center py-3 px-2 text-sm text-grey-dark outline-none bg-white h-full;

  &:focus {
    @apply text-grey-dark;
  }
}

.dynamic--qty {
  @apply flex;

  .dynamic--buttons {
    @apply flex justify-end items-center;

    .dynamic--minus {
      @apply flex justify-center items-center border-none bg-hulii-turquoise tracking-normal text-white leading-normal no-underline cursor-pointer text-center rounded-full;
      width: 30px;
      height: 30px;
    }
    .dynamic--plus {
      @apply flex justify-center items-center border-none bg-hulii-turquoise tracking-normal text-white leading-normal no-underline cursor-pointer text-center rounded-full;
      width: 30px;
      height: 30px;
    }
  }
}

.small-label {
  font-size: .6rem;
  color: #bdbdbd;
}

.qty-input {
  input {
    max-width: 40px;
  }
  label {
    max-width: 40px;
  }
}
.input-field {
  width: 15px;
  border: none;
  @apply font-semibold text-center;
}
.disabled-button {
  @apply bg-grey-light;
}
.qty-selection {
  width: 30px;
  height: 30px;
}

.input-number-controls {
  display: inline-block;

  button {
    @apply block border border-grey border-l-0 bg-white;

    width: 30px;
    height: 50%;

    &:last-of-type {
      border-top: none;
    }

    .vt-icon {
      width: 8px;
      height: 8px;
    }
  }
}
</style>
