<template>
  <div>
    <!-- <breadcrumbs :with-homepage="true" :routes="[]" active-route="BuyBack" /> -->
    <head-image />
    <div class="py35 pl20 mb35 icon-card-list justify-center">
      <h2>How it works</h2>
      <card-list :columns="3" :cards="stepcards" :card-type="'step'" />
      <br>
      <br>
      <br>
    </div>
    <div class="py35 pl20 mb35">
      <h2>What happens to my phone</h2>
      <card-list :columns="3" :cards="iconcards" :card-type="'icon'" />
    </div>
    <div class="py35 pl20 icon-card-list">
      <h2>Our supporting partners</h2>
      <card-list :columns="3" :cards="iconcards2" :card-type="'icon'" />
    </div>
    <HeroText :title="hero1.title" :button="hero1.button" :background-color="hero1.backgroundColor" :color="hero1.color" />
    <!-- <HeroText :title="hero2.title" :button="hero2.button" :backgroundColor="hero2.backgroundColor" :color="hero2.color" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumbs from 'theme/components/hulii/Breadcrumbs.vue'
import HeadImage from 'theme/components/hulii/blocks/BuyBack/LandingImage'
import CardList from 'theme/components/hulii/blocks/BuyBack/CardList'
import HeroText from 'theme/components/hulii/blocks/BuyBack/HeroText'
export default {
  data () {
    return {
      greeting: 'Hello',
      liked: 'Liked it',
      stepcards: {
        0: {
          step: 1,
          title: 'Find the value of your old phone',
          description: 'Don’t put your phone in the drawer when you finish with it, send it to us and get rewarded'
        },
        // 1: {
        //   step: 2,
        //   title: 'Answer some questions about your devices condition',
        //   description: 'This will allow us to determine the value of your device.'
        // },
        1: {
          step: 2,
          title: 'Post your phone to us for free ',
          description: 'We’ll send you a reply-paid postage satchel so you can post your phone in to us'
        },
        2: {
          step: 3,
          title: 'Once we receive it, you get paid.',
          description: "We'll transfer the reward to you within 2 business days"
        }
      },
      iconcards: {
        0: {
          icon: 'recycling',
          iconStyle: 'color:#E4DEF8;',
          elipseStyle: 'backgroundColor:#372767;',
          title: 'Recycled',
          description: 'Your phone will either be responsibly recycled with our partners Mobile Muster'
        },
        1: {
          icon: 'connect_without_contact',
          iconStyle: 'color:#E4DEF8;',
          elipseStyle: 'backgroundColor:#372767;',
          title: 'Connect unconnected communities',
          description: 'Or your phone will be refurbished and sent to a developing country where it will be used to bring connectivity to unconnected people and communities'
        },
        2: {
          icon: 'eco',
          iconStyle: 'color:#E4DEF8;',
          elipseStyle: 'backgroundColor:#372767;',
          title: 'Waste neutral',
          description: 'Where we send your phone to a developing country, we take another phone out to ensure waste neutrality'
        }
      },
      iconcards2: {
        0: {
          image: 'https://www.closingtheloop.eu/themes/ctl/logo.png',
          size: '80px',
          alt: 'Closing the Loop Logo'

        },
        1: {
          image: 'https://www.mobilemuster.com.au/wp-content/themes/mobile-muster/library/img/logo.svg?v=2',
          size: '60px',
          alt: 'Mobile Muster Logo'

        },
        2: {
          image: 'https://ld7un47f5ww196i744fd5pi1-wpengine.netdna-ssl.com/wp-content/themes/blancco-2016/assets/img/logo.png',
          size: '60px',
          alt: 'Blancco Logo'
        },
        3: {
          image: 'https://www.telstra.com.au/etc/designs/comp-nav/assets/t-logo-twilight.svg',
          size: '80px',
          alt: 'Telstra Logo'
        },
        4: {
          image: 'https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/global-samsung-logo.svg',
          size: '40px',
          class: 'm-5',
          alt: 'Samsung Logo'
        },
        5: {

          image: 'https://www.apple.com/ac/globalnav/6/en_AU/images/be15095f-5a20-57d0-ad14-cf4c638e223a/globalnav_apple_image__cxwwnrj0urau_large.svg',
          size: '120px',
          alt: 'Apple Logo'

        }
      },
      hero1: {
        title: 'Show gratitude to your old phone and get rewarded',
        backgroundColor: 'background-color:#372767;',
        color: 'color:#FFFFFF;',
        button: {
          text: 'Get started',
          link: '/buyback/yourdevice',
          backgroundColor: 'rgb(255, 255, 255);',
          color: 'rgb(45, 45, 45)'
        }
      },
      hero2: {
        title: 'Are you a small business?',
        backgroundColor: 'background-color:#ffffff;',
        color: 'color:#000000;',
        button: {
          text: 'Register here'
        }
      }

    }
  },
  components: {
    Breadcrumbs,
    HeadImage,
    CardList,
    HeroText
  },
  computed: {
    ...mapGetters({
      currentImage: 'buyback/getLandingImage'
    })
  },
  async asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    // Logger.info('Calling asyncData in Home (theme)')()

    await Promise.all([
      // store.dispatch('homepage/fetchNewCollection'),
      store.dispatch('buyback/updateLandingImage')
      // store.dispatch('promoted/updatePromotedOffers')
    ])
  },
  beforeMount () {
    this.hideMenu();
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';

$color-white: color(white);
$border: mix(#000, $color-white, 10%);
$color-product-bg: color(secondary, $colors-background);

$products-column-width-mobile: 140px;
$products-column-width: 280px;
$features-column-width-mobile: 110px;
$features-column-width: 210px;

$screen-l: 1170px;

*,
*::after,
*::before {
  box-sizing: border-box;
}
p {
  font-size: 2em;
  text-align: center;
}

.icon-card-list {
  background-color: #E4DEF8;
}

</style>
