import { mapGetters } from 'vuex'
import CategoryData from 'theme/resource/category-data.json'

export default {
  data () {
    return {
      categories: [
        {id: '7', color: 'hulii-orange'}
      ],
      pages: [
        {'name': 'Home', 'color': 'hulii-purple'}
      ]
    }
  },
  watch: {
    '$route.name': function () {
      this.setHighlightColor()
    }
  },
  computed: {
    ...mapGetters('category', ['getCurrentCategory']),
    categoryPath () {
      return this.getCurrentCategory !== '' ? this.getCurrentCategory.name : ''
    }
  },
  beforeMount () {
    this.setHighlightColor()
  },
  methods: {
    setHighlightColor () {
      // Set if Product or Category Page
      const isProductPage = !!this.$route.params.parentSku
      const isCategoryPage = this.$route.name.indexOf('urldispatcher') > -1

      if (isProductPage || isCategoryPage) {
        const catSub = this.categoryPath ? this.categoryPath.toLowerCase().replace(/\s/g, '') : ''

        const color = CategoryData[catSub] ? CategoryData[catSub].color : ''
        if (color === undefined || color.length === 0) {
          this.$store.commit('ui/setHighlightColour', 'hulii-purple')
        } else {
          this.$store.commit('ui/setHighlightColour', color)
        }
      } else {
        this.$store.commit('ui/setHighlightColour', 'hulii-purple')
      }
    }
  }
}
