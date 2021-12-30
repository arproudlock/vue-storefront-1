<template>
  <div class="mb-0">
    <div id="trustbox-mini" class="trustpilot-widget" data-locale="en-GB" data-template-id="5419b6a8b0d04a076446a9ad" data-businessunit-id="5cac4e343181b60001dcfc38" data-style-height="120px" data-style-width="100%" data-theme="light" data-stars="4,5">
      <a href="https://uk.trustpilot.com/review/hulii.com" target="_blank" rel="noopener" />
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    const trustbox = document.getElementById('trustbox-mini')
    window.Trustpilot.loadFromElement(trustbox)
  }
}
</script>

<!-- data-template-id="53aa8807dec7e10d38f59f32"
 End TrustBox widget -->
