<template>
  <component
    :is="link ? 'router-link' : 'button'"
    :type="!link ? type : false"
    :to="localizedRoute(link)"
    class="block border-none rounded-none bg-grey-dark px-4 py-2 ripple tracking-normal text-sm text-white leading-normal font-bold full-button"
    :class="{ 'no-underline cursor-pointer text-center': link, 'disabled': disabled }"
    data-testid="subscribeSubmit"
    :disabled="disabled"
  >
    <slot>
      Button
    </slot>
  </component>
</template>

<script>
import focusClean from 'theme/components/theme/directives/focusClean'
export default {
  name: 'ButtonFull',
  directives: { focusClean },
  props: {
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    link: {
      type: [Object, String],
      required: false,
      default: null
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
  .disabled {
    @apply text-white cursor-default bg-highlight opacity-50;
    box-shadow: rgba(0, 0, 0, .125) 0px 0px 0px 20rem inset;
  }
  .full-button {
    border-width: 2px;
    border-style: solid;
    @apply rounded-normal;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 3px 0;

    &:hover {
      box-shadow: rgba(0, 0, 0, .125) 0px 0px 0px 20rem inset, rgba(0, 0, 0, 0.5) 0px 2px 2px 0;
    }
    &:active {
      box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 1px 0;
    }
  }
</style>
