<template>
  <div class="container">
    <div
      v-for="(feature, index) in data"
      :key="index"
      class="brand--feature"
    >
      <div class="brand--image__container">
        <router-link :to="localizedRoute(feature.fields.brandFeatureLink)">
          <div class="brand--image" v-lazy:background-image="getImageUrl(feature)" />
        </router-link>
        <!-- <div class="brand--image" v-lazy:background-image="getImageUrl(feature)" /> -->
      </div>
      <div class="brand--details">
        <h2 class="brand--details__title">
          {{ $t(feature.fields.brandFeatureTitle) }}
        </h2>
        <p class="brand--details__body">
          {{ $t(feature.fields.brandFeatureSummary) }}
        </p>
        <div
          class="brand--button-container"
        >
          <router-link
            :to="localizedRoute(feature.fields.brandFeatureLink)"
            class="brand--button"
            :style="'background:' + feature.fields.brandFeatureButtonColour"
          >
            {{ $t(feature.fields.brandFeatureButtonText) }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton'

export default {
  name: 'BrandFeature',
  props: {
    data: {
      type: Array,
      required: true,
      default: null
    }
  },
  components: {
    FullButton
  },
  methods: {
    getImageUrl (data) {
      const imageKitUrl = 'https://ik.imagekit.io/yi7qlqdvr/contentful/'
      const removeUrl = '//images.ctfassets.net/i6qgzr9t1bem'
      const contentfulUrl = data ? data.fields.brandFeatureImage.fields.file.url.replace(removeUrl, '') : ''
      return imageKitUrl + contentfulUrl
    }
  }
}
</script>
<style lang="scss" scoped>
.brand--feature {
  @apply flex flex-col;

  .brand--image__container {
    @apply w-full;
    overflow: hidden;
    border-radius: 15px;
    height: 200px;

    a {
      height: 100%;
      width: 100%;

      .brand--image {
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        width: 100%;
        height: 100%;
      }
    }

    .brand--image {
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: cover;
      width: 100%;
      height: 100%;
    }
  }

  .brand--details {
    @apply flex flex-col justify-center text-center items-center;

    .brand--details__title {
      @apply text-h2;
      margin-bottom: 10px;
    }
    .brand--details__body {
      margin-bottom: 30px;
    }
    .brand--button-container {
      max-width: 200px;
      .brand--button {
        @apply flex justify-center items-center cursor-pointer;
        padding: 13px 23px;
        color: white;
        font-weight: 600;
        letter-spacing: .1rem;
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
  }
  @screen lg {
    @apply flex-row;
    .brand--details {
      @apply items-start w-1/3;
      margin-left: 50px;
    }
    .brand--image__container {
      @apply w-2/3;
      height: 400px;
      display: flex;
    }
    .brand--details__body {
      @apply text-left;
    }
  }
}
</style>
