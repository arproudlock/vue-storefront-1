<template>
  <div>
    <div class="container">
      <div class="usp">
        <router-link :to="localizedRoute(uspOneLink)">
          <div class="usp--item usp--one">
            <img
              src="https://ik.imagekit.io/yi7qlqdvr/moorups3/assets/12warranty.svg"
              v-lazy="'https://ik.imagekit.io/yi7qlqdvr/moorups3/assets/12warranty.svg'"
              alt="Hulii 12 Month Guaranteed Warranty"
            >
            <div class="usp--content">
              <h3 class="usp--title">
                {{ uspOneTitle }}
              </h3>
              <div class="usp--body">
                {{ uspOneBody }}
              </div>
            </div>
          </div>
        </router-link>
        <router-link :to="localizedRoute(uspTwoLink)">
          <div class="usp--item usp--two">
            <img
              src="https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/usp/returns.svg"
              v-lazy="'https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/usp/returns.svg'"
              alt="Hulii Free Easy Returns"
            >
            <div class="usp--content">
              <h3 class="usp--title">
                {{ uspTwoTitle }}
              </h3>
              <div class="usp--body">
                {{ uspTwoBody }}
              </div>
            </div>
          </div>
        </router-link>
        <router-link :to="localizedRoute(uspThreeLink)">
          <div class="usp--item usp--three">
            <img
              src="https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/usp/shipping.svg"
              v-lazy="'https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/usp/shipping.svg'"
              alt="Hulii Free Shipping"
            >
            <div class="usp--content">
              <h3 class="usp--title">
                {{ uspThreeTitle }}
              </h3>
              <div class="usp--body">
                {{ uspThreeBody }}
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton'

export default {
  name: 'USPFeatured',
  props: {
    uspOneTitle: {
      type: String,
      default: ''
    },
    uspOneBody: {
      type: String,
      default: ''
    },
    uspOneLink: {
      type: String,
      default: '#'
    },
    uspTwoTitle: {
      type: String,
      default: ''
    },
    uspTwoBody: {
      type: String,
      default: ''
    },
    uspTwoLink: {
      type: String,
      default: '#'
    },
    uspThreeTitle: {
      type: String,
      default: ''
    },
    uspThreeBody: {
      type: String,
      default: ''
    },
    uspThreeLink: {
      type: String,
      default: '#'
    }
  },
  components: {
    FullButton
  }
}
</script>
<style lang="scss" scoped>
  .usp {
    @apply flex flex-row w-full relative overflow-x-auto;

    a {
    height: 100%;
    width: 100%;
    }

    .usp--item {
      // @apply w-1/3 flex flex-row justify-center items-center;
      @apply flex flex-row justify-center items-center;
      padding: 0;

      img {
        max-width: 70px;
      }

      .usp--content {
        display: none;
        .usp--title {
          @apply text-h2;
          margin-top: 0;
          margin-bottom: 10px;
        }
        .usp--body {
          font-weight: 600;
          padding-right: 50px;
          margin-bottom: 20px;
        }
        .usp--button {
          max-width: 200px;
        }
      }
    }

    .usp--one {
      .usp--title {
        @apply text-hulii-purple;
        transition: all 200ms linear;
      }
    }
    .usp--two {
      .usp--title {
        @apply text-hulii-yellow;
      }

      // &:before {
      //   content: "";
      //   background: #f7f5f5;
      //   height: 200px;
      //   width: 100px;
      //   border-bottom-right-radius: 90px;
      //   border-top-right-radius: 90px;
      //   left: 0;
      //   float: left;
      //   position: absolute;
      //   top: 0;
      // }
    }
    .usp--three {
      .usp--title {
        @apply text-hulii-pink;
      }

      // &:before {
      //   content: "";
      //   background: #f1efed;
      //   height: 200px;
      //   width: 100px;
      //   border-bottom-right-radius: 90px;
      //   border-top-right-radius: 90px;
      //   left: 0;
      //   float: left;
      //   position: absolute;
      //   top: 0;
      // }
    }
    @screen md {
      .usp--item {
        .usp--content {
          display: block;
        }
        img {
          margin-right: 30px;
        }
      }
    }
    @screen lg {
      .usp--item {
        min-width: initial;
      }
    }
    @screen xl {
      .usp--item {
        padding: 0 20px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .usp {
      display:none;
    }
  }

</style>
