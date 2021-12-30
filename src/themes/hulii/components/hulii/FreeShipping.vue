<template>
  <div class="w-full">
    <p v-if="calculateFreeShippingPercentage.percent === 100" class="text-sm text-center mb-2">
      {{ $t('You\'ve earned FREE shipping!') }}
    </p>
    <p v-else class="text-sm text-center mb-2">
      ${{ calculateFreeShippingPercentage.remaining }} {{ $t('away from FREE shipping') }}
    </p>
    <div class="text-sm flex-row flex items-center">
      <!-- TODO replace the currency symbols with store specific -->
      <span>$0</span>
      <div class="w-full px-2">
        <progress-bar size="large" class="rounded" bar-color="#00c8a9" :val="calculateFreeShippingPercentage.percent" />
      </div>
      <span>${{ freeShippingThreshold }}</span>
    </div>
  </div>
</template>

<script>
import Microcart from '@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart'
import ProgressBar from 'vue-simple-progress'

export default {
  name: 'FreeShipping',
  data () {
    return {
      freeShippingThreshold: 50,
      percentage: ''
    }
  },
  mixins: [Microcart],
  components: {
    ProgressBar
  },
  computed: {
    getGrandTotal () {
      return this.totals.find(o => o.code === 'grand_total').value
    },
    calculateFreeShippingPercentage () {
      // TODO Pull the free shipping cost on the fly
      let total = this.getGrandTotal
      let sub = this.freeShippingThreshold - total
      if (sub < 0) {
        let p = 100
        let r = 0
        return {
          percent: p,
          remaining: r
        }
      } else {
        const p = (total / this.freeShippingThreshold) * 100
        const r = (total - this.freeShippingThreshold) * -1
        return {
          percent: p,
          remaining: r
        }
      }
    }
  }
}
</script>

<style lang="scss">
.vue-simple-progress, .vue-simple-progress-bar {
  border-radius: 1rem;
}
</style>
