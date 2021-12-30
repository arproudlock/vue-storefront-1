<template>
  <div>
    <router-link
      v-if="link !== ''"
      :to="localizedRoute(link)"
      class="btn"
      :class="'text-' + textColor + ' bg-' + bgColor + ' ' + size"
    >
      {{ $t(text) }}
    </router-link>
    <span
      v-else
      class="btn"
      :class="'text-' + textColor + ' bg-' + bgColor + ' ' + size"
    >
      {{ $t(text) }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'FullButton',
  props: {
    bgColor: {
      type: String,
      default: 'hulii-purple'
    },
    textColor: {
      type: String,
      default: 'white'
    },
    text: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'regular'
    }
  }
}
</script>
<style lang="scss" scoped>
  .btn {
    @apply w-full;
    font-family: 'HuliiSans',sans-serif;
    font-weight: 600;
    font-size: 13px;
    line-height: 1;
    border-radius: 5px;
    padding: 0;
    box-shadow: inset 0 -3px 0 rgba(0,0,0,0.15);
    transition: transform .1s ease-out;

    &.large {
      @apply flex justify-center items-center cursor-pointer;
      font-weight: 600;
      font-size: 1rem;
      min-height: 48px;
    }

    &.regular {
      @apply flex justify-center items-center cursor-pointer;
      min-height: 39px;
      letter-spacing: .1rem;
      text-transform: uppercase;
    }

    &:hover {
      box-shadow: inset 0 -100px 0 rgba(0,0,0,0.15);
    }

    &:active {
      box-shadow: inset 0 -100px 0 rgba(0,0,0,0.2);
      transform: scale(0.98);
      transition: transform .1s ease-out;
    }
  }
</style>
