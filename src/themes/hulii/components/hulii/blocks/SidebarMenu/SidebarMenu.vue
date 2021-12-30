<template>
  <div class="sidebar-menu fixed mw-100 bg-grey-lighter">
    <div class="brdr-bottom-1 brdr-cl-bg-secondary flex items-center">
      <div
        v-if="submenu.depth"
        class="col-xs bg-cl-primary"
      >
        <sub-btn type="back" class="bg-cl-transparent brdr-none" />
      </div>
      <div class="col-xs bg-cl-primary">
        <button
          type="button"
          :aria-label="$t('Close')"
          class="w-100 inline-flex end-xs bg-cl-transparent brdr-none p0 close-btn"
          @click="closeMenu"
        >
          <i class="material-icons p15">close</i>
        </button>
      </div>
    </div>
    <div class="sidebar-menu__container row">
      <div class="col-xs-12 h4 serif">
        <ul class="p0 m0 relative sidebar-menu__list" :style="mainListStyles">
          <li
            class="bg-cl-primary flex"
            :key="category.slug"
            @click="closeMenu"
            v-for="category in visibleCategories"
          >
            <div
              v-if="isCurrentMenuShowed"
              class="subcategory-item"
            >
              <sub-btn
                v-if="category.children_count > 0"
                class="bg-cl-transparent brdr-none fs-medium"
                :id="category.id"
                :name="category.name"
              />
              <router-link
                v-else
                class="px25 cl-accent no-underline col-xs"
                :to="localizedRoute({ name: 'category', fullPath: category.url_path, params: { id: category.id, slug: category.slug }})"
              >
                <h3>{{ category.name }}</h3>
              </router-link>
            </div>

            <sub-category
              :category-links="category.children_data"
              :id="category.id"
              :parent-slug="category.slug"
              :parent-path="category.url_path"
            />
          </li>
          <li
            v-if="compareIsActive && isCurrentMenuShowed"
            @click="closeMenu"
          >
            <router-link
              class="home--button"
              :to="localizedRoute('/compare')"
              exact
            >
              {{ $t('Compare products') }}
            </router-link>
          </li>
          <li
            class="flex pt-4"
          >
            <sub-btn
              v-if="currentUser"
              :name="$t('My Account')"
              class="home--button"
            />
            <sub-category
              v-if="currentUser"
              :my-account-links="myAccountLinks"
              :id="'foo'"
              @click.native="closeMenu"
            />
            <!-- <router-link
              v-if="!currentUser && isCurrentMenuShowed"
              @click.native="closeMenu"
              class="home--button"
              :to="localizedRoute('/register')"
              exact
            >
              {{ $t('My Account') }}
            </router-link> -->
          </li>
          <li
            v-if="isCurrentMenuShowed"
            @click="closeMenu"
          >
            <router-link
              class="home--button"
              :to="localizedRoute('/help-center/shipping-and-delivery')"
              exact
            >
              {{ $t('Help Center') }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import i18n from '@vue-storefront/i18n'
import SidebarMenu from '@vue-storefront/core/compatibility/components/blocks/SidebarMenu/SidebarMenu'
import SubBtn from 'theme/components/hulii/blocks/SidebarMenu/SubBtn'
import SubCategory from 'theme/components/hulii/blocks/SidebarMenu/SubCategory'
import CategoryData from 'theme/resource/category-data.json'

export default {
  components: {
    SubCategory,
    SubBtn
  },
  mixins: [SidebarMenu],
  data () {
    return {
      myAccountLinks: [
        {
          id: 1,
          name: i18n.t('Profile'),
          url: '/my-account'
        },
        {
          id: 2,
          name: i18n.t('Shipping details'),
          url: '/my-account/shipping-details'
        },
        {
          id: 3,
          name: i18n.t('Orders'),
          url: '/my-account/orders'
        },
        {
          id: 4,
          name: i18n.t('Favourites'),
          url: '/my-account/favourites'
        }
      ],
      componentLoaded: false
    }
  },
  computed: {
    mainListStyles () {
      return this.submenu.depth ? `transform: translateX(${this.submenu.depth * 100}%)` : false
    },
    ...mapState({
      submenu: state => state.ui.submenu,
      currentUser: state => state.user.current
    }),
    getSubmenu () {
      return this.submenu
    },
    visibleCategories () {
      // return this.categories;
      return this.categories.filter(category => {
        return category.product_count > 0 || category.children_count > 0
      })
    },
    isCurrentMenuShowed () {
      return !this.getSubmenu || !this.getSubmenu.depth
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
  },
  methods: {
    login () {
      if (!this.currentUser && this.isCurrentMenuShowed) {
        this.$nextTick(() => {
          this.$store.commit('ui/setAuthElem', 'login')
          this.$bus.$emit('modal-show', 'modal-signup')
          this.$router.push({ name: 'my-account' })
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
@import "~theme/css/animations/transitions";
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$bg-secondary: color(secondary, $colors-background);
$color-gainsboro: color(gainsboro);
$color-matterhorn: color(matterhorn);
$color-mine-shaft: color(mine-shaft);

.sidebar-menu {
  height: 100vh;
  overflow: hidden;
  min-width: 300px;

  &__container {
    height: calc(100% - 55px);
  }

  &__list {
    transition: transform $duration-main $motion-main;
  }

  ul {
    list-style-type: none;
  }

  li {
    a {
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
      h3 {
        font-size: 16px;
      }
    }
    .home--button {
      font-weight: 800;
      line-height: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-size: 12px;
      border: none;
      background: none;
    }
  }

  .subcategory-item {
    display: flex;
    width: 100%;
  }

  button {
    color: $color-mine-shaft;a {
      color: $color-mine-shaft;
    }
  }

  .close-btn {
    i {
      color: $color-gainsboro;
    }
    &:hover,
    &:focus {
      i {
        color: $color-matterhorn;
      }
    }
  }

}
</style>
<style lang="scss">
.home--button {
  img {
    display: none;
  }
}
</style>
