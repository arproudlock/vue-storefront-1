<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <div v-if="!helpCenter" class="loading__gif">
      <img :src="loadingImg">
    </div>
    <div v-if="helpCenter">
      <div class="help--title row">
        <h2>
          {{ title }}
        </h2>
      </div>
      <div class="single-post-content" v-html="content" />
      <!-- <div class="row" v-html="data" /> -->
    </div>
  </div>
</template>

<script>
import store from '@vue-storefront/core/store'
import { isServer, onlineHelper } from '@vue-storefront/core/helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import CmsData from 'src/modules/magento-2-cms/components/CmsData'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { Logger } from '@vue-storefront/core/lib/logger'
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    hcid: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      store: currentStoreView().storeCode,
      selectedCategoryIds: [],
      helpCenter: [],
      title: null,
      filtered: null,
      content: null
    }
  },
  mixins: [CmsData],
  computed: {
    ...mapGetters('user', ['isLoggedIn'])
    // data () {
    //   if (this.id) {
    //     return this.$store.getters[`cms/get${this.type}`](this.id)
    //   } else if (this.identifier) {
    //     return this.$store.getters[`cms/get${this.type}Identifier`](this.identifier)
    //   } else {
    //     return this.$store.getters[`cms/get${this.type}Identifier`](this.$route.params.slug)
    //   }
    // }
  },
  watch: {
    id (valNew, valOld) {
      console.log('THIRD - watch - id - ', valNew, ' ', valOld)
    }
  },
  // Hide header menu
  beforeMount () {
    this.$store.commit('ui/setHeaderMenu', false)
    this.$store.dispatch('contentful/list', {
      limit: 10,
      contentType: 'helpCenter'
    }).then((result) => {
      this.helpCenter = result.result.items
      console.log(this.helpCenter)
      this.helpCenter = this.helpCenter.filter((value) => {
        return value.sys.id === this.hcid
      })
      this.title = this.helpCenter[0].fields.title;
      const bodyData = this.helpCenter[0].fields.content;
      this.content = documentToHtmlString(bodyData)
    });
  }
}
</script>

<style lang="scss">
.static-content {
  a {
    @apply text-hulii-turquoise no-underline;
  }
  p {
    @apply mb-3;
  }
}
.static__content-block {

}
.help--title {
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 30px;
  h2 {
    @apply mt-4 mb-4;
    display: flex;
    text-align: left;
    font-size: 1.5rem;
  }
}

.single-post-content {
  line-height: 140%;
  font-size: 16px;

  h2 {
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 15px;

    @screen md {
      line-height: 2.7 !important;
    }
  }
  p  {
    @apply text-base mb-4;
  }
}
</style>
