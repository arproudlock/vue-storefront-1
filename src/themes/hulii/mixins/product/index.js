export default {
  data () {
    return {
      conditionOptions: null,
      qaListItems: []
    }
  },
  created () {
    // Sort the Conditions Order
    let opts = this.options.grade
    if (opts) {
      var conditions = ['Pristine', 'Excellent', 'Good', 'Fair', 'Poor']
      for (var p in opts) {
        let s = conditions.find(o => o === opts[p].label)
        opts[p].priority = conditions.indexOf(s) + 1
      }
      this.conditionOptions = opts.sort((a, b) => { return a.priority - b.priority })
    }
  },
  mounted () {
    // Divide QA List into 2 groups
    if (this.qaList) {
      this.chunk(JSON.parse(this.product.qa_list), Math.ceil(JSON.parse(this.product.qa_list).length / 2))
    }
  },
  computed: {
    specifications () {
      const spec = this.product.specifications ? JSON.parse(this.product.specifications) : {}
      return spec
    },
    inTheBox () {
      const content = this.product.product_contents ? JSON.parse(this.product.product_contents) : []
      return content
    },
    qaList () {
      const content = this.product.qa_list ? JSON.parse(this.product.qa_list) : []
      return content
    }
  },
  methods: {
    chunk: function (arr, size) {
      var newArr = []
      for (var i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size))
      }
      this.qaListItems = newArr
    },
    openConditionsExplanation () {
      this.$store.commit('ui/setConditionsExplanation', true)
    },
    getRating (starCount) {
      let num = Number(starCount) >> 0
      let decimal = Number(starCount) % 1
      let arr = []
      for (let val = 1; val <= num; val++) {
        arr.push(val)
      }
      if (decimal) {
        decimal = 0.5;
        arr.push(decimal)
      }
      return arr
    }
  }
}
