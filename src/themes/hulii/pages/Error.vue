<template>
  <div id="page_not_found">
    <section class="container error--container">
      <div class="error-breadcrumbs">
        <breadcrumbs
          :routes="[{name: 'Home', route_link: '/'}]"
          active-route="500"
        />
      </div>
      <div class="error--content">
        <div class="error--title">
          <h1>
            {{ $t("There's definitely something wrong here.") }}
          </h1>
        </div>
        <div class="error--subtitle">
          <p>
            {{ $t("This direction won’t help you or the environment. Best turn back and try another route.") }}
          </p>
        </div>
        <router-link
          :to="localizedRoute('/')"
          class="error--button"
        >
          {{ $t('Make The Planet Great Again') }}
        </router-link>
        <div class="error--description">
          <p>{{ $t('Error 500') }}</p>
        </div>
      </div>
      <div class="error--image">
        <img src="https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/404/404.svg" alt="Whoops! Wrong Destination.">
      </div>
    </section>
  </div>
</template>

<script>
import PageNotFound from '@vue-storefront/core/pages/PageNotFound'
import ProductTile from '../components/core/ProductTile.vue'
import Breadcrumbs from '../components/hulii/Breadcrumbs.vue'

export default {
  name: 'PageNotFound',
  computed: {
    ourBestsellersCollection () {
      return this.$store.state.homepage.bestsellers
    }
  },
  components: {
    ProductTile,
    Breadcrumbs
  },
  methods: {
    toggleSearchpanel () {
      this.$store.commit('ui/setSearchpanel', true)
    }
  },
  mixins: [PageNotFound]
}
</script>

<style lang="scss" scoped>
.error--container {
  display: grid;
  padding-top: 20px;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 16px;
  grid-template-areas:
      "breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb"
      "image image image image image image image image image image image image"
      "content content content content content content content content content content content content";

  @screen md {
    grid-template-areas:
      "breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb breadcrumb"
      "content content content content content content . . . image image image";
    margin-bottom: 50px;
  }

  .error-breadcrumbs {
    grid-area: breadcrumb;
  }
  .error--content {
    @apply flex flex-col justify-center;
    margin-top: 50px;
    grid-area: content;

    .error--title {
      h1 {
        @apply text-hulii-orange;
        font-weight: bold;
        margin-top: 0;
        line-height: 75px;
        font-size: 60px;
        margin-bottom: 10px;
        user-select: none;
      }
    }
    .error--subtitle {
      p {
        font-weight: 600;
        margin-bottom: 30px;
        user-select: none;
      }
    }
    .error--button {
      @apply bg-hulii-orange text-white cursor-pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border-width: 1px;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1;
      text-transform: uppercase;
      border-radius: 5px;
      box-shadow: inset 0 -3px 0 rgba(0, 0, 0, .15);
      transition: transform .1s ease-out;
      max-width: 250px;
      min-height: 48px;
      padding: 0 20px;
      margin-bottom: 30px;
      user-select: none;
      text-decoration: none;

      &:hover {
        box-shadow: inset 0 -100px 0 rgba(0,0,0,0.15);
      }

      &:active {
        box-shadow: inset 0 -100px 0 rgba(0,0,0,0.2);
        transform: scale(0.98);
        transition: transform .1s ease-out;
      }
    }
    .error--description {
      p {
        @text-hulii-orange;
        font-weight: 600;
        letter-spacing: .1em;
        text-transform: uppercase;
        user-select: none;
      }
    }
  }
  .error--image {
    @apply flex justify-center;
    grid-area: image;
    img {
      @apply w-full;
    }
  }
}
  a {
    text-decoration: underline;
  }
</style>
