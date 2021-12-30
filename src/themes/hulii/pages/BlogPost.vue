<!-- eslint-disable vue/no-v-html -->
<template>
  <div id="blog--post" class="container">
    <no-ssr>
      <vue-headful
        :title="metaTitle"
        :description="richTextHtml"
        :image="postImageUrl"
      />
    </no-ssr>
    <breadcrumbs
      :routes="[{name: 'Blog', route_link: '/blog'}]"
      :active-route="postTitle"
      class="pt-4 pl-sm"
    />
    <div class="bg-white blog--post">
      <div class="h-container px-4 py-12">
        <div class="single-post-container">
          <div class="single-post-header-image">
            <img v-lazy="postImageUrl" :alt="postImageTitle">
          </div>
          <div class="single-post-info">
            <div class="single-post-title text-center">
              {{ postTitle }}
            </div>
            <div class="flex flex-row items-center justify-center mt-4">
              <div class="single-post-date text-center">
                {{ createdDate }}
              </div>
              <div class="mx-4 divider" />
              <div class="flex mr-4">
                <span class="text-sm">{{ $t('Share') }}:</span>
              </div>
              <social-sharing :url="currentPage" inline-template>
                <div>
                  <network network="facebook" class="cursor-pointer hover:text-highlight mr-4">
                    <font-awesome-icon class="hover:text-highlight sharing--icon" :icon="{ prefix: 'fab', iconName: 'facebook-f' }" />
                  </network>
                  <network network="pinterest" class="cursor-pointer hover:text-highlight mr-4">
                    <font-awesome-icon class="sharing--icon" :icon="{ prefix: 'fab', iconName: 'pinterest-p' }" />
                  </network>
                  <network network="weibo" class="cursor-pointer hover:text-highlight">
                    <font-awesome-icon class="sharing--icon" :icon="{ prefix: 'fab', iconName: 'weibo' }" />
                  </network>
                </div>
              </social-sharing>
            </div>
          </div>
          <div v-html="richTextHtml" class="single-post-content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '../components/hulii/Breadcrumbs'
import Entry from 'src/modules/blog/components/Entry'
import moment from 'moment'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import vueHeadful from 'vue-headful'
import NoSSR from 'vue-no-ssr'

export default {
  mixins: [Entry],
  components: {
    Breadcrumbs,
    vueHeadful,
    'no-ssr': NoSSR
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$props.title,
      meta: this.$route.meta.description ? [{vmid: 'description', description: this.$route.meta.description}] : []
    }
  },
  computed: {
    name () {
      return 'Seb Poole'
    },
    post () {
      const postContent = this.items.items ? this.items.items[0] : ''
      return postContent
    },
    currentPage () {
      let path = this.$route.fullPath
      return `https://hulii.com${path}`
    },
    metaTitle () {
      const postTitle = this.items.items ? this.items.items[0].fields.title : ''
      return `Hulii Blog - ${postTitle}`
    },
    postTitle () {
      const postTitle = this.items.items ? this.items.items[0].fields.title : ''
      return postTitle
    },
    postImageUrl () {
      const postImageUrl = this.items.items ? this.items.items[0].fields.mainImage.fields.file.url : ''
      return postImageUrl
    },
    postImageTitle () {
      const postImageTitle = this.items.items ? this.items.items[0].fields.mainImage.fields.file.title : ''
      return postImageTitle
    },
    createdDate () {
      const postDate = this.items.items ? moment(this.items.items[0].createdAt).format('DD/MM/YYYY') : ''
      return postDate
    },
    richTextHtml () {
      const bodyData = this.items.items ? this.items.items[0].fields.body : ''
      return documentToHtmlString(bodyData)
    }
  }
}
</script>
<style lang="scss">
#blog--post {
  padding-top: 20px;

 .single-post-container {
    margin-left: auto;
    margin-right: auto;
  }
  .single-post-header-image {
    @apply flex justify-center mb-4;
    img {
      max-width: 100%;
      max-height: 50vh;
      object-fit: contain;
      margin-top: auto;
      margin-bottom: auto;
    }
  }
  .single-post-info {
    padding: 1em;
  }
  .single-post-title {
    @apply justify-center;
    display: flex;
    font-weight: 700;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  .single-post-date {
    @apply text-center text-sm;
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
  .blog--post {
    .sharing--icon {
      width: 0.5625em;
    }
    .divider {
      @apply text-grey-light border-l border-grey-light border-solid;
      height: 1.625rem;
    }
  }
}
</style>
