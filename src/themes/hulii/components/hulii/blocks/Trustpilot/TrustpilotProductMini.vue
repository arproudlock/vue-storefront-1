<template>
  <!-- TrustBox widget - Product Mini -->
  <div :id="tpid" class="trustpilot-widget" data-locale="en-AU" data-template-id="54d39695764ea907c0f34825" data-businessunit-id="5cac4e343181b60001dcfc38" data-style-height="24px" data-style-width="100%" data-theme="light" data-tags="SelectedReview" :data-sku="skus" data-no-reviews="hide" :data-scroll-to-list="list" :style="tpstyle">
    <!-- <a :href="link" target="_blank" rel="noopener">Trustpilot</a> -->( No Reviews yet )
  </div>
  <!-- End TrustBox widget -->
</template>
<script>
export default {
  props: {
    skus: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: 'https://au.trustpilot.com/review/hulii.com'
    },
    target: {
      type: String,
      default: '_blank'
    },
    prodid: {
      type: String,
      required: true
    },
    tpstyle: {
      type: String,
      default: 'position:relative;'
    },
    list: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tpid () {
      return 'trustpilot-product-mini' + this.prodid;
    }
  },
  mounted () {
    const trustbox = document.getElementById(this.tpid)
    window.Trustpilot.loadFromElement(trustbox)
  }
}
</script>
