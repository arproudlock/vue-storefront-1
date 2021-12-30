<template>
  <div class="">
    <div id="trustbox-micro-score" class="trustpilot-widget" data-locale="en-GB" data-template-id="5419b637fa0340045cd0c936" data-businessunit-id="5cac4e343181b60001dcfc38" data-style-height="20px" data-style-width="100%" data-theme="light">
      <a href="https://uk.trustpilot.com/review/hulii.com" target="_blank" rel="noopener">Trustpilot</a>
    </div>
  </div>
</template>
<script>
// import { Trustpilot } from 'src/modules/trustpilot'

export default {
  mounted () {
    try {
      this.$nextTick(() => {
        const trustbox = document.getElementById(
          `trustbox-micro-score`
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
