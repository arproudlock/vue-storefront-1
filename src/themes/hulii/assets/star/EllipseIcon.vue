<template>
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4" cy="4" r="4" fill="#1DB19D" :opacity="opacityVal" />
  </svg>
</template>

<script>
export default {
  name: 'EllipseIcon',
  props: {
    opacityVal: {
      default: 0.2
    }
  }
};
</script>

<style>
</style>
