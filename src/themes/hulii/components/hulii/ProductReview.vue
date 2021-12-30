<template>
  <div class="product--review--main">
    <div class="product--rating">
      <div class="total--rating">
        <star-rating :stars="getRating(product.product_reviews.av_stars)" v-if="product.product_reviews.count" />
        <!-- <span class="rating--count">{{ product.product_reviews.av_stars }}/5</span> -->
      </div>
      <div class="rating-desc" v-if="product.product_reviews.count">
        Average rating of {{ product.product_reviews.av_stars | decimal2 }} stars from {{ product.product_reviews.count }}<span v-if="product.product_reviews.count == 1"> review</span><span v-else> reviews</span>
      </div>
      <div class="rating-desc" v-else>
        No review yet
      </div>
    </div>
    <div class="product--rating--list" v-if="product.product_reviews.count">
      <div v-for="(review, index) in product && product.product_reviews.reviews" :key="index">
        <div class="rating--list">
          <div class="rating--col1">
            <div class="rating-user-profile">
              <span class="rating--product--img" />
              <span class="rating--author--info">
                <p>{{ review.reviewer }}</p>
                <p>{{ review.reviewer_time }}</p>
              </span>
            </div>
            <div class="reviewer--rating">
              <!-- <span class="rating--count">{{ review.stars }}</span> -->
              <star-rating :stars="getRating(review.stars)" />
            </div>
          </div>
          <div class="rating--col2">
            <div class="reviewer--feedback">
              {{ review.content }}
            </div>
            <div class="device-specification">
              <div
                class="device-specification-list"
                v-for="(list, index2) in review.attributeRatings"
                :key="index2"
              >
                <p>{{ list.attributeName }}</p>
                <div><ellipse-rating :ellipses="getRating(list.rating)" /></div>
              </div>
            </div>
          </div>
        </div>
        <div class="section--divider" />
      </div>
      <div class="load--more">
        <!-- <load-more /> -->
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'src/themes/hulii/components/hulii/StarRating.vue';
import EllipseRating from 'src/themes/hulii/components/hulii/EllipseRating.vue';
import dummy from '../../resource/dummy.json';
import ProductMixin from 'theme/mixins/product';
import LoadMore from './LoadMore.vue';
import { decimal2 } from 'theme/filters'

export default {
  components: { StarRating, EllipseRating, LoadMore },
  name: 'ProductReview',
  props: {
    product: {
      type: null,
      required: true
    },
    options: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
    };
  },
  mixins: [ProductMixin]
};
</script>

<style lang="scss" scoped>
.product--review--main {
  display: grid;
  grid-template-areas: "product-rating  product-rating-list product-rating-list";
  grid-template-columns: repeat(3, 1fr);
  .product--rating {
    grid-area: product-rating;
    .total--rating {
      display: flex;
      margin-bottom: 10px;
      .rating--count {
        margin-right: 10px;
        font-size: 24px;
        font-weight: 800;
      }
      .star-rating-main {
        align-items: center;
      }
    }
    .rating-desc {
      width: 50%;
      color: #6c6b6b;
      font-size: 14px;
      line-height: 22px;
    }
  }
  .product--rating--list {
    grid-area: product-rating-list;
  }
  .rating--list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: "rating-col1 rating-col2 rating-col2 rating-col2";
    grid-gap: 8px;
    .rating--col1 {
      grid-area: rating-col1;
      .rating-user-profile {
        margin-bottom: 1rem;
        .rating--author--info {
          p {
            margin: 0px;
            margin-bottom: 0.5rem;
            &:nth-child(2) {
              font-size: 14px;
              color: #6c6b6b;
            }
          }
        }
      }
      .reviewer--rating {
        display: flex;
        .rating--count {
          margin-right: 10px;
          font-weight: 600;
        }
      }
    }
    .rating--col2 {
      grid-area: rating-col2;
      .reviewer--feedback {
        line-height: 22px;
      }
      .device-specification {
        display: grid;
        grid-template-columns: auto;
        margin: 30px auto;
        @screen md {
          grid-template-columns: auto auto auto;
        }
        p {
          margin: 0px auto;
          font-size: 14px;
        }
        .device-specification-list {
          margin-bottom: 20px;
          p {
            margin-bottom: 4px;
          }
        }
      }
    }
  }
  .section--divider {
    @apply w-full bg-grey-light mb-8;
    height: 1px;
  }
  .load--more {
    width: 25%;
  }
}
</style>
