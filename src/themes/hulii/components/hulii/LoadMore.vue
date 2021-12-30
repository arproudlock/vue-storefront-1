<template>
  <div class="btn">
    <span class="text-white">
      {{ $t("LOAD MORE  REVIEWS") }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'LoadMore'
};
</script>

<style lang="scss" scoped>
.btn {
  @apply bg-hulii-turquoise text-center cursor-pointer flex items-center justify-center;
  font-family: "HuliiSans", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1;
  text-transform: uppercase;
  border-radius: 5px;
  padding: 0;
  margin-bottom: 10px;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15);
  transition: transform 0.1s ease-out;
  min-height: 48px;

  &:hover {
    box-shadow: inset 0 -100px 0 rgba(0, 0, 0, 0.15);
    transform: scale(1.03);
  }

  &:active {
    box-shadow: inset 0 -100px 0 rgba(0, 0, 0, 0.2);
    transform: scale(0.99);
    transition: transform 0.1s ease-out;
  }

  a {
    @apply flex justify-center items-center;
    padding: 13px 23px;
  }

  .cart--price {
    @apply ml-2 text-white;
  }
}
</style>
