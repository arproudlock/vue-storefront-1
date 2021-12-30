<template>
  <div
    class="dropdown-menu__container"
    @mouseleave="hoverParent(false)"
  >
    <div class="dropdown-menu__contents">
      <div
        :key="category.slug"
        v-for="category in visibleCategories"
        class="dropdown-menu__parent"
        @mouseover="hoverParent(true, category)"
      >
        <router-link
          :to="localizedRoute({ name: 'category', fullPath: category.url_path, params: { id: category.id, slug: category.slug }})"
          :class="'hover:text-' + getCategoryColor(category.name)"
        >
          <div
            class="parent--background"
            :class="'hover:bg-' + getCategoryColor(category.name) + ' bg-' + keepParentColor(category)"
          />
          <img :src="getCategoryIcon(category.name)">
          <h3
            class="parent--title"
            :class="'text-' + keepParentColor(category)"
          >
            {{ category.name }}
          </h3>
        </router-link>
      </div>
    </div>
    <div
      class="dropdown-menu__child"
      v-show="hover.show"
    >
      <div
        class="child--background bg-white"
        :class="[color]"
      />
      <router-link
        v-for="child in hover.data"
        :key="child.slug"
        :to="localizedRoute({ name: 'category', fullPath: child.url_path, params: { id: child.id, slug: child.slug }})"
        :class="'hover:text-' + hover.color"
      >
        <img :src="getCategoryIcon(child.name)">
        <h3
          class="child--title"
        >
          {{ child.name }}
        </h3>
      </router-link>
      <router-link
        :to="localizedRoute({ name: 'category', fullPath: hover.parent.url_path, params: { id: hover.parent.id, slug: hover.parent.slug }})"
        class="child--button"
      >
        <div class="btn">
          {{ $t('Shop All') }}
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import SidebarMenu from '@vue-storefront/core/compatibility/components/blocks/SidebarMenu/SidebarMenu'
import CategoryData from 'theme/resource/category-data.json'

export default {
  name: 'DropdownMenu',
  mixins: [SidebarMenu],
  data () {
    return {
      hover: {
        show: false,
        color: null,
        data: {},
        parent: {},
        parentId: null
      },
      color: 'bg-hulii-purple'
    }
  },
  computed: {
    visibleCategories () {
      return this.categories.filter(category => {
        return category.product_count > 0 || category.children_count > 0
      })
      // console.log(this.categories);
      // return this.categories;
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
  },
  methods: {
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
    },
    hoverParent (present, category) {
      this.hover.show = present
      if (category) {
        this.hover.data = category.children_data
        console.log(this.hover.data)
        this.hover.parent = category
        const id = category.name.toLowerCase().replace(/\s/g, '')
        const catData = CategoryData[id]
        this.hover.color = catData ? catData.color : 'hulii-purple'
        this.hover.parentId = id
        this.color = catData ? 'bg-' + catData.color : 'bg-hulii-purple'
      } else {
        this.color = 'bg-white'
        this.hover.parentId = 0
      }
    },
    keepParentColor (cat) {
      const bgColor = ''
      const catName = cat.name.toLowerCase().replace(/\s/g, '')
      if (catName === this.hover.parentId) {
        const catData = CategoryData[catName]
        return catData ? catData.color : 'hulii-purple'
      }
      return bgColor
    }
  }
}
</script>
<style lang="scss" scoped>
.dropdown-menu__container {
  top: 61px;
  position: absolute;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.13) 0px 7px 15px, rgba(0, 0, 0, 0.05) 0px 0px 3px;
  visibility: hidden;
  opacity: 0;
  transform: scale(0.9);
  background: rgb(255, 255, 255);
  border-radius: 5px;
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1) 0s;

  &.active {
    visibility: visible;
    opacity: 1;
    transform: scale(1);
    transition: all 0.2s cubic-bezier(0, 0, 0.2, 1) 0s;
  }

  .dropdown-menu__contents {
    @apply flex flex-col;

    .dropdown-menu__parent {
      color: #333;
      a {
        @apply flex flex-row items-center;
        position: relative;
        height: 48px;
        display: flex;
        align-items: center;
        font-size: 16px;
        padding: 0px 16px;
        transition: color 0.1s cubic-bezier(0, 0, 0.2, 1) 0s;

        .parent--background {
          position: absolute;
          height: 100%;
          width: 100%;
          opacity: 0.15;
          margin-left: -16px;
          transition: background 0.1s cubic-bezier(0, 0, 0.2, 1) 0s;
          border-radius: inherit;
        }

        .parent--title {
          font-size: 16px;
        }

        img {
          width: 24px;
          height: 24px;
          margin-right: 16px;
        }
      }
    }
  }
  .dropdown-menu__child {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    position: relative;
    min-width: 250px;

    .child--background {
      position: absolute;
      height: 100%;
      min-width: 250px;
      width: 100%;
      opacity: 0.15;
      border-radius: 0px 8px 8px 0px;
    }
    a {
      @apply flex flex-row items-center;
      position: relative;
      height: 48px;
      display: flex;
      align-items: center;
      font-size: 16px;
      padding: 0px 16px;
      transition: color 0.1s cubic-bezier(0, 0, 0.2, 1) 0s;

      .child--title {
        font-size: 16px;
      }

      img {
        width: 24px;
        height: 24px;
        margin-right: 16px;
      }
      &.child--button {
        @apply w-full mt-8;
        padding: 0;

        .btn {
          @apply bg-white w-full flex justify-center;
          margin: 0 20px;
          padding: 13px 0;
          font-family: 'HuliiSans', sans-serif;
          font-weight: 600;
          font-size: 13px;
          line-height: 1;
          text-transform: uppercase;
          border-radius: 5px;
          margin-bottom: 10px;
          box-shadow: inset 0 -3px 0 rgba(0, 0, 0, .15);
          transition: transform .1s ease-out;

          &:active {
            transform: scale(0.98);
            transition: transform .1s ease-out;
          }
        }
      }
    }
  }
}
</style>
