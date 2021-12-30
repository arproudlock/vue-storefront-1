<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="thank-you container">
    <div class="thank-you--breadcrumbs">
      <breadcrumbs
        :routes="[{name: 'Home', route_link: '/'}]"
        :active-route="this.$t('Completed Order')"
      />
    </div>
    <div class="thank-you--content">
      <header class="thank-you--header">
        <h1>
          {{ $t('Thank You') }}
        </h1>
        <p class="thank-you--subtitle">
          <!-- {{ $t('Both us and the Earth thank you for your order! You are actively helping to reducing global e-waste through making this purchase. We\'ll get started on your order right away. You should be receiving an order confirmation email shortly. If you have any questions please call us on') }} -->
          <!-- {{ $t('Both us and the Earth thank you for your order! You are actively helping to reducing global e-waste through making this purchase. We\'ll get started on your order right away. You should be receiving an order confirmation email shortly.') }} -->
          {{ $t('By placing this order you are doing your bit for our planet! We\'ll get started on your order right away. You should be receiving an order confirmation email shortly.') }}
          <br>
          <br>
          <!-- {{ $t('If you have any questions please call us on') }} -->
          {{ $t('If you have any questions please ') }}
          <!-- <a :href="`tel:` + getPhone" class="menu-link upper__tel">{{ getPhone }}.</a> -->
          <router-link class="menu-link" :to="localizedRoute('/help-center/contact-us')" exact>
            {{ $t('contact us.') }}
          </router-link>
        </p>
      </header>
    </div>
  </div>
</template>

<script>
import Composite from '@vue-storefront/core/mixins/composite'
import Breadcrumbs from 'theme/components/hulii/Breadcrumbs'
import BaseTextarea from 'theme/components/core/blocks/Form/BaseTextarea'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import VueOfflineMixin from 'vue-offline/mixin'
import { EmailForm } from '@vue-storefront/core/modules/mailer/components/EmailForm'
import { isServer } from '@vue-storefront/core/helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import countryInformation from 'theme/resource/country-information.json'
import config from 'config'

export default {
  name: 'ThankYouPage',
  mixins: [Composite, VueOfflineMixin, EmailForm],
  data () {
    const storeView = currentStoreView()
    const isProd = process.env.NODE_ENV === 'production'
    return {
      feedback: '',
      store: storeView.storeCode,
      currency: storeView.i18n.currencyCode,
      phone: null
    }
  },
  computed: {
    lastOrder () {
      return this.$store.state.order ? this.$store.state.order : {}
    },
    lastOrderConfirmation () {
      return this.$store.state.order.last_order_confirmation ? this.$store.state.order.last_order_confirmation.confirmation : {}
    },
    isNotificationSupported () {
      if (isServer || !('Notification' in window)) return false
      return 'Notification' in window
    },
    isPermissionGranted () {
      if (isServer || !('Notification' in window)) return false
      return Notification.permission === 'granted'
    },
    checkoutPersonalEmailAddress () {
      return this.$store.state.checkout.personalDetails.emailAddress
    },
    mailerElements () {
      return config.mailer.contactAddress
    },
    getPhone () {
      let country = this.store === '' ? 'us' : this.store
      return countryInformation[country]['contactInformation']['phone']
    }
  },
  beforeMount () {
    this.$bus.$on('order-after-placed', this.sendSegmentDetails)
    if (!this.isProd) {
      this.$bus.$on('order-after-placed', this.generateRakutenScript)
    }
    // Delete the Cart as it is no longer needed.
    this.$store.dispatch('cart/delete');
  },
  beforeDestroy () {
    this.$bus.$off('order-after-placed', this.sendSegmentDetails)
    if (!this.isProd) {
      this.$bus.$off('order-after-placed', this.generateRakutenScript)
    }
  },
  methods: {
    requestNotificationPermission () {
      if (isServer) return false
      if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission()
      }
    },
    sendSegmentDetails () {
      let orderItems = this.$store.state.order.last_order_confirmation.order.products ? this.$store.state.order.last_order_confirmation.order.products : ''
      let value = 0
      let orderProducts = orderItems.map((product, index) => {
        value = value + product.priceInclTax
        return {
          product_id: product.sku,
          sku: product.sku,
          name: product.name,
          price: product.priceInclTax,
          position: index + 1,
          image_url: product.image
        }
      })
      let oribiProducts = orderItems.map((product, index) => {
        return {
          id: product.sku,
          name: product.name,
          price: product.priceInclTax,
          quantity: product.qty
        }
      })
      window.analytics.track('Order Completed', {
        checkout_id: this.$store.state.order.last_order_confirmation.order.order_id ? this.$store.state.order.last_order_confirmation.order.order_id : '',
        order_id: this.$store.state.order.last_order_confirmation.order.order_id ? this.$store.state.order.last_order_confirmation.order.order_id : '',
        affiliation: 'Hulii Website',
        total: value,
        revenue: value,
        currency: this.currency,
        products: orderProducts
      })
      window.analytics.identify({
        firstName: this.lastOrderFirstName,
        lastName: this.lastOrderLastName,
        email: this.checkoutPersonalEmailAddress,
        address: {
          street: this.lastOrderStreetOne !== {} ? this.lastOrderStreetOne + ', ' + this.lastOrderStreetTwo : this.lastOrderStreetTwo,
          city: this.lastOrderCity,
          state: this.lastOrderRegion,
          country: this.lastOrderCountry,
          postalCode: this.lastOrderPostcode
        },
        phone: this.lastOrderPhone
      })
      try {
        let response = window.ORIBI.api('trackPurchase', {
          totalPrice: value,
          currency: this.currency,
          orderId: this.$store.state.order.last_order_confirmation.order.order_id ? this.$store.state.order.last_order_confirmation.order.order_id : '',
          products: oribiProducts
        })
      } catch (e) {

      };
      let cartItems = orderItems
      let ga4value = 0
      let ga4Items = cartItems.map((product, index) => {
        ga4value = ga4value + product.priceInclTax
        let categories = product.url_path.split('/');
        let slug = categories.pop();
        return {
          item_id: product.sku,
          item_name: product.name,
          currency: 'AUD',
          index: index + 1,
          item_brand: product.brand,
          item_category: categories[0] ? categories[0] : null,
          item_category1: categories[1] ? categories[1] : null,
          item_category2: categories[2] ? categories[2] : null,
          item_category3: categories[3] ? categories[3] : null,
          item_category4: categories[4] ? categories[4] : null,
          item_category5: categories[5] ? categories[5] : null,
          item_category6: categories[6] ? categories[6] : null,
          price: product.priceInclTax,
          shipping_type: product.shipping_type,
          quantity: product.qty,
          seller: product.seller
        }
      });
      // console.log(ga4Items);
      window.gtag('event', 'purchase', {
        currency: 'AUD',
        transaction_id: this.$store.state.order.last_order_confirmation.order.order_id ? this.$store.state.order.last_order_confirmation.order.order_id : '',
        value: ga4value,
        items: ga4Items
      });

      // console.log(response);
      // console.log(oribiProducts);
    },
    generateRakutenScript () {
      // Add in Data Layer
      let order = this.lastOrder.last_order_confirmation.order
      let confirmation = this.lastOrder.last_order_confirmation.confirmation
      // Get Item Details
      let itemDetails = []
      order.products.map(prod => {
        let item = {
          quantity: prod.qty,
          unitPrice: prod.price,
          unitPriceLessTax: prod.price,
          SKU: prod.sku,
          productName: prod.name
        }
        itemDetails.push(item)
      })
      // Get Order Details
      let orderDetails = {
        affiliateConfig: {ranMID: '45091', discountType: 'item', includeStatus: 'false', taxRate: 0, removeTaxFromDiscount: true},
        orderid: confirmation.orderNumber,
        currency: this.currency,
        customerStatus: order.user_id === '' ? 'New' : 'Existing',
        conversionType: 'Sale',
        customerID: order.user_id,
        discountCode: '',
        discountAmount: '',
        taxAmount: '',
        lineitems: itemDetails
      }
      // Build Script
      let bodyContent = 'var rm_trans=' + JSON.stringify(orderDetails) + ';/*Do not edit any information beneath this line*/!function(e,t,n){var o=e.rakutenDataLayerName||"DataLayer";e[o]=e[o]||{},e[o].events=e[o].events||{},e[o].events.SPIVersion="3.4",e[o].Sale=e[o].Sale||{},e[o].Sale.Basket=e[o].Sale.Basket||{},n.Ready=e[o].Sale.Basket.Ready&&e[o].Sale.Basket.Ready+1||1,e[o].Sale.Basket=n;var a,r=function(e){for(var n,o=e+"=",a=t.cookie.split(";"),r=0;r<a.length;r++){for(n=a[r];" "==n.charAt(0);)n=n.substring(1,n.length);if(0==n.indexOf(o))return n.substring(o.length,n.length)}return""},i=function(e){var t=e||"",n={};if(e||(t=r("rmStore")),t){for(;t!==decodeURIComponent(t);)t=decodeURIComponent(t);for(var o=t.split("|"),a=0;a<o.length;a++)n[o[a].split(":")[0]]=o[a].split(":")[1]}return n};a=i();var s=function(e,t,n,o){n=n||"",o=o||{};var r=a[e||""],i=o[t||""],s=(r=o.ignoreCookie||!1?0:r)||i||n;return s=("string"!=typeof s||"false"!==s.toLowerCase())&&s},c=function(e,n,o,a,r){var i=t.createElement(e),s=-1<t.location.protocol.indexOf("s")?"https:":"http:";for(var c in n=n.replace("https:",s),i.src=n,a=a||{},"script"==e?a.type=a.type||"text/javascript":(a.style="display:none;","img"==e&&(a.alt="",a.height="1",a.width="1")),a)a.hasOwnProperty(c)&&i.setAttribute(c,a[c]);var u=t.getElementsByTagName(o);u=u.length?u[0]:t.getElementsByTagName("script")[0].parentElement,r&&(i.onload=r,i.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&r()}),u.appendChild(i)},u=function(){var t=e[o]&&e[o].Sale&&e[o].Sale.Basket?e[o].Sale.Basket:{},n=n||t.affiliateConfig||{},a=s("amid","ranMID","",n)||t.ranMID;if(!a)return!1;if(!(void 0===n.allowCommission||"false"!==n.allowCommission))return!1;var i=s("adn","domain","track.linksynergy.com",n),u=s("atm","tagType","pixel",n),d=s("adr","discountType","order",n),l=s("acs","includeStatus","false",n),m=s("arto","removeOrderTax","false",n),p=s("artp","removeTaxFromProducts","false",n),v=s("artd","removeTaxFromDiscount","false",n),f=s("atr","taxRate",t.taxRate||0,n),h=s("acv","centValues","true",n),C=s("ald","land",!1,{})||(n.land&&!0===n.land?r("ranLandDateTime"):n.land)||!1,I=s("atrv","tr",!1,{})||(n.tr&&!0===n.tr?r("ranSiteID"):n.tr)||!1,S=(100+(f=Math.abs(+f)))/100,y=encodeURIComponent(t.orderid||"OrderNumberNotAvailable"),g="",R="",U="",N="",T=t.currency||"";T=encodeURIComponent(T.toUpperCase());var D=h&&"false"!==h?100:1,A=t.taxAmount?Math.abs(D*+t.taxAmount):0,L=t.discountAmount?Math.abs(D*+t.discountAmount):0,x=t.discountAmountLessTax?Math.abs(D*+t.discountAmountLessTax):0;!x&&L&&v&&f&&(x=L/S),x=x||L;var k="ep";"mop"===u&&(k="eventnvppixel");var M=(t.customerStatus||"")+"",b="";M&&(l&&"EXISTING"==M.toUpperCase()||l&&"RETURNING"==M.toUpperCase())&&(b="R_");for(var P=[],w=0,O=0;O<(t.lineitems?t.lineitems.length:0);O++)if(t.lineitems[O]){var B=!1,E=+(X=e.JSON?JSON.parse(JSON.stringify(t.lineitems[O])):t.lineitems[O]).quantity||0,V=+X.unitPrice||0,q=+X.unitPriceLessTax,F=q||V||0;p&&f&&!q&&(F/=S);for(var j,K=E*F,_=0;_<P.length;_++)(j=P[_]).SKU===X.SKU&&(B=!0,j.quantity+=E,j.totalValue+=K);B||(X.quantity=E,X.totalValue=K,P.push(X)),w+=K*D}var G={};for(O=0;O<P.length;O++){var X=P[O],J=encodeURIComponent(X.SKU),z=X.totalValue||X.totalValue,H=(E=X.quantity,encodeURIComponent(X.productName)||""),Q=z*D;"item"===d.toLowerCase()&&x&&(Q-=x*Q/w);var W=X.optionalData;for(var Y in W)W.hasOwnProperty(Y)&&(G[Y]=G[Y]||"",G[Y]+=encodeURIComponent(W[Y])+"|");g+=b+J+"|",R+=E+"|",U+=Math.round(Q)+"|",N+=b+H+"|"}g=g.slice(0,-1),R=R.slice(0,-1),U=U.slice(0,-1),N=N.slice(0,-1),x&&(x=Math.round(x)),A&&(A=Math.round(A)),x&&"order"===d.toLowerCase()&&(g+="|"+b+"DISCOUNT",N+="|"+b+"DISCOUNT",R+="|0",U+="|-"+x),m&&A&&(g+="|"+b+"ORDERTAX",R+="|0",U+="|-"+A,N+="|"+b+"ORDERTAX");var Z="https://"+i+"/"+k+"?mid="+a;Z+="&ord="+y,Z+="&skulist="+g,Z+="&qlist="+R,Z+="&amtlist="+U,Z+="&cur="+T,Z+="&img=1",Z+="&spi="+e[o].events.SPIVersion,Z+=C?"&land="+C:"",Z+=I?"&tr="+I:"",x&&"item"===d.toLowerCase()&&(Z+="&discount="+x);W=t.optionalData||{};for(var Y in t.discountCode&&(W.coupon=t.discountCode),t.customerStatus&&(W.custstatus=t.customerStatus),t.customerID&&(W.custid=t.customerID),x&&(W.disamt=x),W)W.hasOwnProperty(Y)&&(Z+="&"+encodeURIComponent(Y)+"="+encodeURIComponent(W[Y]));for(var Y in G)G.hasOwnProperty(Y)&&(Z+="&"+encodeURIComponent(Y)+"list="+G[Y].slice(0,-1),x&&"order"===d.toLowerCase()&&(Z+="|"),A&&m&&(Z+="|"));if("&"===(Z+="&namelist="+N)[Z.length-1]&&(Z=Z.slice(0,-1)),2037<Z.length){for(var $=2037;0<$;){if("&"==Z.charAt($)){Z=Z.slice(0,$);break}$--}Z+="&trunc=true"}c("img",Z,"body")},d=function(){var t=e[o]&&e[o].Sale&&e[o].Sale.Basket?e[o].Sale.Basket:{},n=n||t.displayConfig||{};if(t.orderid&&t.conversionType){var a=s("dmid","rdMID","",n);if(!a)return!1;var r=s("dtm","tagType","js",n),i=s("ddn","domain","tags.rd.linksynergy.com",n),u=s("dis","includeStatus","false",n),d=s("dcomm","allowCommission","notset",n),l=s("duup","useUnitPrice","false",n),m=s("drtp","removeTaxFromProducts","false",n),p=s("drtd","removeTaxFromDiscount","false",n),v=s("dtr","taxRate",t.taxRate||0,n),f="";"true"===d||!0===d||"1"===d||1===d?f="1":("false"===d||!1===d||"0"===d||0===d)&&(f="0");var h="script";"if"===(r="js"===r||"if"===r||"img"===r?r:"js")?h="iframe":"img"===r&&(h="img"),("true"===l||!0===l||"1"===l||1===l)&&(l=!0);var C=(t.customerStatus||"")+"",I="";C&&u&&("EXISTING"==C.toUpperCase()||"RETURNING"==C.toUpperCase())&&(I="R_");var S=encodeURIComponent(I+t.orderid),y=encodeURIComponent(t.currency||""),g=0,R="",U=(100+(v=Math.abs(+v)))/100,N=t.discountAmount?Math.abs(+t.discountAmount):0,T=t.discountAmountLessTax?Math.abs(+t.discountAmountLessTax):0;!T&&N&&p&&v&&(T=N/U),T=T||N,T=isNaN(T)?0:T;for(var D=0;D<(t.lineitems?t.lineitems.length:0);D++)if(t.lineitems[D]){var A=+t.lineitems[D].quantity,L=+t.lineitems[D].unitPriceLessTax*A;(!L||l)&&(L=m&&v?+t.lineitems[D].unitPrice/U*A:+t.lineitems[D].unitPrice*A),g+=L=isNaN(L)?0:L,R+=encodeURIComponent(t.lineitems[D].SKU)+","}g=Math.round(100*(g-T))/100,R=R.slice(0,-1);var x="https://"+i+"/"+r+"/"+a;x+="/?pt=conv",x+="&orderNumber="+S,x+="&spi="+e[o].events.SPIVersion,g&&(x+="&price="+g),y&&(x+="&cur="+y),f&&(x+="&tvalid="+f),R&&(x+="&prodID="+R),c(h,x,"body")}},l=function(){var t=e[o]&&e[o].Sale&&e[o].Sale.Basket?e[o].Sale.Basket:{},n=t.searchConfig||{},a=1024,r=encodeURIComponent("...TRUNCATED"),i=s("smid","rsMID","",n);if(!i)return!1;var u=s("said","accountID","113",n),d=s("sclid","clickID","",n),l=encodeURIComponent(s("sct","conversionType",t.conversionType&&"sale"!==(t.conversionType+"").toLowerCase()?t.conversionType:"conv",n));c("script","https://services.xg4ken.com/js/kenshoo.js?cid="+i,"body",null,function(){var e={};if(e.conversionType=l,e.revenue=0,e.currency=encodeURIComponent(t.currency||"USD"),e.orderId=encodeURIComponent(t.orderid||""),e.promoCode=encodeURIComponent(t.discountCode||""),d&&(e.ken_gclid=encodeURIComponent(d)),e.discountAmount=+(t.discountAmount||0),e.discountAmount=isNaN(e.discountAmount)?0:Math.abs(e.discountAmount),e.customerStatus=encodeURIComponent(t.customerStatus||""),e.productIDList="",e.productNameList="",t.lineitems&&t.lineitems.length){for(var n=0;n<t.lineitems.length;n++)t.lineitems[n]&&(e.revenue+=+(t.lineitems[n].unitPrice||0)*+t.lineitems[n].quantity,e.productIDList+=(t.lineitems[n].SKU||"NA")+",",e.productNameList+=(t.lineitems[n].productName||"NA")+",");e.revenue=Math.round(100*(e.revenue-e.discountAmount))/100,e.productIDList=encodeURIComponent(e.productIDList.slice(0,-1)),e.productNameList=encodeURIComponent(e.productNameList.slice(0,-1)),e.productIDList.length>a&&(e.productIDList=e.productIDList.substring(0,a-r.length)+r),e.productNameList.length>a&&(e.productNameList=e.productNameList.substring(0,a-r.length)+r)}kenshoo.trackConversion(u,i,e)})};e[o].SPI={readRMCookie:r,processRMStoreCookie:i,readRMStoreValue:s,sRAN:u,sDisplay:d,sSearch:l,addElement:c,rmStore:a},u(),d(),l()}(window,document,rm_trans);'
      let bodyScript = document.createElement('script')
      bodyScript.type = 'text/javascript'
      bodyScript.text = bodyContent
      document.body.appendChild(bodyScript)
    },
    sendFeedback () {
      this.sendEmail(
        {
          sourceAddress: this.checkoutPersonalEmailAddress,
          targetAddress: this.mailerElements,
          subject: this.$t('What we can improve?'),
          emailText: this.feedback
        },
        this.onSuccess,
        this.onFailure
      )
    },
    onSuccess (message) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message,
        action1: { label: this.$t('OK') }
      })
      if (this.mailerElements.sendConfirmation) {
        this.sendEmail(
          {
            sourceAddress: this.mailerElements,
            targetAddress: this.checkoutPersonalEmailAddress,
            subject: this.$t('Confirmation of receival'),
            emailText: this.$t(`Dear customer,\n\nWe have received your letter.\nThank you for your feedback!`),
            confirmation: true
          }
        )
      }
    },
    onFailure (message) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message,
        action1: { label: this.$t('OK') }
      })
    }
  },
  destroyed () {
    this.$store.dispatch('checkout/setThankYouPage', false)
  },
  components: {
    BaseTextarea,
    Breadcrumbs,
    ButtonOutline
  }
}
</script>

<style lang="scss">
.thank-you {
  @apply w-full;
  display: grid;
  padding-top: 20px;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 16px;
  grid-template-areas:
    "breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb"
    "content content content content content content content content content content content content";
  margin-bottom: 50px;
  .thank-you--breadcrumbs {
    grid-area: breadcrumb;
  }
  .thank-you--content {
    grid-area: content;
    .thank-you--header {
      @apply text-center;
      h1 {
        @apply text-hulii-hot-pink;
        line-height: 75px;
        font-size: 60px;
      }
      .thank-you--subtitle {
        max-width: 700px;
        margin: auto;
        font-weight: 600;
        user-select: none;
      }
    }
  }
}
  .thank-you-content {
    padding-left: 0;

    p {
      line-height: 25px
    }

    @media (min-width: 64em) {
      h4 {
        font-size: 24px;
      }
    }
  }
  .thank-you-improvment {
    padding: 0 20px 15px;

    @media (min-width: 64em) {
      padding: 0 40px 10px;
    }

    textarea {
      min-height: 100px;
    }
  }
</style>
