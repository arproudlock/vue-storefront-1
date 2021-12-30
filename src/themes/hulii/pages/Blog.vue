<template>
  <div id="blog" class="container">
    <breadcrumbs
      :routes="[{name: 'Home', route_link: '/'}]"
      active-route="Blog"
      class="blog--breadcrumbs"
    />
    <div class="blog--header">
      <h1>{{ $t('Blog') }}</h1>
    </div>
    <div class="blog--content">
      <div class="content--posts" v-if="entries.items">
        <div v-for="blogPost in entries.items" :key="blogPost.id" class="posts--post">
          <div class="post--wrapper">
            <router-link :to="localizedRoute('/blog/'+blogPost.fields.slug)">
              <div class="post--preview-image">
                <img v-lazy="blogPost.fields.mainImage.fields.file.url" :alt="blogPost.fields.mainImage.fields.file.title">
              </div>
            </router-link>
            <div class="post--information">
              <router-link :to="localizedRoute('/blog/'+blogPost.fields.slug)">
                <div class="post--title">
                  <h2>{{ blogPost.fields.title }}</h2>
                </div>
              </router-link>
              <div class="post--preview">
                {{ readMore(blogPost) }}
                <router-link :to="localizedRoute('/blog/'+blogPost.fields.slug)" class="text-hulii-turquoise font-bold">
                  {{ $t('Read More') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '../components/hulii/Breadcrumbs'
import Entries from 'src/modules/blog/components/Entries'

export default {
  mixins: [Entries],
  components: {
    Breadcrumbs
  },
  data () {
    return {
      activeComponent: null,
      id: null
    }
  },
  methods: {
    setContent (component, id) {
      this.activeComponent = component
      this.id = id
    },
    readMore (blogPost) {
      const wordsArray = []
      let result = ''
      if (blogPost) {
        blogPost.fields.body.content.map(b => {
          if (b.content[0]) {
            wordsArray.push(b.content[0].value)
          }
        })
        const filteredArray = wordsArray.filter(v => { return v !== '' })
        const snippet = filteredArray.join(' ').split(/\s+/).slice(0, 30).join(' ')
        const readMore = `...`
        result = snippet.concat(readMore)
      } else {
        result = ''
      }
      return result
    }
  }
}
</script>

<style lang="scss">
#blog {
  padding-top: 20px;
  grid-template-areas:
    "breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb"
    "header header header header header header header header header header header header"
    "blogPosts blogPosts blogPosts blogPosts blogPosts blogPosts blogPosts blogPosts blogPosts blogPosts blogPosts blogPosts";
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 16px;

  .blog--breadcrumbs {
    justify-self: flex-start;
    margin-bottom: 18px;
    grid-area: breadcrumb / breadcrumb / breadcrumb / breadcrumb;
    display: flex;
    box-sizing: border-box;
    position: relative;
  }
  .blog--header {
    grid-area: header;
    h1 {
      @apply text-hulii-purple;
      margin-top: 10px;
      margin-bottom: 10px;
      @text-hulii-purple;
    }
  }
  .blog--content {
    @apply pt-4 pb-16;
    grid-area: blogPosts;

    .content--posts {
      display:grid;
      grid-gap: 30px;

      .posts--post {
        display: grid;
        grid-template-columns:	1fr;

        .post--wrapper {
          @apply flex flex-col items-center;
          height: 100%;
          width: 100%;

          .post--preview-image {
            height: 10rem;

            img {
              @apply w-full;
              height: 100%;
              object-fit: cover;
              border-radius: 15px;
            }
          }
          .post--title {
            h2 {
              display: flex;
              text-align: left;
              font-size: 1.5rem;
              margin-bottom: 15px;
            }
          }
          .post--preview {
            padding: 8px 0px;
            word-break: normal;
          }
        }
      }
    }

    @screen md {
      .content--posts {
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      }
    }
  }
}

.post-preview-image {
  height: 10rem;
  margin-bottom: 16px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
.post-info-container {
  height: auto;
}
.post-title {
  @apply text-grey-dark;
  line-height: 30px;
  hyphens: none;
}
.post-preview {
  font-size: 14px;
  padding: 8px 0px;
  word-break: normal;
}
</style>
