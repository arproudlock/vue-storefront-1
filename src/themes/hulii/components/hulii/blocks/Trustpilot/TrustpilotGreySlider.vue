<template>
  <div class="h-container mt-2 lg:mb-12 lg:px-6 rounded-normal py-4">
    <div id="trustbox-grey-slider" class="trustpilot-widget" data-locale="en-GB" data-template-id="54ad5defc6454f065c28af8b" data-businessunit-id="5cac4e343181b60001dcfc38" data-style-height="240px" data-style-width="100%" data-theme="light" data-stars="4,5">
      <a href="https://uk.trustpilot.com/review/hulii.com" target="_blank" rel="noopener" />
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    const trustbox = document.getElementById('trustbox-grey-slider')
    window.Trustpilot.loadFromElement(trustbox)
  }
}
</script>
