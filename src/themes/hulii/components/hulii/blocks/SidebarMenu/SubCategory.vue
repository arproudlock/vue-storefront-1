<template>
  <div>
    <ul
      v-if="children"
      class="sidebar-submenu absolute w-100 p0 bg-cl-primary"
      :style="styles"
    >
      <li
        v-if="parentSlug"
        class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary flex"
      >
        <router-link
          class="sub--button"
          :to="localizedRoute({ name: 'category', fullPath: parentPath, params: { id: id, slug: parentSlug }})"
          data-testid="categoryLink"
        >
          <span>{{ $t('View All') }}</span>
        </router-link>
      </li>
      <li
        class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary flex"
        :key="link.slug"
        v-for="link in children"
      >
        <div
          v-if="isCurrentMenuShowed"
          class="subcategory-item"
        >
          <sub-btn
            v-if="link.children_count > 0"
            class="bg-cl-transparent brdr-none fs-medium"
            :id="link.id"
            :name="link.name"
          />
          <router-link
            v-else
            class="sub--button"
            :to="localizedRoute({ name: 'category', fullPath: link.url_path, params: { id: link.id, slug: link.slug }})"
          >
            <img :src="getCategoryIcon(link.name)">
            <span>{{ link.name }}</span>
          </router-link>
        </div>
        <sub-category
          v-if="link.children_count > 0"
          :category-links="link.children_data"
          :id="link.id"
          :parent-slug="link.slug"
          :parent-path="link.url_path"
        />
      </li>
    </ul>
    <ul
      v-if="myAccountLinks && !path.length"
      class="sidebar-submenu my-acct--links absolute w-100 p0 bg-cl-primary"
      :style="styles"
    >
      <li
        class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary flex"
        :key="link.id"
        v-for="link in myAccountLinks"
        @click="notify(link.name)"
      >
        <router-link
          class="px25 py20 cl-accent no-underline col-xs"
          :to="localizedRoute(link.url)"
        >
          <span>{{ link.name }}</span>
        </router-link>
      </li>
      <li class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary flex">
        <a
          href="#"
          class="px25 py20 cl-accent no-underline col-xs"
          @click.prevent="logout"
        >
          {{ $t('Logout') }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SubBtn from './SubBtn.vue'
import CategoryData from 'theme/resource/category-data.json'
import i18n from '@vue-storefront/i18n'
import config from 'config'

export default {
  name: 'SubCategory',
  components: {
    SubBtn
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    categoryLinks: {
      type: null,
      required: false,
      default: false
    },
    parentSlug: {
      type: String,
      required: false,
      default: ''
    },
    parentPath: {
      type: String,
      required: false,
      default: ''
    },
    myAccountLinks: {
      type: null,
      required: false,
      default: false
    }
  },
  computed: {
    children () {
      if (!config.entities.category.categoriesDynamicPrefetch && (this.categoryLinks && this.categoryLinks.length > 0 && this.categoryLinks[0].name)) { // we're using dynamic prefetching and getting just category.children_data.id from 1.7
        return this.categoryLinks
      } else {
        return this.$store.state.category.list.filter(c => { return c.parent_id === this.id }) // return my child categories
      }
    },
    ...mapState({
      submenu: state => state.ui.submenu,
      path: state => state.ui.submenu.path
    }),
    getSubmenu () {
      return this.submenu
    },
    styles () {
      const pos = this.submenu.path.indexOf(this.id)
      return pos !== -1 ? {
        zIndex: pos + 1
      } : false
    },
    isCurrentMenuShowed () {
      return this.getSubmenu && this.getSubmenu.depth && this.getSubmenu.path[this.getSubmenu.depth - 1] === this.id
    }
  },
  methods: {
    logout () {
      this.$bus.$emit('user-before-logout')
      this.$router.push(this.localizedRoute('/'))
    },
    notify (title) {
      if (title === 'My loyalty card' || title === 'My product reviews') {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t('This feature is not implemented yet! Please take a look at https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!'),
          action1: { label: i18n.t('OK') }
        })
      }
    },
    getCategoryIcon (id) {
      id = id.toLowerCase().replace(/\s/g, '')
      const catData = CategoryData[id]
      const icon = catData ? catData.icon : 'https://ik.imagekit.io/yi7qlqdvr/hulii/web-assets/menu/smartphones.svg'
      return icon
    },
    getCategoryColor (id) {
      id = id.toLowerCase().replace(/\s/g, '')
      const catData = CategoryData[id]
      const color = catData ? catData.color : 'hulii-purple'
      return color
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-submenu {
    left: 0;
    top: 0;
    min-height: 100%;
    transform: translateX(-100%);

    &.my-acct--links {
      li {
        font-weight: 800;
        line-height: 12px;
        letter-spacing: .1em;
        text-transform: uppercase;
        font-size: 12px;
      }
    }
  }

  .subcategory-item {
    display: flex;
    width: 100%;
  }
  .sub--button {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    height: 48px;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 0px 16px;
    transition: color .1s cubic-bezier(0, 0, .2, 1) 0s;
    span {
      @apply flex items-center;
    }
    img {
      width: 24px;
      height: 24px;
      margin-right: 16px;
    }

  }

</style>
