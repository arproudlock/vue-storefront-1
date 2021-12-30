<template>
  <div>
    <div class="container">
      <div class="flex">
        <header class="slider-header">
          <h2 class="slider--title mt-0">
            {{ title }}
          </h2>
        </header>
      </div>
    </div>
    <div class="categories--grid">
      <a class="categories--aisle bg-hulii-purple" href="/category/food">
        <div class="aisle--details">
          <div class="name">Apple iPhone 8 White 64GB</div>
          <div class="old-price">$499.00</div>
          <div class="new-price text-hulii-hot-pink">$349.00</div>
        </div>
        <img class="thumbnail" src="//images.ctfassets.net/ooy6iyaino7r/3JqeMk9JE4WVO2r5PjwhDD/dadd0a966671a6cda219259dd45bc453/L1_Food.png" alt="">
      </a>
      <a class="categories--aisle bg-hulii-hot-pink" href="/category/food">
        <div class="aisle--details">
          <div class="name">Apple iPhone 8 Black 124GB</div>
          <div class="old-price">$499.00</div>
          <div class="new-price text-hulii-turquoise">$349.00</div>
        </div>
        <img class="thumbnail" src="//images.ctfassets.net/ooy6iyaino7r/3JqeMk9JE4WVO2r5PjwhDD/dadd0a966671a6cda219259dd45bc453/L1_Food.png" alt="">
      </a>
      <a class="categories--aisle bg-hulii-turquoise" href="/category/food">
        <div class="aisle--details">
          <div class="name">Samsung Galaxy Black 256GB</div>
          <div class="old-price">$499.00</div>
          <div class="new-price text-hulii-purple">$349.00</div>
        </div>
        <img class="thumbnail" src="//images.ctfassets.net/ooy6iyaino7r/3JqeMk9JE4WVO2r5PjwhDD/dadd0a966671a6cda219259dd45bc453/L1_Food.png" alt="">
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LatestDeals',
  props: {
    title: {
      type: String,
      default: 'Latest Deals'
    }
  }
}
</script>
<style lang="scss" scoped>
  .categories--grid {
    display: grid;
    max-width: calc(100vw - 30px);
    margin: 0 15px;
    grid-gap: 25px 10px;
    grid-template-rows: repeat(1,auto);
    grid-template-columns: repeat(3,auto);

    @screen lg {
      margin: 0 auto;
      grid-gap: 10px;
      grid-template-rows: repeat(1,auto);
      grid-template-columns: repeat(3, auto);
      max-width: 1448px;
      margin-left: auto;
      margin-right: auto;
      padding-right: 8px;
      padding-left: 8px;
    }
  }
  .categories--aisle {
    position: relative;
    height: 200px;
    border-radius: 15px;
    text-decoration: none;
    margin-bottom: 30px;
    cursor: pointer;

    &:hover {
      .thumbnail {
        transform: scale(1.05);
        transition: transform .2s ease;
      }
    }

    .aisle--details {
      position: absolute;
      max-width: 200px;
      margin-left: 20px;
      color: #fff;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .name {
        @apply text-h2;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .old-price {
        font-weight:600;
        font-size: 1rem;
        line-height: 1.5;
        text-decoration: line-through;
      }
      .new-price {
        @apply text-h2;
        font-weight: 600;
      }
    }

    .thumbnail {
      position: absolute;
      right: 10px;
      bottom: -40px;
      height: 250px;
      transition: transform .2s ease;
    }
  }
</style>
