<template>
  <section class="head-image w-100 bg-cl-th-accent cl-white">
    <div class="w-100 h-100 align-center" :style="color+backgroundColor">
      <div class="head-image-content h-100 justify-center">
        <h1 class="" v-if="title">
          {{ title }}
        </h1>
        <p class="subtitle mb0 serif h3" v-if="subtitle">
          {{ subtitle }}
        </p>
        <br>
        <div class="align-center inline-flex">
          <!-- <full-button :link="button.link" color="white" :text="button.text" size="large" textColor="purple" bgColor="hulii-turquoise"/> -->
          <!-- {{  }} -->
          <!-- </outline-button> -->
          <div class="contents--button--container">
            <div>
              <router-link
                class="contents--button"
                :to="localizedRoute(button.link)"
                :style="'color:' + button.color + ';background:' + button.backgroundColor"
              >
                {{ $t(button.text) }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton'
export default {
  name: 'HeroText',
  props: {
    title: {
      type: [String],
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    subtitle: {
      type: [String],
      required: false
    },
    backgroundColor: {
      type: [String],
      required: true
    },
    color: {
      type: [String],
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    button: {
      type: [Object],
      required: false
    }
  },
  components: {
    FullButton
  }
}
</script>

<style lang="scss" scoped>
.head-image {
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
    align-items: center;
    // margin-left: 15%;
    // margin-right: 36%;
    .title {
      font-size: 2.4rem;
      margin-bottom: 0;
      margin-top:10%;
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
