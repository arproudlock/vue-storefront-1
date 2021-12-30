<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div
    class="condition-explanation"
    data-testid="condition-explanation"
  >
    <div class="actions">
      <div class="actions--close">
        <button
          type="button"
          class="close--button"
          @click="closeConditionExplanation"
          data-testid="closeConditionExplanation"
        >
          <i class="material-icons">
            close
          </i>
        </button>
      </div>
    </div>
    <div class="explanation--content">
      <div class="explanation--title">
        <h2>{{ $t('Conditions Explanation') }}</h2>
      </div>
      <div class="explanation--selector">
        <span>{{ $t('Described as') }}</span>
        <base-select
          class="selector--select"
          name="viewedAs"
          :options="explanationOptions"
          :selected="explanation"
          v-model="explanation"
        />
      </div>
    </div>
    <div class="explanation--description">
      <div class="description--one">
        <div class="description--image">
          <img :src="getConditionsData(explanation, &quot;image&quot;, &quot;One&quot;)">
        </div>
        <div class="description--text-contents">
          <div class="description--title text-hulii-pink">
            {{ getConditionsData(explanation, "title", 'One') }}
          </div>
          <div class="description--text">
            {{ getConditionsData(explanation, "text", 'One') }}
          </div>
        </div>
      </div>
      <div class="description--two">
        <div class="description--image">
          <img :src="getConditionsData(explanation, &quot;image&quot;, &quot;Two&quot;)">
        </div>
        <div class="description--text-contents">
          <div class="description--title text-hulii-turquoise">
            {{ getConditionsData(explanation, "title", 'Two') }}
          </div>
          <div class="description--text">
            {{ getConditionsData(explanation, "text", 'Two') }}
          </div>
        </div>
      </div>
      <div class="description--three">
        <div class="description--image">
          <img :src="getConditionsData(explanation, &quot;image&quot;, &quot;Three&quot;)">
        </div>
        <div class="description--text-contents">
          <div class="description--title text-hulii-orange">
            {{ getConditionsData(explanation, "title", 'Three') }}
          </div>
          <div class="description--text">
            {{ getConditionsData(explanation, "text", 'Three') }}
          </div>
        </div>
      </div>
      <div class="description--four">
        <div class="description--image">
          <img :src="getConditionsData(explanation, &quot;image&quot;, &quot;Four&quot;)">
        </div>
        <div class="description--text-contents">
          <div class="description--title text-hulii-blue">
            {{ getConditionsData(explanation, "title", 'Four') }}
          </div>
          <div class="description--text">
            {{ getConditionsData(explanation, "text", 'Four') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isModuleRegistered } from '@vue-storefront/core/lib/module'
import BaseSelect from 'theme/components/hulii/blocks/Form/BaseSelectSecondary'

export default {
  components: {
    BaseSelect
  },
  mixins: [
  ],
  data () {
    return {
      explanationOptions: [
        { value: 'original', label: 'device conditions.' }
        // { value: 'avocado', label: 'avocados.' }
        // { value: 'toiletpaper', label: 'toilet paper.' }
      ],
      conditionsExplanation: {
        original: {
          imageOne: 'https://ik.imagekit.io/yi7qlqdvr/moorups3/assets/conditionExplanation/original-pristine-condition.svg',
          imageTwo: 'https://ik.imagekit.io/yi7qlqdvr/moorups3/assets/conditionExplanation/original-excellent-condition.svg',
          imageThree: 'https://ik.imagekit.io/yi7qlqdvr/moorups3/assets/conditionExplanation/original-good-condition.svg',
          imageFour: 'https://ik.imagekit.io/yi7qlqdvr/moorups3/assets/conditionExplanation/original-fair-condition.svg',
          titleOne: 'Pristine',
          titleTwo: 'Excellent',
          titleThree: 'Good',
          titleFour: 'Fair',
          textOne: 'A scratch-free product as if it was bought brand new (or in our case, renewed).',
          textTwo: 'Light scratches to the body and screen only as though it was almost new but had some minor use.',
          textThree: 'Visible scratches on the product as if it had been in your pocket for a few weeks.',
          textFour: 'Functionally sound but may have some deeper chips or scratches, or more frequent general wear and tear.'
        },
        toiletpaper: {
          imageOne: 'https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/conditions/original-perfect-condition.svg',
          imageTwo: 'https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/conditions/original-great-condition.svg',
          imageThree: 'https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/conditions/original-good-condition.svg',
          titleOne: '4 Ply (Perfect)',
          titleTwo: '2 Ply (Great)',
          titleThree: '1 Ply (Good)',
          textOne: 'A premium roll, as if it\'s straight out of the packet and ready to use.',
          textTwo: 'A step down from the premium toilet paper, comfortable and no issues when using.',
          textThree: 'Does what it\'s intended to and still looks great.'
        },
        avocado: {
          imageOne: 'https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/conditions/avocado-perfect-condition.svg',
          imageTwo: 'https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/conditions/avocado-great-condition.svg',
          imageThree: 'https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/conditions/avocado-good-condition.svg',
          titleOne: 'Fresh (Perfect)',
          titleTwo: 'Ripe (Great)',
          titleThree: 'Good (Good)',
          textOne: 'Like new, tough, solid inners with no dents.',
          textTwo: 'A tough exterior with slightly soft inners and the the odd dent.',
          textThree: 'Soft inners, a few dents and scratches. Almost ready to spread on toast.'
        }
      },
      explanation: 'original'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
  },
  methods: {
    closeConditionExplanation () {
      this.$store.commit('ui/setConditionsExplanation', false)
    },
    onEscapePress () {
      this.$store.commit('ui/setConditionsExplanation', false)
    },
    getConditionsData (condition, type, number) {
      const final = type + number
      return this.conditionsExplanation[condition][final]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~theme/css/animations/transitions";

  .close--button {
    background: none;
    border: 0;
    cursor: pointer;
    color: transparent;
    font-size: 0;
    height: 44px;
    position: absolute;
    right: 25px;
    top: 10px;
    width: 44px;

    i {
      color: #000;
      opacity: 0.6;
    }
    &:hover,
    &:focus {
      i {
        opacity: 1;
      }
    }
  }

  .actions {
    @media (max-width: 767px) {
      padding: 0 15px;
    }
    .link {
      @media (max-width: 767px) {
        display: flex;
        justify-content: center;
        padding: 20px 70px;
        &.checkout {
          margin-top: 55px;
          padding: 0;
        }
      }
    }
  }

  .condition-explanation {
    padding-top: 20px;

    .explanation--content {
      @apply ml-6;

      .explanation--title {
        h2 {
          @apply flex text-left mb-2 items-center;
          font-size: 1.5rem;
        }

      }
    }
    .explanation--selector {
      @apply flex flex-row items-center text-grey mb-6;
      font-weight: 600;

      .selector--select {
        select {
          @apply text-hulii-pink cursor-pointer;
          min-width: 120px;
          margin-left: 6px;
          font-size: 16px;
          font-family: 'HuliiSans, sans-serif';
          border-bottom: none;
          font-weight: 600;
          text-decoration: underline;
        }
        &::after {
          border-color: #f172a3 transparent transparent transparent;
          right: 0;
          top: 18px;
          display: none;
        }
      }
    }
    .explanation--description {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      // grid-template-columns: 1fr, 1fr, 1fr, 1fr;
      .description--text-contents {
        @apply text-left;
      }
      .description--one {
        @apply flex justify-center items-center flex-row  justify-start;
        background: #fbf9f9;
        padding: 0 24px;
      }
      .description--two {
        @apply flex justify-center items-center flex-row  justify-start;
        background: #f7f5f5;
        padding: 0 24px;
      }
      .description--three {
        @apply flex justify-center items-center flex-row  justify-start;
        background: #f1efed;
        padding: 0 24px;
      }
      .description--four {
        @apply flex justify-center items-center flex-row  justify-start;
        background: #f7f5f5;
        padding: 0 24px;
      }
      .description--title {
        font-weight: 800;
      }
      .description--image {
        @apply mr-8;
        height: auto;
        width: auto;
        padding: 24px 0;
        height: 80px;

        img {
          width: 100%;
          height: 100%;
        }
      }
      .description--title {
        @apply mb-4;
        font-size: 1.5rem;
      }
      @screen md {
        grid-template-columns: repeat(4, 1fr);
        .description--one {
          @apply flex-col;
          min-height: 300px;
          background: #fbf9f9;
          padding: 50px 0;
        }
        .description--two {
          @apply flex-col;
          min-height: 300px;
          background: #f7f5f5;
          padding: 50px 0;
        }
        .description--three {
          @apply flex-col;
          min-height: 300px;
          background: #f1efed;
          padding: 50px 0;
        }
        .description--four {
          @apply flex-col;
          min-height: 300px;
          background: #f7f5f5;
          padding: 50px 0;
        }
        .description--image {
          @apply mr-0;
          margin-bottom: 20px;
          padding: 0 0;
          height: 150px;
        }
        .description--text-contents {
          @apply text-center;
          padding: 0 40px;
        }
      }
    }
  }

  .summary {
    @media (max-width: 767px) {
      padding:  0 15px;
      font-size: 12px;
    }
  }

  .summary-heading {
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }

  .total-price-label {
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }

  .total-price-value {
    @media (max-width: 767px) {
      font-size: 24px;
    }
  }

  .delete-button {
    vertical-align: middle;
  }

  .coupon-wrapper {
    display: flex;

    .button-outline {
      text-transform: inherit;
      width: 50%;
    }

    .coupon-input {
      margin-right: 20px;
      width: 100%;
    }
  }
</style>
