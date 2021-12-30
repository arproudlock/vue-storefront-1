import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import App from './App.vue'
import routes from './router'
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import SocialSharing from 'vue-social-sharing'
import '@vue-storefront/core/lib/passive-listeners'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import { once } from '@vue-storefront/core/helpers'
import * as themeFilters from '@vue-storefront/core/filters'
import * as moreFilters from 'theme/filters'
// import Vuetify from 'vuetify'
// import VueGooglePlaces from 'vue-google-places'

// Custom components
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faUser, faLongArrowAltLeft, faChevronRight, faChevronLeft, faTimes, faEllipsisH, faEye, faLock, faEyeSlash, faPhone, faPlus, faMinus, faCheckCircle, faInfoCircle, faCheck, faGlobe, faFilter } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram, faYoutube, faPinterest, faFacebookF, faPinterestP, faWeibo, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMinus)
library.add(faFilter)
library.add(faPlus)
library.add(faLock)
library.add(faEyeSlash)
library.add(faPhone)
library.add(faTimes)
library.add(faFacebookF)
library.add(faPinterestP)
library.add(faWeibo)

const options = {
  color: '#ffffff',
  failedColor: '#e72d5c',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  }
}

once('__VUE_EXTEND_DROPPOINT_VPB__', () => {
  Vue.use(VueProgressBar, options)
  Vue.use(SocialSharing)
  // Vue.use(Vuetify)
  // Vue.use(VueGooglePlaces)
  Vue.component('font-awesome-icon', FontAwesomeIcon)
})

const themeEntry = App
function initTheme (app, router, store, config, ssrContext) {
  // if youre' runing multistore setup this is copying the routed above adding the 'storeCode' prefix to the urls and the names of the routes
  // You can do it on your own and then be able to customize the components used for example for German storeView checkout
  // To do so please execlude the desired storeView from the config.storeViews.mapStoreUrlsFor and map the urls by Your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized },
  setupMultistoreRoutes(config, router, routes)
  RouterManager.addRoutes(routes)
}

Object.keys(themeFilters).forEach(key => {
  Vue.filter(key, themeFilters[key])
})

Object.keys(moreFilters).forEach(key => {
  Vue.filter(key, moreFilters[key])
})

export {
  themeEntry,
  initTheme
}
