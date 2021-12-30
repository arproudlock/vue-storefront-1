<template>
  <section class="main-slider container">
    <no-ssr>
      <carousel :per-page="1" :autoplay="true" :autoplay-timeout="5000" :autoplay-hover-pause="true" :loop="true" pagination-active-color="#ffffff" pagination-color="#e0e0e0">
        <slide v-for="(slide, index) in slides" :key="index">
          <div class="main-slider--container"
               v-lazy:background-image="getImageUrl(slide)"
          >
            <div class="container--contents">
              <div class="contents--body">
                <h1
                  class="contents--title"
                  :style="'color:' + slide.fields.bannerTitleColour"
                  data-testid="mainSliderTitle"
                >
                  {{ slide.fields.bannerTitle }}
                </h1>
                <h3
                  class="contents--subtitle"
                  :style="'color:' + slide.fields.bannerSubtitleColour"
                  data-testid="mainSliderTitle"
                >
                  {{ slide.fields.bannerSubtitle }}
                </h3>
                <div class="contents--button--container">
                  <div>
                    <router-link
                      class="contents--button"
                      :to="localizedRoute(slide.fields.buttonLink)"
                      :style="'color:' + slide.fields.buttonTextColour + ';background:' + slide.fields.buttonColour"
                    >
                      {{ $t(slide.fields.buttonText) }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </slide>
      </carousel>
    </no-ssr>
  </section>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import sliderData from 'theme/resource/slider.json'

export default {
  props: {
    slides: {
      type: Array,
      required: false,
      default: []
    }
  },
  data () {
    return {
      currentSlide: 1
    }
  },
  components: {
    'Carousel': () => import('vue-carousel').then(Slider => Slider.Carousel),
    'Slide': () => import('vue-carousel').then(Slider => Slider.Slide),
    'no-ssr': NoSSR
  },
  computed: {
    totalSlides () {
      return this.slides.length
    }
  },
  methods: {
    updateSliderData (data) {
      this.totalSlides = slides.length
    },
    getImageUrl (data) {
      const imageKitUrl = 'https://ik.imagekit.io/yi7qlqdvr/contentful/'
      const removeUrl = '//images.ctfassets.net/i6qgzr9t1bem'
      const contentfulUrl = data ? data.fields.bannerImage.fields.file.url.replace(removeUrl, '') : ''
      return imageKitUrl + contentfulUrl
    }
  },
  mounted () {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % (this.totalSlides)
    }, 5000)
  }
}
</script>
<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-white: color(white);
.main-slider {

  .VueCarousel-pagination {
    position: absolute;
    bottom: 15px;

    .VueCarousel-dot-button {
      outline: none;
    }
  }
  .VueCarousel-dot--active .VueCarousel-dot-inner {
    border: 2px solid $color-white;
    margin-top: -2px;
  }

  @screen md {
    .VueCarousel-wrapper {
      border-radius: 30px;
    }
  }
}
</style>
<style lang="scss" scoped>
.main-slider {
  height: 450px;
  margin-left: 0;
  margin-right: 0;

  .main-slider--container {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .container--contents {
      @apply justify-center;
      height: 450px;
      display: flex;
      flex-direction: column;
      margin: 0px 25px;

      .contents--body {
        @apply flex;
      @apply flex-col;
      @apply items-center;
      }

      .contents--title {
        @apply text-center;
        font-weight: bold;
        margin-top: 0;
        margin-bottom: 10px;
        line-height: 32px;
        font-size: 30px;
      }
      .contents--subtitle {
        @apply text-center;
        font-weight: 500;
        margin-top: 0;
        font-size: 1.5rem;
        margin-bottom: 40px;
      }
      .contents--button--container {
        .contents--button {
          display: flex;
          justify-content: center;
          align-items: center;
          border-width: 1px;
          font-weight: 600;
          font-size: 1rem;
          line-height: 1;
          border-radius: 5px;
          padding: 0;
          box-shadow: inset 0 -3px 0 rgba(0, 0, 0, .15);
          transition: transform .1s ease-out;
          width: 250px;
          min-height: 48px;
          text-transform: capitalize;

          &:hover {
            box-shadow: inset 0 -100px 0 rgba(0,0,0,0.15);
          }

          &:active {
            box-shadow: inset 0 -100px 0 rgba(0,0,0,0.2);
            transform: scale(0.98);
            transition: transform .1s ease-out;
          }
        }
      }
    }
  }
  @screen md {
    margin-left: 32px;
    margin-right: 32px;

    .main-slider--container {
      border-radius: 15px;

      .container--contents {
        width: 450px;
        margin: 0px 55px;

        .contents--body {
          display: block;
        }

        .contents--title {
          line-height: 45px;
          font-size: 36px;
        }

        .contents--title, .contents--subtitle {
          @apply text-left;
        }
      }
    }
  }
  @screen xxl {
    margin-left: auto;
    margin-right: auto;
  }
}
@media (max-width: 75em) {
  .main-slider {
    .container--contents {
      height: 400px;
    }
  }
  .title {
    font-size: 50px;
  }
  .subtitle {
    font-size: 20px;
  }
}
@media (max-width: 64em) {
  .main-slider {
    height: 359px;

    .main-slider--container {
      background-position: -25px;

      .container--contents {
        height: 359px;
      }
    }
  }
  .title {
    font-size: 48px;
  }
  .subtitle {
    font-size: 18px;
  }
  .button {
    font-size: 16px;
  }
}
</style>
