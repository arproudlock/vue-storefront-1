<template>
  <div
    v-show="isThankYouPage || !isCheckoutPage"
    class="header"
  >
    <header
      class="header-menu fixed w-full"
      :class="{ 'is-visible': menu.navVisible}"
    >
      <div
        class="h-full"
        :class="'bg-' + highlightColor"
      >
        <div class="container header-menu--bar">
          <div class="h-full items-center header-menu--icon--large"
               @mouseover="hoverMenu = true"
               @mouseout="hoverMenu = false"
          >
            <menu-icon
              class="pointer"
              :hover="hoverMenu"
            />
            <dropdown-menu
              :class="{active : hoverMenu }"
            />
          </div>
          <div class="h-full items-center header-menu--icon--small">
            <menu-icon
              class="pointer"
            />
          </div>
          <div class="header-menu--logo--large">
            <logo height="32px" width="auto" src="/assets/HULII_Logo_rgb_white.png" />
          </div>

          <div class="header-menu--logo--small">
            <logo height="20px" width="auto" src="/assets/HULII_Logo_rgb_white.png" />
          </div>
          <!-- <div style="color:white;margin-left: -20px; margin-right: 10px;font-size:30px">
            <b>-</b>
          </div> -->
          <!-- <div class="header-menu--logo--large">
            <logo height="32px" width="auto" src="/assets/tesltra-white2.png" />
          </div>

          <div class="header-menu--logo--small">
            <logo height="20px" width="auto" src="/assets/tesltra-white2.png" />
          </div> -->
          <!-- <span class="text-white menu-link w-30"> 3G Buyback</span> -->
          <div class="nav-container">
            <div class="w-full x-scroll" v-if="!menuHidden">
              <router-link :to="localizedRoute('/Mobile-Phones/Apple-Phones/')">
                <span class="text-white menu-link"> iPhone</span>
              </router-link>

              <router-link :to="localizedRoute('/Laptops/Apple-Macbook')">
                <span class="text-white menu-link"> MacBook</span>
              </router-link>

              <router-link :to="localizedRoute('/Mobile-Phones/Apple-Phones/Apple-iPhone-11')">
                <span class="text-white menu-link"> iPhone 11</span>
              </router-link>

              <router-link :to="localizedRoute('/Tablets/Apple-Tablets/')">
                <span class="text-white menu-link"> iPad</span>
              </router-link>

              <router-link :to="localizedRoute('/Mobile-Phones/Apple-Phones/Apple-iPhone-XR')">
                <span class="text-white menu-link"> iPhone XR</span>
              </router-link>

              <router-link :to="localizedRoute('/Wearables/Apple-Watches')">
                <span class="text-white menu-link"> Apple Watch</span>
              </router-link>

              <router-link :to="localizedRoute('/Mobile-Phones/Apple-Phones/Apple-iPhone-XS')">
                <span class="text-white menu-link"> iPhone XS</span>
              </router-link>

              <router-link :to="localizedRoute('/Mobile-Phones/Samsung-Phones/')">
                <span class="text-white menu-link"> Samsung Phones</span>
              </router-link>

              <router-link :to="localizedRoute('/Mobile-Phones/Other-Phones')">
                <span class="text-white menu-link"> Oppo Phones</span>
              </router-link>

              <router-link :to="localizedRoute('/Mobile-Phones/Apple-Phones/Apple-iPhone-X')">
                <span class="text-white menu-link"> iPhone X</span>
              </router-link>

              <router-link :to="localizedRoute('/Mobile-Phones/Apple-Phones/Apple-iPhone-8')">
                <span class="text-white menu-link"> iPhone 8</span>
              </router-link>

              <router-link :to="localizedRoute('/Tablets/')">
                <span class="text-white menu-link"> Tablets</span>
              </router-link>

              <!-- <search-header class="w-full header-menu--search--large" /> -->
              <!-- <search-header class="w-full" />
            </div>
            <div class="">
              <wishlist-icon class="p15 icon pointer" /> -->
            </div>
          </div>

          <div class="header--right-icons" v-if="!menuHidden">
            <div class="inline-flex right-icons">
              <!-- <wishlist-icon class="p15 icon hidden-xs pointer" />
              <compare-icon class="p15 icon hidden-xs pointer" /> -->
              <search-icon class="pointer header-menu--search--large" />
              <search-icon class="pointer header-menu--search--small" />
              <microcart-icon class="pointer header-menu--microcart" />
              <!-- <account-icon class="pointer header-menu--account" /> -->
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="header-placeholder" />
    <header class="header-menu w-full" :class="{ 'is-visible': menu.navVisible}" v-if="!menuHidden">
      <div class="h-full trust-pink items-center header-menu--bar justify-center">
        <span class="text-white trust-title">Shop with confidence</span>
        <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 22.6667C20.6492 19.54 20.3322 13.3189 20.3322 13.3189V4.09971C14.5771 3.86168 11 1.33333 11 1.33333C11 1.33333 7.42983 3.86168 1.66789 4.09971V13.3189C1.66789 13.3189 1.35085 19.5464 11 22.6667Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M6.33322 11.1551L9.62311 14.2592L14.8845 8.30263" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
        </svg>
        <span class="text-white badge-text"> 12 Months Warranty</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5595 19.3879V19.3879C18.6398 19.3879 21.9475 16.0802 21.9475 12V12C21.9475 7.91972 18.6398 4.61201 14.5595 4.61201H11.9737" stroke="white" stroke-width="1.5" />
          <path d="M14.2163 1.99997L11.6043 4.61201L14.2163 7.22406" stroke="white" stroke-width="1.5" />
          <path d="M9.38791 4.61204V4.61204C5.30765 4.61204 1.99994 7.91974 1.99994 12V12C1.99994 16.0803 5.30765 19.388 9.38791 19.388L11.9737 19.388" stroke="white" stroke-width="1.5" />
          <path d="M9.73127 22L12.3433 19.388L9.73127 16.7759" stroke="white" stroke-width="1.5" />
        </svg>
        <span class="text-white badge-text"> 30 Day Free Returns</span>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12.937" cy="12" r="9.75" stroke="white" stroke-width="1.5" />
          <path d="M12.187 6.89999V12.4385L16.687 15.9" stroke="white" stroke-width="1.5" />
        </svg>
        <span class="text-white badge-text"> Free Shipping</span>
        <!-- <trustpilot-micro-star /> -->
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CurrentPage from 'theme/mixins/currentPage'
import AccountIcon from 'theme/components/hulii/blocks/Header/AccountIcon'
import CompareIcon from 'theme/components/core/blocks/Header/CompareIcon'
import MenuIcon from 'theme/components/hulii/blocks/Header/MenuIcon'
import Logo from 'theme/components/hulii/Logo'
import SearchHeader from 'theme/components/hulii/blocks/Search/SearchHeader'
import SearchIcon from 'theme/components/hulii/blocks/Header/SearchIcon'
import MicrocartIcon from 'theme/components/hulii/blocks/Header/MicrocartIcon'
import WishlistIcon from 'theme/components/core/blocks/Header/WishlistIcon'
import DropdownMenu from 'theme/components/hulii/blocks/DropdownMenu/DropdownMenu'
import TrustpilotMicroScore from 'theme/components/hulii/blocks/Trustpilot/TrustpilotMicroScore'

export default {
  name: 'Header',
  components: {
    // AccountIcon,
    // CompareIcon,
    MenuIcon,
    Logo,
    MicrocartIcon,
    // WishlistIcon,
    // SearchHeader,
    DropdownMenu,
    SearchIcon,
    // TrustpilotMicroScore
  },
  mixins: [CurrentPage],
  data () {
    return {
      menu: {
        navVisible: true
      },
      isScrolling: false,
      scrollTop: 0,
      lastScrollTop: 0,
      navbarHeight: 61,
      hoverMenu: false,
      menuHidden: false
    }
  },
  computed: {
    ...mapState({
      isOpenLogin: state => state.ui.signUp,
      currentUser: state => state.user.current,
      highlightColor: state => state.ui.highlightColor
    }),
    isThankYouPage () {
      return this.$store.state.checkout.isThankYouPage ? this.$store.state.checkout.isThankYouPage : false
    }
  },
  beforeMount () {
    window.addEventListener('scroll', () => {
      this.isScrolling = true
    }, {passive: true})

    setInterval(() => {
      if (this.isScrolling) {
        this.hasScrolled()
        this.isScrolling = false
      }
    }, 250)
  },
  methods: {
    gotoAccount () {
      this.$bus.$emit('modal-toggle', 'modal-signup')
    },
    hasScrolled () {
      this.scrollTop = window.scrollY
      if (this.scrollTop > this.lastScrollTop && this.scrollTop > this.navbarHeight) {
        this.menu.navVisible = false
      } else {
        this.menu.navVisible = true
      }
      this.lastScrollTop = this.scrollTop
    },
    toggleDropdownMenu () {
      console.log('this is toggling')
    },
    hideMenu () {
      this.menuHidden = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

header {
  height: 61px;
  top: -62px;
  z-index: 2;
  transition: top 0.2s ease-in-out;
  &.is-visible {
    top: 0;
  }
  &.header-menu {
    @apply bg-hulii-purple;

    .header-menu--bar {
      @apply flex;
      @apply items-center;
      @apply h-full;
      @apply relative;

      .header-menu--logo--large {
        @apply hidden;
        margin-right: 20px;

        @screen lg {
          display:flex;
          margin-right: 40px;
          justify-content: flex-end;
        }
      }

      .header-menu--search--large {
        @apply hidden;

        @screen lg {
          display: flex;
          justify-content: flex-end;
          padding: 0px 0px 5px;
        }
      }

      .header-menu--search--small {
        @apply flex;
        padding: 0px 0px 5px;
        margin-right: 10px;

        @screen lg {
          display: none;
        }
      }

      .header-menu--logo--small {
        @apply flex;
        margin-right: 20px;

        @screen lg {
          display:none;
          // margin-right: 40px;
        }
      }

      .header-menu--icon--large {
        @apply hidden;
        @screen lg {
          // @apply justify-center;
          display: flex;
          // width: 50px
        }
      }
      .header-menu--icon--small {
        @apply flex;
        width: 50px;
        @screen lg {
          display: none;
        }
      }
      .header--right-icons {
        display: flex;
        margin-left: 30px;
      }
      .right-icons {
        .header-menu--microcart, .header-menu--account {
          @screen md {
            width: 50px;
          }
        }
        .header-menu--microcart {
          @apply justify-end;
        }
        .header-menu--account {
          @apply justify-center;
          display: none;

          @screen lg {
            display: flex;
          }
        }
      }
    }
    .header-checkout--bar {
      @apply flex;
      @apply items-center;
      @apply h-full;
      @apply relative;
      @apply items-center;
      padding: 0 30px;

      .header-menu--logo {
        margin-right: 20px;

        @screen lg {
          margin-right: 40px;
        }
      }
      .checkout--steps {
        @apply text-grey;
      @apply flex;
      @apply flex-row;
        li {
          vertical-align: top;
          zoom: 1;
          margin-right: 26px;
          list-style: none;
          font-size: 13px;
        }
      }
    }
  }

  @screen md {
    .header--right-icons {
      margin-left: 0 !important;
    }
  }
  @screen lg {
  }
}
.icon {
  opacity: 0.6;
  &:hover,
  &:focus {
    background-color: $color-icon-hover;
    opacity: 1;
  }
}
.header-placeholder {
  height: 61px;
}
.links {
  text-decoration: underline;
}
@media (max-width: 767px) {
  .row.middle-xs {
    margin: 0 -15px;

    &.py5 {
      margin: 0;
    }
  }
  .col-xs-2:first-of-type {
      padding-left: 0;
  }
  .col-xs-2:last-of-type {
      padding-right: 0;
  }
  a, span {
    font-size: 12px;
  }
}
.header-menu--account {
  margin-left: 20px;
}

.trust-pink {
  background: #ED6EA1;
}

.trust-title {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 12px;

  @screen md{
    font-size: 16px;
    margin-right: 20px;
    margin-left: 0px;
  }
}

.badge-text {
  margin-left: 5px;
  margin-right: 10px;
  font-size: 12px;

  @screen md{
    font-size: 16px;
    margin-left: 5px;
    margin-right: 20px;
  }
}

.menu-link {
  @apply hidden;

  @screen md {
    margin-left: 10px;
    display: inline-block;
  }

}

.nav-container {
  overflow: hidden;
  white-space: nowrap;
  flex: 1;
  margin-right: 40px;
}

.x-scroll {
  display: flex;
  align-items: center;
  overflow-x: scroll;
  padding-bottom: 1.2rem;
  padding-top: 1.2rem;
  box-sizing: border-box;

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
