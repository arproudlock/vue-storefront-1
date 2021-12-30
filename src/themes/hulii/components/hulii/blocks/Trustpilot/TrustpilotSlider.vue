<template>
  <div class="shadow">
    <!-- <div id="trustbox" class="trustpilot-widget" data-locale="en-GB" data-template-id="53aa8912dec7e10d38f59f36" data-businessunit-id="5cac4e343181b60001dcfc38" data-style-height="240px" data-style-width="100%" data-theme="light" data-stars="4,5">
      <a href="https://uk.trustpilot.com/review/hulii.com" target="_blank" rel="noopener" />
    </div> -->
    <!-- TrustBox widget - Slider -->
    <div id="trustslider" class="trustpilot-widget" data-locale="en-GB" data-template-id="54ad5defc6454f065c28af8b" data-businessunit-id="5cac4e343181b60001dcfc38" data-style-height="240px" data-style-width="100%" data-theme="light" data-stars="4,5" data-review-languages="en">
      <a href="https://uk.trustpilot.com/review/hulii.com" target="_blank" rel="noopener">Trustpilot</a>
    </div>
    <!-- End trustslider widget -->
  </div>
</template>
<script>
export default {
  mounted () {
    try {
      this.$nextTick(() => {
        const trustbox = document.getElementById(
          `trustslider`
        );
        if (window.Trustpilot) {
          window.Trustpilot.loadFromElement(trustbox);
        }
      });
    } catch (error) {
      console.info(error);
    }
  }
}
</script>
