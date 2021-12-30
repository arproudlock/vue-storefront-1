<template>
  <transition :name="direction === 'bottom' ? 'slide-up' : direction === 'left' ? 'slide-right' : null ">
    <div
      class="mw-100 fixed bg-white overflow-auto"
      :class="direction === 'left' ? 'left-sidebar' : direction === 'bottom' ? 'bottom-drawer' : null "
      data-testid="sidebar"
      v-if="isOpen"
    >
      <component :is="component" @close="$emit('close')" @reload="getComponent" />
    </div>
  </transition>
</template>

<script>
import LoadingSpinner from 'theme/components/theme/blocks/AsyncSidebar/LoadingSpinner.vue'
import LoadingError from 'theme/components/theme/blocks/AsyncSidebar/LoadingError.vue'

export default {
  props: {
    asyncComponent: {
      type: Function,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    /** "right" or "left"  */
    direction: {
      type: String,
      default: 'bottom'
    }
  },
  data () {
    return {
      component: null
    }
  },
  created () {
    this.getComponent()
  },
  methods: {
    getComponent () {
      this.component = () => ({
        component: this.asyncComponent(),
        loading: LoadingSpinner,
        error: LoadingError,
        timeout: 3000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~theme/css/animations/transitions";

  .slide-up-enter-active,
  .slide-up-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: width 0s linear 0s,transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),-webkit-transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .slide-up-enter,
  .slide-up-leave-to {
    transform: translateY(100%);
  }

  .slide-right-enter,
  .slide-right-leave-to {
    transform: translateY(-100%);
  }

  .bottom-drawer {
    bottom: 0;
    left: 0;
    z-index: 3;
    max-height: calc(100vh - 110px);
    border-radius: 30px 30px 0 0;
    width: 100%;
    min-width: 320px;
  }

  .left-sidebar{
    height: 100vh;
    width: 350px;
    top: 0;
    left: 0;
    overflow: hidden;
    overflow-y: auto;
    z-index: 3;

    @media (max-width: 767px) {
      width: 100vh;
    }
  }

  .close {
    i {
      opacity: 0.6;
    }
    &:hover,
    &:focus {
      i {
        opacity: 1;
      }
    }
  }

  .overflow-auto {
    overflow: auto;
  }
</style>
