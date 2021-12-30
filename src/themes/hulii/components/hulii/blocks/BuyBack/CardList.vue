<template>
  <div class="card-list m0 center-xs start-md">
    <div
      v-for="(card, key) in cards"
      :key="card.id"
      class="col-sm-6 flex"
      :class="['col-md-' + (12/columns)%10]"
    >
      <!-- :class="['col-md-' + (12/columns)%10, wide(product.sale, product.new, key)] -->
      <StepCard :card-detail="card" v-if="cardType==='step'" />
      <IconCard :card-detail="card" v-if="cardType==='icon'" />
    </div>
  </div>
</template>

<script>
import StepCard from './StepCard.vue';
import IconCard from './IconCard.vue';

export default {
  name: 'CardList',
  components: {
    StepCard,
    IconCard
  },
  props: {
    columns: {
      type: [Number, String],
      required: true
    },
    cards: {
      type: [Object],
      required: true
    },
    cardType: {
      type: [String],
      required: true
    }

  }

  // methods: {
  //   wide (isOnSale, isNew, index) {
  //     let deltaCondition = index > 0 && ((index - 1) - lastHero) % 2 === 0
  //     // last image always shouldn't be big, we also need to count from last promoted to check if it will look ok
  //     let isHero = ((isOnSale === '1' || isNew === '1') && deltaCondition) || (index === this.products.length - 1 && (index - lastHero) % 2 !== 0)
  //     if (isHero) {
  //       lastHero = index
  //     }
  //     return isHero ? 'col-xs-12' : 'col-xs-6'
  //   }
  // }
}

</script>

<style lang="scss" scoped>
.myrow > [class*="col-"] {
    -ms-flex-preferred-size: 33.33333333%;
    flex-basis: 33.33333333%;
    max-width: 33.33333333%;
}

.card-list {
  display: flex;
  flex-direction: column;

  @screen lg {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
