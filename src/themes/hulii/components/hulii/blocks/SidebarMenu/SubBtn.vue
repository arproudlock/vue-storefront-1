<template>
  <button
    v-if="type === 'next'"
    class="sub--button inline-flex between-xs w-100 px25 py20 pr15 serif cl-accent"
    type="button"
    @click.stop="next()"
    :aria-label="$t('Show subcategories')"
    data-testid="categoryButton"
  >
    <div class="button--name flex">
      <img :src="getCategoryIcon(name)">
      <span>{{ name }}</span>
    </div>
    <i class="material-icons">keyboard_arrow_right</i>
  </button>
  <button
    v-else
    class="sub--button inline-flex p15 between-xs"
    type="button"
    @click.stop="back()"
    :aria-label="$t('Back')"
  >
    <i class="material-icons">keyboard_arrow_left</i>
  </button>
</template>
<script>
import { mapState } from 'vuex'
import config from 'config'
import CategoryData from 'theme/resource/category-data.json'

export default {
  name: 'SubBtn',
  props: {
    id: {
      type: null,
      default: ''
    },
    type: {
      type: String,
      default: 'next'
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      submenu: state => state.ui.submenu
    })
  },
  methods: {
    next () {
      if (config.entities.category.categoriesDynamicPrefetch) this.$store.dispatch('category/list', { parent: this.id })
      this.$store.commit('ui/setSubmenu', {
        id: this.id,
        depth: ++this.submenu.depth
      })
    },
    back () {
      this.$store.commit('ui/setSubmenu', {
        depth: --this.submenu.depth
      })
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
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-gray: color(gainsboro);
$color-black: color(matterhorn);

button {
  i {
    color: $color-gray;
    font-size: 28px;
    line-height: 24px;
  }
  &:hover,
  &:focus {
    i {
      color: $color-black;
    }
  }
  &.sub--button {
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

    .button--name {
      margin-right: 30px;
      img {
        width: 24px;
        height: 24px;
        margin-right: 16px;
      }
      span {
        @apply flex items-center;
      }
    }
  }
}
</style>
