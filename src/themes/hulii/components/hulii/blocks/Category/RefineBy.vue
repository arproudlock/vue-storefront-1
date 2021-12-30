<template>
  <div class="refine">
    {{ link }}
    <router-link
      @click.native="next"
      :to="localizedRoute({ name: 'category', fullPath: link.url_path, params: { id: link.id, slug: link.slug }})"
    >
      {{ link.name }}
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'RefineBy',
  props: {
    link: {
      type: null,
      required: null,
      default: null
    },
    id: {
      type: null,
      default: ''
    }
  },
  methods: {
    next () {
      console.log('running this shit', this.id)
      this.$store.dispatch('category/list', { parent: this.id })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
