<template>
  <div class="Accordion">
    <h5 class="Accordion__trigger" @click="open=!open">
      {{ title }}
      <svg v-if="!open" fill="#333" class="text-grey-dark" viewBox="0 0 20 20" width="12px" name="caret-down" color="header.text" alt=""><path d="M8.52,13.71L1.11,6.3,2.59,4.82,10,12.23l7.41-7.42,1.48,1.48-7.41,7.42L10,15.19Z" pointer-events="none" /></svg>
      <svg v-if="open" fill="#333" class="text-grey-dark up-arrow" viewBox="0 0 20 20" width="12px" name="caret-down" color="header.text" alt=""><path d="M8.52,13.71L1.11,6.3,2.59,4.82,10,12.23l7.41-7.42,1.48,1.48-7.41,7.42L10,15.19Z" pointer-events="none" /></svg>
    </h5>
    <div class="Accordion__body" :class="{ open }">
      <div class="pt-2 pb-3">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accordion',
  props: {
    title: {
      type: String,
      default: 'title'
    },
    open: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";

.Accordion {
  @apply border-t py-2;

  &:last-child {
    @apply border-b;
  }

  .Accordion__trigger {
    @apply py-3 flex justify-between items-center cursor-pointer my-0;
    font-weight: 800;
    line-height: 12px;
    letter-spacing: .1em;
    text-transform: uppercase;
    font-size: 12px;
  }

  .Accordion__body {
    @apply overflow-hidden max-h-0;
    transition: max-height $duration-main $motion-main;

    &.open {
      @apply max-h-screen;
    }
  }
}
.up-arrow {
  transform: rotate(180deg);
}
</style>
