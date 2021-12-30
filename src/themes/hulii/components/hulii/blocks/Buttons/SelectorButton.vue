<template>
  <div
    class="btn"
    :class="'border-' + highlightColor"
  >
    <span
      :class="'text-' + highlightColor"
    >
      {{ $t(text) }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'FullButton',
  props: {
    highlightColor: {
      type: String,
      default: 'hulii-purple'
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .btn {
    @apply border-solid border cursor-pointer text-center;
    font-family: 'HuliiSans',sans-serif;
    font-weight: 600;
    font-size: 13px;
    line-height: 1;
    text-transform: uppercase;
    border-radius: 5px;
    border-width: 2px;
    padding-top: 13px;
    padding-bottom: 13px;
    box-shadow: inset 0 -3px 0 rgba(0,0,0,0.15);
    transition: transform .1s ease-out;
    user-select: none;
    min-width: 80px;

    &:not(.active) {
      @apply border-grey;

      span {
        @apply text-grey;
      }

      &:active {
        transform: scale(0.99);
        transition: transform .1s ease-out;
      }
    }

    a {
      @apply flex justify-center items-center;
      padding: 13px 23px;
    }
  }
</style>
