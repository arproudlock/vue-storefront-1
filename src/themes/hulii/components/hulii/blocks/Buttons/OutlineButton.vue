<template>
  <div
    class="btn"
    :class="'border-' + color"
  >
    <router-link
      v-if="link !== ''"
      :to="localizedRoute(link)"
      :class="'text-' + color"
    >
      {{ $t(text) }}
    </router-link>
    <span
      v-else
      :class="'text-' + color"
    >
      {{ $t(text) }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'OutlineButton',
  props: {
    color: {
      type: String,
      default: 'hulii-purple'
    },
    text: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .btn {
    @apply flex justify-center items-center cursor-pointer;
    font-family: 'HuliiSans',sans-serif;
    font-weight: 600;
    font-size: 13px;
    line-height: 1;
    text-transform: uppercase;
    border-radius: 5px;
    padding: 0;
    margin-bottom: 10px;
    box-shadow: inset 0 -3px 0 rgba(0,0,0,0.15);
    transition: transform .1s ease-out;
    border-width: 2px;
    border-style: solid;

    &:hover {
      box-shadow: inset 0 -100px 0 rgba(0,0,0,0.15);
    }

    &:active {
      box-shadow: inset 0 -100px 0 rgba(0,0,0,0.2);
      transform: scale(0.99);
      transition: transform .1s ease-out;
    }

    a {
      @apply flex justify-center items-center;
      padding: 13px 23px;
    }
  }
</style>
