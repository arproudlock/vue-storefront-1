<template>
  <div class="">
    <div id="trustbox-dropdown" class="trustpilot-widget" data-locale="en-GB" data-template-id="5418052cfbfb950d88702476" data-businessunit-id="5cac4e343181b60001dcfc38" data-style-height="30px" data-style-width="100%" data-theme="light" data-stars="4,5">
      <a href="https://uk.trustpilot.com/review/hulii.com" target="_blank" rel="noopener" />
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    const trustbox = document.getElementById('trustbox-dropdown')
    window.Trustpilot.loadFromElement(trustbox)
  }
}
</script>
