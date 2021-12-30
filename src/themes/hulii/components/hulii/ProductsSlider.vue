<template>
  <div>
    <div class="container">
      <div class="flex">
        <header class="slider-header">
          <h2 class="slider--title mt-0">
            {{ title }}
          </h2>
          <div class="slider--see-more">
            {{ $t('See All') }}
            <no-ssr>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon--arrow-right-bold hl-cta__arrow" style="fill:#000000;" focusable="false" data-ebayui="" aria-hidden="true" viewBox="1.2 2.1 22 21"><g stroke="#ffffff" fill="#ffffff" stroke-width="0px"><path d="M11.704 22.098a1.48 1.48 0 0 1-1.02-.386 1.38 1.38 0 0 1-.413-.996c0-.375.146-.721.415-.978.411-.397 5.078-4.857 6.494-6.21H2.706c-1.035 0-1.506-.726-1.506-1.4 0-.679.471-1.406 1.506-1.406h14.472c-1.42-1.353-6.02-5.736-6.497-6.213-.292-.291-.445-.635-.442-.996a1.37 1.37 0 0 1 .447-.975c.501-.479 1.354-.681 2.037.003.561.56 9.765 9.334 9.856 9.423l.173.163-.172.162c-.093.09-9.407 8.985-9.86 9.422-.264.258-.639.387-1.016.387" stroke="#000000" fill="#000000" stroke-width="0px" /></g></svg>
            </no-ssr>
          </div>
        </header>
      </div>
    </div>
    <div class="collection-slider">
      <div class="container">
        <div class="row">
          <div class="col-md-12 px-0 slider--container-margin">
            <div class="center-xs">
              <no-ssr>
                <carousel v-bind="config" @pageChange="setMuted" :per-page-custom="[[576, 3], [1024, 5]]">
                  <slide
                    v-for="product in products"
                    :key="product.id"
                  >
                    <product-tile
                      class="collection-product"
                      :product="product"
                      :labels-active="false"
                      :only-image="false"
                    />
                  </slide>
                </carousel>
              </no-ssr>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import ProductTile from 'theme/components/hulii/ProductTile'

export default {
  name: 'ProductsSlider',
  props: {
    title: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  components: {
    'Carousel': () => import('vue-carousel').then(Slider => Slider.Carousel),
    'Slide': () => import('vue-carousel').then(Slider => Slider.Slide),
    ProductTile,
    'no-ssr': NoSSR
  },
  data () {
    return {
      currentPage: 0
    }
  },
  methods: {
    setMuted (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-product-bg: color(secondary, $colors-background);

.collection-slider {
  overflow: hidden;
  .slider--container-margin {
    margin-left: -15px;
  }
  .VueCarousel-dot--active {
    button {
      background: rgb(29, 177, 157) !important;
    }
  }
}

.product {
  &.collection-product {
    padding: 0;
  }
}

.collection-product {
  .product-link {
    display: block;
    padding: 0 15px;
  }

  .product-image {
    height: auto;
    will-change: opacity;

    img {
      max-width: 100%;
      max-height: 100%;
      height: auto;
      vertical-align: bottom;
    }
  }
}
.slider-header {
  @apply flex w-full justify-between items-center;

  .slider--title {
    @apply flex text-left text-h2;
    margin-bottom: 30px;
  }
  .slider--see-more {
    @apply text-sm flex flex-row;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: none;

    svg {
      width: 12px;
      margin-left: 10px;
    }
  }
}
</style>
