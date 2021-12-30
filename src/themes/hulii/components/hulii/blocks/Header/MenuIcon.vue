<template>
  <div class="menu-icon--container flex">
    <div
      class="menu-icon large--icon"
      :class=""
    >
      <!-- <svg class="sc-1i55vv7-0 ceYqom" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="ball sc-1i55vv7-1 ipfNPM" d="M7.58594 7.21875C7.2207 7.69336 6.64648 8 6 8C5.54883 8 5.13281 7.85156 4.79688 7.59961C4.3125 7.23438 4 6.6543 4 6C4 4.89453 4.89453 4 6 4C7.10547 4 8 4.89453 8 6C8 6.45898 7.8457 6.88281 7.58594 7.21875Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M13.5859 7.21875C13.2207 7.69336 12.6465 8 12 8C11.5488 8 11.1328 7.85156 10.7969 7.59961C10.3125 7.23438 10 6.6543 10 6C10 4.89453 10.8945 4 12 4C13.1055 4 14 4.89453 14 6C14 6.45898 13.8457 6.88281 13.5859 7.21875Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M19.5859 7.21875C19.2207 7.69336 18.6465 8 18 8C17.5488 8 17.1328 7.85156 16.7969 7.59961C16.3125 7.23438 16 6.6543 16 6C16 4.89453 16.8945 4 18 4C19.1055 4 20 4.89453 20 6C20 6.45898 19.8457 6.88281 19.5859 7.21875Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M8 12C8 13.1055 7.10547 14 6 14C4.89453 14 4 13.1055 4 12C4 10.8945 4.89453 10 6 10C6.64062 10 7.21094 10.3008 7.57617 10.7695C7.8418 11.1094 8 11.5352 8 12Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M14 12C14 13.1055 13.1055 14 12 14C10.8945 14 10 13.1055 10 12C10 10.8945 10.8945 10 12 10C12.6406 10 13.2109 10.3008 13.5762 10.7695C13.8418 11.1094 14 11.5352 14 12Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M20 12C20 13.1055 19.1055 14 18 14C16.8945 14 16 13.1055 16 12C16 10.8945 16.8945 10 18 10C18.6406 10 19.2109 10.3008 19.5762 10.7695C19.8418 11.1094 20 11.5352 20 12Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M7.70117 19.0527C7.89062 18.748 8 18.3867 8 18C8 16.8945 7.10547 16 6 16C4.89453 16 4 16.8945 4 18C4 19.1055 4.89453 20 6 20C6.71875 20 7.34961 19.6211 7.70117 19.0527Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M13.7012 19.0527C13.8906 18.748 14 18.3867 14 18C14 16.8945 13.1055 16 12 16C10.8945 16 10 16.8945 10 18C10 19.1055 10.8945 20 12 20C12.7188 20 13.3496 19.6211 13.7012 19.0527Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M19.7012 19.0527C19.8906 18.748 20 18.3867 20 18C20 16.8945 19.1055 16 18 16C16.8945 16 16 16.8945 16 18C16 19.1055 16.8945 20 18 20C18.7188 20 19.3496 19.6211 19.7012 19.0527Z" fill="#333333" stroke="none" stroke-width="1px" /></svg> -->
      <!-- <h3 class="menu-title">
        {{ $t('Categories') }}
      </h3> -->
      <svg class="sc-1i55vv7-0 ceYqom" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4,18 L20,18 C20.55,18 21,17.55 21,17 C21,16.45 20.55,16 20,16 L4,16 C3.45,16 3,16.45 3,17 C3,17.55 3.45,18 4,18 Z M4,13 L20,13 C20.55,13 21,12.55 21,12 C21,11.45 20.55,11 20,11 L4,11 C3.45,11 3,11.45 3,12 C3,12.55 3.45,13 4,13 Z M3,7 C3,7.55 3.45,8 4,8 L20,8 C20.55,8 21,7.55 21,7 C21,6.45 20.55,6 20,6 L4,6 C3.45,6 3,6.45 3,7 Z" id="🔹-Icon-Color" fill="#ffffff" />
      </svg>
    </div>
    <div
      class="menu-icon small--icon"
      :class="{'iconHover' : hover }"
      @click="openSidebarMenu"
    >
      <svg class="sc-1i55vv7-0 ceYqom" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- <path class="ball sc-1i55vv7-1 ipfNPM" d="M7.58594 7.21875C7.2207 7.69336 6.64648 8 6 8C5.54883 8 5.13281 7.85156 4.79688 7.59961C4.3125 7.23438 4 6.6543 4 6C4 4.89453 4.89453 4 6 4C7.10547 4 8 4.89453 8 6C8 6.45898 7.8457 6.88281 7.58594 7.21875Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M13.5859 7.21875C13.2207 7.69336 12.6465 8 12 8C11.5488 8 11.1328 7.85156 10.7969 7.59961C10.3125 7.23438 10 6.6543 10 6C10 4.89453 10.8945 4 12 4C13.1055 4 14 4.89453 14 6C14 6.45898 13.8457 6.88281 13.5859 7.21875Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M19.5859 7.21875C19.2207 7.69336 18.6465 8 18 8C17.5488 8 17.1328 7.85156 16.7969 7.59961C16.3125 7.23438 16 6.6543 16 6C16 4.89453 16.8945 4 18 4C19.1055 4 20 4.89453 20 6C20 6.45898 19.8457 6.88281 19.5859 7.21875Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M8 12C8 13.1055 7.10547 14 6 14C4.89453 14 4 13.1055 4 12C4 10.8945 4.89453 10 6 10C6.64062 10 7.21094 10.3008 7.57617 10.7695C7.8418 11.1094 8 11.5352 8 12Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M14 12C14 13.1055 13.1055 14 12 14C10.8945 14 10 13.1055 10 12C10 10.8945 10.8945 10 12 10C12.6406 10 13.2109 10.3008 13.5762 10.7695C13.8418 11.1094 14 11.5352 14 12Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M20 12C20 13.1055 19.1055 14 18 14C16.8945 14 16 13.1055 16 12C16 10.8945 16.8945 10 18 10C18.6406 10 19.2109 10.3008 19.5762 10.7695C19.8418 11.1094 20 11.5352 20 12Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M7.70117 19.0527C7.89062 18.748 8 18.3867 8 18C8 16.8945 7.10547 16 6 16C4.89453 16 4 16.8945 4 18C4 19.1055 4.89453 20 6 20C6.71875 20 7.34961 19.6211 7.70117 19.0527Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M13.7012 19.0527C13.8906 18.748 14 18.3867 14 18C14 16.8945 13.1055 16 12 16C10.8945 16 10 16.8945 10 18C10 19.1055 10.8945 20 12 20C12.7188 20 13.3496 19.6211 13.7012 19.0527Z" fill="#333333" stroke="none" stroke-width="1px" /><path class="ball sc-1i55vv7-1 ipfNPM" d="M19.7012 19.0527C19.8906 18.748 20 18.3867 20 18C20 16.8945 19.1055 16 18 16C16.8945 16 16 16.8945 16 18C16 19.1055 16.8945 20 18 20C18.7188 20 19.3496 19.6211 19.7012 19.0527Z" fill="#333333" stroke="none" stroke-width="1px" /> -->
        <path d="M4,18 L20,18 C20.55,18 21,17.55 21,17 C21,16.45 20.55,16 20,16 L4,16 C3.45,16 3,16.45 3,17 C3,17.55 3.45,18 4,18 Z M4,13 L20,13 C20.55,13 21,12.55 21,12 C21,11.45 20.55,11 20,11 L4,11 C3.45,11 3,11.45 3,12 C3,12.55 3.45,13 4,13 Z M3,7 C3,7.55 3.45,8 4,8 L20,8 C20.55,8 21,7.55 21,7 C21,6.45 20.55,6 20,6 L4,6 C3.45,6 3,6.45 3,7 Z" id="🔹-Icon-Color" fill="#ffffff" />
      </svg>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'MenuIcon',
  props: {
    hover: {
      type: Boolean,
      default: false
    }
  },
  computed: mapState({
    isOpen: state => state.ui.sidebar
  }),
  methods: {
    openSidebarMenu () {
      this.$store.commit('ui/setSidebar', !this.isOpen)
    }
  }
}
</script>
<style lang="scss" scoped>
  .menu-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: #fff;
    border-radius: 5px;
    padding: 8px 15px;
    margin-right: 20px;
    cursor: pointer;

    &.large--icon {
      display: none;
      background: none;

      @screen lg {
        display: flex
      }
    }
    &.small--icon {
      display: flex;
      background: none;
      padding: 4px 15px;
      margin-right: 10px;

      @screen lg {
        display: none;
      }
    }

    &.iconHover {
      svg {
        path {
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), all 0.2s ease-out;
          transform: scale(1.25);
          &:nth-of-type(1) {
            fill: #f6af26;
          }
          &:nth-of-type(2) {
            fill: #f172a3;
          }
          &:nth-of-type(3) {
            fill: #18b9a1;
          }
          &:nth-of-type(4) {
            fill: #f68932;
          }
          &:nth-of-type(5) {
            fill: #ee3864;
          }
          &:nth-of-type(6) {
            fill: #004d46;
          }
          &:nth-of-type(7) {
            fill: #127c8e;
          }
          &:nth-of-type(8) {
            fill: rgb(83, 54, 195);
          }
          &:nth-of-type(9) {
            fill: #342b70;
          }
        }
      }
    }
    svg {
      height: 24px;
      width: 24px;

      .ipfNPM {
        transform-origin: center center;
        transform: scale(1);
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), all 0.2s ease-out;
      }
    }

    @screen lg {
      &.large--icon {
        display: flex;
      }
      &.small--icon {
        display: none;
      }
    }
  }
  .menu-title {
    margin: 0px 4px 0px 8px;
    font-size: 16px;
    display: none;

    @screen lg {
      display: flex;
    }
  }
</style>
