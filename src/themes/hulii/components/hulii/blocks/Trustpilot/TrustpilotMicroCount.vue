<template>
  <!-- TrustBox widget - Micro Review Count -->
  <div id="trustbox-micro-count" class="trustpilot-widget" data-locale="en-GB" data-template-id="5419b6a8b0d04a076446a9ad" data-businessunit-id="5cac4e343181b60001dcfc38" data-style-height="20px" data-style-width="100%" data-theme="light">
    <a href="https://uk.trustpilot.com/review/hulii.com" target="_blank" rel="noopener">Trustpilot</a>
  </div>
  <!-- End TrustBox widget -->
</template>
<script>
export default {
  mounted () {
    const trustbox = document.getElementById('trustbox-micro-count')
    window.Trustpilot.loadFromElement(trustbox)
  }
}
</script>
