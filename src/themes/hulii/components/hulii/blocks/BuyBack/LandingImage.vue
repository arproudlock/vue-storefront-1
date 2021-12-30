<template>
  <section class="head-image w-100 bg-cl-th-accent cl-white">
    <div class="w-100 h-100 cl-white" v-lazy:background-image="image.image" v-if="image">
      <div class="head-image-content w-100 h-100 justify-center">
        <h1 class="" data-testid="mainSliderTitle">
          {{ image.title }}
        </h1>
        <p
          class="subtitle mb0 serif h3"
          data-testid="mainSliderSubtitle"
        >
          {{ image.subtitle }}
        </p>
        <div class="align-center inline-flex">
          <!-- <button-outline :link="image.link" color="light">
            {{ image.button_text }}
          </button-outline> -->
          <div class="contents--button--container">
            <div>
              <router-link
                class="contents--button"
                :to="localizedRoute(image.link)"
                :style="'color:' + image.button_color + ';background:' + image.button_bg"
              >
                {{ $t(image.button_text) }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ButtonOutline from 'theme/components/theme/ButtonOutline'
// import { mapGetters } from 'vuex'

export default {
  components: {
    ButtonOutline
  },
  data () {
    return {
      image: {
        title: 'Get rewarded for keeping your old phone out of landfill',
        subtitle: '',
        image: '/assets/sustainabilityBanner.png',
        link: '/buyback/yourdevice',
        button_text: 'Get rewarded',
        button_color: 'rgb(45, 45, 45)',
        button_bg: 'rgb(255, 255, 255);'
      }
    }
  }
  // computed: {
  //   ...mapGetters({
  //     currentImage: 'buyback/getLandingImage'
  //   })
  // }
}
</script>

<style lang="scss" scoped>
.head-image {
  // display: none;
  .title {
    font-family: 'Khula';
    font-style: normal;
    font-weight: bold;
  }
  @media (min-width: 767px) {
    display: inherit;
  }

  .head-image-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5%;
    margin-right: 5%;

    @screen md {
      margin-left: 15%;
      margin-right: 36%;
    }
    .title {
      font-size: 2.4rem;
      margin-bottom: 0;
      margin-top:20%;
    }

    .subtitle {
      font-size: 0.8rem;
      max-width: 340px;
      font-family: 'Roboto', sans-serif;
      line-height: 1.2rem;
    }
  }
}

.head-image {
  height: 640px;
}
.container {
  background-size: cover;
  background-position: bottom center;
  background-repeat: no-repeat;
}
.row {
  height: 640px;
}
@media (max-width: 75em) {
  .head-image {
    height: 400px;
  }
  .title {
    font-size: 50px;
  }
  .subtitle {
    font-size: 20px;
  }
  .row {
    height: 400px;
  }
}
@media (max-width: 90em) {
  .head-image {
    height: 359px;
  }
  .container {
    background-position: left;
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
  .row {
    height: 359px;
  }
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
</style>
