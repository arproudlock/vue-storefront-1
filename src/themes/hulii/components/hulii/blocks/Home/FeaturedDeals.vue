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
            <svg xmlns="http://www.w3.org/2000/svg" focusable="false" data-ebayui="" aria-hidden="true" viewBox="1.2 2.1 22 21" class="icon icon--arrow-right-bold hl-cta__arrow" style="fill:#000000;"><g stroke="#ffffff" fill="#ffffff" stroke-width="0px"><path d="M11.704 22.098a1.48 1.48 0 0 1-1.02-.386 1.38 1.38 0 0 1-.413-.996c0-.375.146-.721.415-.978.411-.397 5.078-4.857 6.494-6.21H2.706c-1.035 0-1.506-.726-1.506-1.4 0-.679.471-1.406 1.506-1.406h14.472c-1.42-1.353-6.02-5.736-6.497-6.213-.292-.291-.445-.635-.442-.996a1.37 1.37 0 0 1 .447-.975c.501-.479 1.354-.681 2.037.003.561.56 9.765 9.334 9.856 9.423l.173.163-.172.162c-.093.09-9.407 8.985-9.86 9.422-.264.258-.639.387-1.016.387" stroke="#000000" fill="#000000" stroke-width="0px" /></g></svg>
          </div>
        </header>
      </div>
    </div>
    <div class="categories--grid container">
      <router-link
        v-for="(deal, index) in data"
        :key="index"
        class="categories--aisle"
        :style="'background:' + deal.fields.featuredDealsBackgroundColour"
        :to="localizedRoute(deal.fields.featuredDealsButtonLink)"
      >
        <div class="aisle--details">
          <div
            class="title"
            :style="'color:' + deal.fields.featuredDealsTitleColour"
          >
            {{ $t(deal.fields.featuredDealsTitle) }}
          </div>
          <div
            class="subtitle"
            :style="'color:' + deal.fields.featuredDealsSubtitleColour"
          >
            {{ $t(deal.fields.featuredDealsSubtitle) }}
          </div>
          <div class="aisle--button">
            <div
              class="aisle--button--container"
              :style="'background:' + deal.fields.featuredDealsButtonColour"
            >
              <div
                class="aisle--button"
                :style="'color:' + deal.fields.featuredDealsButtonTextColour"
              >
                {{ $t(deal.fields.featuredDealsButtonText) }}
              </div>
            </div>
          </div>
        </div>
        <img
          class="thumbnail"
          :src="getImageUrl(deal)"
          v-lazy="getImageUrl(deal)"
          :alt="deal.fields.featuredDealsImage.fields.title"
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton'

export default {
  name: 'FeaturedDeals',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: ''
    }
  },
  components: {
    FullButton
  },
  methods: {
    getImageUrl (data) {
      const imageKitUrl = 'https://ik.imagekit.io/yi7qlqdvr/contentful/'
      const removeUrl = '//images.ctfassets.net/i6qgzr9t1bem'
      const contentfulUrl = data ? data.fields.featuredDealsImage.fields.file.url.replace(removeUrl, '') : ''
      return imageKitUrl + contentfulUrl
    }
  }
}
</script>
<style lang="scss" scoped>
  .slider--see-more {
    display: none;
  }
  .categories--grid {
    display: grid;
    max-width: calc(100vw - 30px);
    grid-gap: 25px 10px;
    grid-template-rows: repeat(1,auto);
    grid-template-columns: repeat(2,auto);

    @screen lg {
      grid-gap: 10px;
      grid-template-columns: repeat(12, 1fr);
      max-width: 1448px;
    }
  }
  .categories--aisle {
    position: relative;
    height: 300px;
    border-radius: 15px;
    text-decoration: none;
    margin-bottom: 30px;
    cursor: pointer;
    grid-column: span 6 / auto;

    &:hover {
      .thumbnail {
        transform: scale(1.05);
        transition: transform .2s ease;
      }
    }

    .aisle--details {
      @apply items-center text-center;
      position: absolute;
      color: #fff;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 15px;
      }
      .subtitle {
        font-weight: 500;
        margin-top: 0;
        font-size: 1.5rem;
        margin-bottom: 25px;
      }
    }
    .aisle--button {
      max-width: 200px;

      .aisle--button--container {
        @apply flex justify-center items-center cursor-pointer;
        letter-spacing: .1rem;
        padding: 13px 23px;
        font-weight: 600;
        font-size: 13px;
        line-height: 1;
        text-transform: uppercase;
        border-radius: 5px;
        box-shadow: inset 0 -3px 0 rgba(0,0,0,0.15);
        transition: transform .1s ease-out;

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
    .thumbnail {
      position: absolute;
      right: 20px;
      bottom: -50px;
      height: 370px;
      transition: transform .2s ease;
      max-width: 40%;
      height: auto;
      display: none;
      max-height: 400px;
    }

    @screen md {
      .thumbnail {
        display: block;
      }
      .aisle--details {
        @apply items-start text-left;
        max-width: 400px;
        margin-left: 40px;
      }
    }

    @screen lg {
      .categories--aisle {
        .aisle--details {
          max-width: 350px;
        }
      }
    }
  }
</style>
