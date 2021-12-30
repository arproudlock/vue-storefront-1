<template>
  <!-- TrustBox widget - Product Reviews SEO -->
  <div :id="tpid" class="trustpilot-pseo-widget-light" data-locale="en-GB" data-template-id="5717796816f630043868e2e8" data-businessunit-id="5cac4e343181b60001dcfc38" data-style-height="700px" data-style-width="100%" data-theme="light" data-tags="SelectedReview" :data-sku="skus" data-name="Apple iPhone 6s 64GB Space Grey - Excellent" data-review-languages="en" data-star-color="#00b67a" data-no-reviews="hide">
    <!-- <a href="https://uk.trustpilot.com/review/hulii.com" target="_blank" rel="noopener">Trustpilot</a> -->
  </div>
  <!-- End TrustBox widget -->

  <!-- TrustBox widget - Product Reviews SEO  Dark-->
  <!-- <div :id="tpid" class="trustpilot-pseo-widget-dark" data-locale="en-GB" data-template-id="5717796816f630043868e2e8" data-businessunit-id="5cac4e343181b60001dcfc38" data-style-height="700px" data-style-width="100%" data-theme="dark" data-tags="SelectedReview" :data-sku="skus" data-name="Apple iPhone 6s 64GB Space Grey - Excellent" data-review-languages="en" data-star-color="#00b67a" data-no-reviews="hide">
    <a href="https://uk.trustpilot.com/review/hulii.com" target="_blank" rel="noopener">Trustpilot</a>
  </div> -->
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
    }
  },
  computed: {
    tpid () {
      return 'trustpilot-product-seo' + this.prodid;
    }
  },
  mounted () {
    const trustbox = document.getElementById(this.tpid);
    window.Trustpilot.loadFromElement(trustbox);
  }
}
</script>
<style lang="scss" scoped>
 .trustpilot-pseo-widget-dark {
    padding: 2rem;
    background-color: #372768;
    /* background-color: #fafafb; */
    box-shadow: -20rem 0 #372768, 40rem 0 #372768;
 }

 .trustpilot-pseo-widget-light {
    padding: 2rem;
    background-color: #fafafb;
    /* background-color: #fafafb; */
    box-shadow: -20rem 0 #fafafb, 40rem 0 #fafafb;
 }
</style>
