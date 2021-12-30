<template>
  <!-- TrustBox widget - Micro Star -->
  <div id="trustbox-micro-star" class="trustpilot-widget" data-locale="en-AU" data-template-id="5419b732fbfb950b10de65e5" data-businessunit-id="5cac4e343181b60001dcfc38" data-style-height="24px" data-style-width="100%" data-theme="light" data-tags="SelectedReview" data-font-family="Ubuntu">
    <a href="https://au.trustpilot.com/review/hulii.com" target="_blank" rel="noopener">Trustpilot</a>
  </div>
  <!-- End TrustBox widget -->
</template>

export default {
  mounted () {
    const trustbox = document.getElementById('trustbox-micro-star')
    window.Trustpilot.loadFromElement(trustbox)
    <!-- Trustpilot.loadFromElement(trustbox) -->
  }
}
</script>
