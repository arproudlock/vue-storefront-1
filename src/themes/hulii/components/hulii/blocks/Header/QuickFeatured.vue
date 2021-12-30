<template>
  <div class="container">
    <div class="featured-bar">
      <div class="featured--left">
        <!-- <a :href="`tel:` + getPhone" class="featured--contact">
          <svg enable-background="new 0 0 21.86 20.61" version="1.1" viewBox="0 0 21.86 20.61" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m5.2 1.31c0.63 0 1.01 0.46 1.28 1.19 0.38 1.06 0.86 2.09 1.32 3.12 0.22 0.49 0.19 0.9-0.2 1.3-0.36 0.39-0.67 0.82-1.04 1.2-0.39 0.39-0.41 0.76-0.13 1.23 1.38 2.3 3.28 4.01 5.72 5.1 0.59 0.27 0.89 0.42 1.12 0.42 0.3 0 0.46-0.28 0.98-0.95 0.31-0.4 0.63-0.81 0.94-1.21 0.17-0.22 0.37-0.33 0.6-0.33 0.12 0 0.25 0.03 0.39 0.1 1.3 0.6 2.6 1.2 3.9 1.79 0.45 0.21 0.53 0.55 0.47 1-0.39 2.8-2.48 4.04-4.6 4.04-0.33 0-0.67-0.03-1-0.09-2.26-0.42-4.29-1.4-6.17-2.69-2.64-1.82-4.78-4.1-6.35-6.89-0.88-1.56-1.36-3.23-1-5.04 0.25-1.27 1.02-2.23 2-3.03 0.25-0.21 0.55-0.26 0.89-0.26 0.17 0 0.36 0.01 0.55 0.02 0.12-0.01 0.23-0.02 0.33-0.02m0-1.31c-0.13 0-0.27 0.01-0.41 0.03-0.16-0.01-0.32-0.02-0.47-0.02-0.44 0-1.11 0.06-1.71 0.55-1.38 1.12-2.18 2.36-2.47 3.8-0.38 1.95-0.01 3.89 1.15 5.93 1.64 2.9 3.9 5.36 6.74 7.31 2.23 1.54 4.41 2.49 6.68 2.9 0.41 0.08 0.82 0.11 1.23 0.11 2.58 0 5.41-1.6 5.9-5.18 0.2-1.48-0.68-2.12-1.23-2.37-0.97-0.44-1.93-0.89-2.9-1.33l-0.99-0.46c-0.31-0.14-0.63-0.22-0.94-0.22-0.63 0-1.21 0.3-1.63 0.84-0.31 0.4-0.62 0.81-0.94 1.21l-0.22 0.28c-0.02-0.01-0.03-0.01-0.05-0.02l-0.26-0.12c-2.11-0.95-3.8-2.43-5.02-4.4 0.16-0.18 0.3-0.35 0.44-0.51 0.15-0.16 0.29-0.33 0.45-0.49 0.74-0.77 0.9-1.75 0.45-2.75l-0.22-0.5c-0.4-0.87-0.77-1.69-1.07-2.53-0.62-1.7-1.71-2.06-2.51-2.06z" /></svg>
          {{ getPhone }}
        </a>
        <div
          v-if="store === 'hk'"
          class="divider"
        />
        <a
          v-if="store === 'hk'"
          class="featured--contact"
          :href="'//api.whatsapp.com/send?phone=' + getWhatsapp()"
        >
          <svg enable-background="new 0 0 20.65 20.9" version="1.1" viewBox="0 0 20.65 20.9" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m20.65 10.54c0.01 4.31-2.71 8.22-6.75 9.68-2.85 1.03-5.64 0.85-8.35-0.52-0.19-0.1-0.37-0.12-0.58-0.06-1.52 0.4-3.05 0.79-4.58 1.18-0.12 0.03-0.27 0.13-0.35 0.05-0.1-0.1 0.01-0.25 0.05-0.37 0.41-1.48 0.83-2.96 1.25-4.44 0.05-0.19 0.04-0.34-0.05-0.52-0.85-1.52-1.29-3.15-1.29-4.88 0-2.62 0.85-4.94 2.58-6.92 1.49-1.69 3.34-2.79 5.54-3.27 2.22-0.48 4.38-0.26 6.45 0.68 2.39 1.09 4.12 2.86 5.2 5.25 0.6 1.31 0.87 2.7 0.88 4.14zm-10.28-8.55c-0.83 0.03-1.59 0.11-2.33 0.33-2.71 0.8-4.64 2.5-5.66 5.13-1.06 2.7-0.75 5.32 0.79 7.78 0.13 0.21 0.15 0.39 0.08 0.62-0.22 0.75-0.43 1.5-0.64 2.25-0.1 0.35-0.09 0.36 0.27 0.27 0.79-0.2 1.58-0.4 2.37-0.62 0.21-0.06 0.38-0.03 0.57 0.09 1.79 1.08 3.71 1.48 5.78 1.18 4.79-0.68 8.09-5.38 7.12-10.15-0.82-3.99-4.37-6.89-8.35-6.88z" /><path d="m7.04 5.72c0.46-0.1 0.71 0.17 0.88 0.63 0.21 0.58 0.47 1.14 0.72 1.7 0.12 0.27 0.1 0.49-0.11 0.71-0.2 0.21-0.37 0.44-0.57 0.65-0.21 0.21-0.22 0.41-0.07 0.67 0.75 1.25 1.79 2.18 3.11 2.78 0.75 0.34 0.64 0.35 1.14-0.29l0.51-0.66c0.14-0.19 0.32-0.23 0.54-0.13 0.71 0.33 1.41 0.65 2.12 0.98 0.25 0.11 0.29 0.3 0.26 0.54-0.24 1.77-1.73 2.39-3.05 2.15-1.23-0.23-2.34-0.76-3.36-1.47-1.43-0.98-2.6-2.23-3.45-3.74-0.48-0.85-0.74-1.76-0.54-2.74 0.13-0.7 0.55-1.22 1.09-1.65 0.21-0.17 0.46-0.15 0.78-0.13z" /></svg>
          {{ getWhatsapp('pretty') }}
        </a> -->
      </div>
      <div class="featured--right">
        <trustpilot-micro-score />
        <!-- <trustpilot-micro-count /> -->
      </div>
    </div>
  </div>
</template>

<script>
import TrustpilotMicroScore from 'theme/components/hulii/blocks/Trustpilot/TrustpilotMicroScore'
// import TrustpilotMicroScore from 'theme/components/hulii/blocks/Trustpilot/TrustpilotMicroScore'
// import TrustpilotMicroCount from 'theme/components/hulii/blocks/Trustpilot/TrustpilotMicroCount'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import countryInformation from 'theme/resource/country-information.json'

export default {
  name: 'QuickFeatured',
  components: {
    TrustpilotMicroScore
    // TrustpilotMicroScore
    // TrustpilotMicroCount
  },
  data () {
    const storeView = currentStoreView()
    return {
      store: storeView.storeCode,
      phone: null
    }
  },
  computed: {
    getPhone () {
      let country = this.store === '' ? 'us' : this.store
      return countryInformation[country]['contactInformation']['phone']
    }
  },
  methods: {
    getWhatsapp (type) {
      let country = this.store === '' ? 'us' : this.store
      if (type === 'pretty') {
        return countryInformation[country]['contactInformation']['whatsapp']
      } else {
        return countryInformation[country]['contactInformation']['whatsapp'].replace(/ /g, '')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);
.featured-bar {
  @apply flex justify-center;
  margin: 20px 0;

  .featured--left {
    @apply hidden;
    font-weight: 600;

  }
  .divider {
    height: 16px;
    background: #C1C1C1;
    width: 1px;
    margin: 0 10px;
  }
  @screen md {
    @apply justify-between;
    .featured--left {
      @apply flex justify-between items-center;
      .featured--contact {
        @apply flex;
        svg {
          @apply mr-2;
          width: 20px;
          max-height: 20px;
        }
      }
    }
  }
}
</style>
<style type="text/css">
	.st0{fill:#69C0AE;}
	.st1{fill:#322A66;}
	.st2{clip-path:url(#SVGID_3_);}
	.st3{clip-path:url(#SVGID_6_);fill:#342A68;}
	.st4{clip-path:url(#SVGID_6_);fill:#FBFBFC;}
	.st5{clip-path:url(#SVGID_3_);fill:#ED6DA0;}
	.st6{clip-path:url(#SVGID_8_);}
	.st7{fill:#ED6DA0;}
	.st8{clip-path:url(#SVGID_10_);}
	.st9{fill:#FBFBFC;}
	.st10{clip-path:url(#SVGID_12_);}
	.st11{fill:#362768;}
	.st12{clip-path:url(#SVGID_14_);}
	.st13{fill:#E72C5C;}
	.st14{clip-path:url(#SVGID_16_);}
	.st15{fill:#20B19D;}
	.st16{fill:#FFFFFF;stroke:#FFFFFF;stroke-miterlimit:10;}
	.st17{fill:#F6B101;}
	.st18{fill:#E72F5D;}
	.st19{fill:#F18625;}
	.st20{clip-path:url(#SVGID_18_);}
	.st21{fill:#12100B;}
	.st22{fill:#FFFFFF;}
	.st23{fill:#024E46;}
	.st24{fill:#077B90;}
	.st25{fill:url(#SVGID_28_);}
	.st26{fill:url(#SVGID_29_);}
	.st27{fill:#D8D8D8;}
	.st28{clip-path:url(#SVGID_31_);}
	.st29{fill:#FFFEFF;}
	.st30{fill:#2A3072;}
	.st31{fill:#CF132C;}
	.st32{fill:#FDFCFC;}
	.st33{fill:#2B2F78;}
	.st34{fill:#CB151B;}
	.st35{fill:#CD1423;}
	.st36{fill:#292F6C;}
	.st37{fill:#2B2F76;}
	.st38{fill:#5A57A2;}
	.st39{fill:#282E68;}
	.st40{fill:#D0182F;}
	.st41{fill:#AB1643;}
	.st42{fill:#293278;}
	.st43{fill:#FDFDFE;}
	.st44{fill:#FCFBFC;}
	.st45{fill:#F7F6FA;}
	.st46{fill:#353289;}
	.st47{fill:#3D2777;}
	.st48{fill:#282E6B;}
	.st49{fill:#292D68;}
	.st50{fill:#292F6F;}
	.st51{fill:#293275;}
	.st52{fill:#292D69;}
	.st53{fill:#3D2776;}
	.st54{fill:#DF202D;}
	.st55{fill:#282E69;}
	.st56{fill:#282D69;}
	.st57{fill:#282E6A;}
	.st58{fill:#282D68;}
	.st59{fill:#282D67;}
	.st60{fill:#CE132B;}
	.st61{fill:#CC1422;}
	.st62{fill:#D8565D;}
	.st63{fill:#CB151F;}
	.st64{fill:#CD1425;}
	.st65{fill:#D9555D;}
	.st66{fill:#A91640;}
	.st67{fill:#D0172E;}
	.st68{fill:#C91517;}
	.st69{fill:#DB192A;}
	.st70{fill:#CF132B;}
	.st71{fill:#DF1724;}
	.st72{fill:#CE2934;}
	.st73{fill:#CD1422;}
	.st74{fill:#CA1517;}
	.st75{fill:#CB151D;}
	.st76{fill:#CF162E;}
	.st77{fill:#DC1423;}
	.st78{fill:#C5C5C4;stroke:#C5C5C4;stroke-miterlimit:10;}
	.st79{clip-path:url(#SVGID_35_);fill:#F0ECEC;}
	.st80{clip-path:url(#SVGID_35_);fill:#F7F4F4;}
	.st81{clip-path:url(#SVGID_35_);fill:#FBFAFA;}
	.st82{fill:none;stroke:#FFFFFF;stroke-miterlimit:10;}
	.st83{fill:none;}
	.st84{opacity:0.4;fill:#FFFFFF;}
	.st85{fill:none;stroke:#999999;stroke-width:0.5;stroke-miterlimit:10;}
	.st86{fill:#F5E9D1;}
	.st87{fill:#E2D7C3;}
	.st88{clip-path:url(#SVGID_43_);fill:#F18404;}
	.st89{clip-path:url(#SVGID_43_);}
	.st90{clip-path:url(#SVGID_45_);}
	.st91{fill:#F18404;}
	.st92{clip-path:url(#SVGID_47_);}
	.st93{fill:#F2F2F2;}
	.st94{fill:#342A68;}
	.st95{clip-path:url(#SVGID_49_);fill:#362768;}
	.st96{clip-path:url(#SVGID_49_);}
	.st97{clip-path:url(#SVGID_51_);}
	.st98{clip-path:url(#SVGID_53_);}
	.st99{fill:#E6E6E6;}
</style>
<style type="text/css">
	.st0{fill:#69C0AE;}
	.st1{fill:#322A66;}
	.st2{clip-path:url(#SVGID_3_);}
	.st3{clip-path:url(#SVGID_6_);fill:#342A68;}
	.st4{clip-path:url(#SVGID_6_);fill:#FBFBFC;}
	.st5{clip-path:url(#SVGID_3_);fill:#ED6DA0;}
	.st6{clip-path:url(#SVGID_8_);}
	.st7{fill:#ED6DA0;}
	.st8{clip-path:url(#SVGID_10_);}
	.st9{fill:#FBFBFC;}
	.st10{clip-path:url(#SVGID_12_);}
	.st11{fill:#362768;}
	.st12{clip-path:url(#SVGID_14_);}
	.st13{fill:#E72C5C;}
	.st14{clip-path:url(#SVGID_16_);}
	.st15{fill:#20B19D;}
	.st16{fill:#FFFFFF;stroke:#FFFFFF;stroke-miterlimit:10;}
	.st17{fill:#F6B101;}
	.st18{fill:#E72F5D;}
	.st19{fill:#F18625;}
	.st20{clip-path:url(#SVGID_18_);}
	.st21{fill:#12100B;}
	.st22{fill:#FFFFFF;}
	.st23{fill:#024E46;}
	.st24{fill:#077B90;}
	.st25{fill:url(#SVGID_28_);}
	.st26{fill:url(#SVGID_29_);}
	.st27{fill:#D8D8D8;}
	.st28{clip-path:url(#SVGID_31_);}
	.st29{fill:#FFFEFF;}
	.st30{fill:#2A3072;}
	.st31{fill:#CF132C;}
	.st32{fill:#FDFCFC;}
	.st33{fill:#2B2F78;}
	.st34{fill:#CB151B;}
	.st35{fill:#CD1423;}
	.st36{fill:#292F6C;}
	.st37{fill:#2B2F76;}
	.st38{fill:#5A57A2;}
	.st39{fill:#282E68;}
	.st40{fill:#D0182F;}
	.st41{fill:#AB1643;}
	.st42{fill:#293278;}
	.st43{fill:#FDFDFE;}
	.st44{fill:#FCFBFC;}
	.st45{fill:#F7F6FA;}
	.st46{fill:#353289;}
	.st47{fill:#3D2777;}
	.st48{fill:#282E6B;}
	.st49{fill:#292D68;}
	.st50{fill:#292F6F;}
	.st51{fill:#293275;}
	.st52{fill:#292D69;}
	.st53{fill:#3D2776;}
	.st54{fill:#DF202D;}
	.st55{fill:#282E69;}
	.st56{fill:#282D69;}
	.st57{fill:#282E6A;}
	.st58{fill:#282D68;}
	.st59{fill:#282D67;}
	.st60{fill:#CE132B;}
	.st61{fill:#CC1422;}
	.st62{fill:#D8565D;}
	.st63{fill:#CB151F;}
	.st64{fill:#CD1425;}
	.st65{fill:#D9555D;}
	.st66{fill:#A91640;}
	.st67{fill:#D0172E;}
	.st68{fill:#C91517;}
	.st69{fill:#DB192A;}
	.st70{fill:#CF132B;}
	.st71{fill:#DF1724;}
	.st72{fill:#CE2934;}
	.st73{fill:#CD1422;}
	.st74{fill:#CA1517;}
	.st75{fill:#CB151D;}
	.st76{fill:#CF162E;}
	.st77{fill:#DC1423;}
	.st78{fill:#C5C5C4;stroke:#C5C5C4;stroke-miterlimit:10;}
	.st79{clip-path:url(#SVGID_35_);fill:#F0ECEC;}
	.st80{clip-path:url(#SVGID_35_);fill:#F7F4F4;}
	.st81{clip-path:url(#SVGID_35_);fill:#FBFAFA;}
	.st82{fill:none;stroke:#FFFFFF;stroke-miterlimit:10;}
	.st83{fill:none;}
	.st84{opacity:0.4;fill:#FFFFFF;}
	.st85{fill:none;stroke:#999999;stroke-width:0.5;stroke-miterlimit:10;}
	.st86{fill:#F5E9D1;}
	.st87{fill:#E2D7C3;}
	.st88{clip-path:url(#SVGID_43_);fill:#F18404;}
	.st89{clip-path:url(#SVGID_43_);}
	.st90{clip-path:url(#SVGID_45_);}
	.st91{fill:#F18404;}
	.st92{clip-path:url(#SVGID_47_);}
	.st93{fill:#F2F2F2;}
	.st94{fill:#342A68;}
	.st95{clip-path:url(#SVGID_49_);fill:#362768;}
	.st96{clip-path:url(#SVGID_49_);}
	.st97{clip-path:url(#SVGID_51_);}
	.st98{clip-path:url(#SVGID_53_);}
	.st99{fill:#E6E6E6;}
</style>
