<template>
  <div class="">
    <!-- TrustBox widget - Quote -->
    <div id="trustboxquote" class="trustpilot-widget" data-locale="en-GB" data-template-id="54d0e1d8764ea9078c79e6ee" data-businessunit-id="5cac4e343181b60001dcfc38" data-style-height="300px" data-style-width="100%" data-theme="light" data-tags="SelectedReview" data-review-languages="en">
      <!-- <a href="https://uk.trustpilot.com/review/hulii.com" target="_blank" rel="noopener">Trustpilot</a> -->
    </div>
    <!-- End TrustBox widget -->
  </div>
</template>
<script>
export default {
  mounted () {
    const trustboxquote = document.getElementById('trustboxquote')
    window.Trustpilot.loadFromElement(trustboxquote)
  }
}
</script>
