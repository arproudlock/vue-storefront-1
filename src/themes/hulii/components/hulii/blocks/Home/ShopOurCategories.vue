<template>
  <div class="container">
    <div class="flex">
      <header class="slider-header">
        <h2 class="slider--title mt-0">
          {{ title }}
        </h2>
      </header>
    </div>
    <div class="categories--grid">
      <router-link
        v-for="(cat, index) in data"
        :key="index"
        class="categories--aisle"
        :to="localizedRoute(cat.fields.categoryLink)"
        :style="'background:' + cat.fields.categoryColour"
      >
        <div class="title">
          {{ cat.fields.categoryTitle }}
        </div>
        <img
          class="thumbnail"
          v-lazy="getImageUrl(cat)"
          :src="getImageUrl(cat)"
          :alt="cat.fields.categoryImage.fields.title"
        >
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShopOurCategories',
  props: {
    title: {
      type: String,
      default: 'Shop Our Categories'
    },
    data: {
      type: Array,
      default: null,
      required: true
    }
  },
  methods: {
    getImageUrl (data) {
      const imageKitUrl = 'https://ik.imagekit.io/yi7qlqdvr/contentful/'
      const removeUrl = '//images.ctfassets.net/i6qgzr9t1bem'
      const contentfulUrl = data ? data.fields.categoryImage.fields.file.url.replace(removeUrl, '') : ''
      return imageKitUrl + contentfulUrl
    }
  }
}
</script>
<style lang="scss" scoped>
  .categories--grid {
    display: grid;
    max-width: calc(100vw - 30px);
    grid-gap: 25px 25px;
    grid-template-rows: repeat(3,auto);
    grid-template-columns: repeat(2,auto);

    @screen lg {
      margin: 0 auto;
      grid-gap: 50px;
      grid-template-rows: repeat(1,auto);
      grid-template-columns: repeat(4, auto);
    }
  }
  .categories--aisle {
    position: relative;
    height: 130px;
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

    .title {
      font-weight:600;
      position: absolute;
      max-width: 100px;
      margin-left: 20px;
      color: #fff;
      font-size: 16px;
      line-height: 1.5;
      z-index: 1;
      height: 100%;
      display: flex;
      margin-top: 25px;
    }

    .thumbnail {
      position: absolute;
      right: 10px;
      bottom: -20px;
      height: 100px;
      transition: transform .2s ease;
    }
  }
</style>
