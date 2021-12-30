<template>
  <div class="relative dropdown--icon cursor-pointer sm:flex"
       data-testid="accountButton"
  >
    <button
      type="button"
      style="padding: 2px 0px"
      class="bg-transparent border-0 p-0 flex"
      :aria-label="$t('Open my account')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.61 26.04"><path d="M14.75.22A7.41,7.41,0,0,1,20.11,8a7.31,7.31,0,0,1-14.52.39A7.3,7.3,0,0,1,11.41.1,9.4,9.4,0,0,1,14.75.22Zm3.54,7.09a5.49,5.49,0,1,0-5.51,5.46A5.45,5.45,0,0,0,18.29,7.31Z" style="fill:#fff" /><path d="M25.61,25a1,1,0,0,1-.53,1,.8.8,0,0,1-1-.14,2.82,2.82,0,0,1-.43-.58,12.75,12.75,0,0,0-21.78,0,2.53,2.53,0,0,1-.18.27c-.33.49-.76.7-1.29.36a.87.87,0,0,1-.25-1.32,14.6,14.6,0,0,1,25.08-.26C25.42,24.54,25.62,24.78,25.61,25Z" style="fill:#fff" /></svg>
    </button>
    <ul v-if="currentUser" class="dropdown-content">
      <li v-for="(page, index) in navigationLoggedIn" :key="index" @click="notify(page.title)">
        <router-link
          class="dropdown-item-link"
          :class="'text-' + page.color"
          :to="localizedRoute(page.link)"
          exact
        >
          {{ page.title }}
        </router-link>
      </li>
      <li>
        <a href="#" class="dropdown-item-link" @click.prevent="logout">
          {{ $t('Sign Out') }}
        </a>
      </li>
    </ul>
    <ul v-if="!currentUser" class="dropdown-content">
      <li class="content--sign-in">
        <router-link
          :to="{name: 'Register', params: { signIn: true }}"
        >
          <div
            class="btn bg-hulii-purple"
          >
            {{ $t('Log In') }}
          </div>
        </router-link>
      </li>
      <li class="content--create-account">
        <router-link
          :to="{name: 'Register', params: { signIn: false }}"
          class="text-hulii-purple"
        >
          <div
            class="btn"
          >
            {{ $t('Sign Up') }}
          </div>
        </router-link>
      </li>
      <li v-for="(page, index) in navigationLoggedOut" :key="index" @click="notify(page.title)">
        <router-link
          class="dropdown-item-link"
          :class="'text-' + page.color"
          :to="localizedRoute(page.link)"
        >
          {{ page.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import AccountIcon from '@vue-storefront/core/compatibility/components/blocks/Header/AccountIcon'
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton'
import OutlineButton from 'theme/components/hulii/blocks/Buttons/OutlineButton'
import { mapState } from 'vuex'

export default {
  props: {
    whiteText: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  components: {
    FullButton,
    OutlineButton
  },
  mixins: [AccountIcon],
  data () {
    return {
      navigationLoggedIn: [
        { title: this.$t('My Profile'), link: '/my-account', color: 'hulii-orange' },
        { title: this.$t('My Orders'), link: '/my-account/orders', color: 'hulii-green' },
        { title: this.$t('Favourites'), link: '/my-account/favourites', color: 'hulii-pink' },
        { title: this.$t('Help & Contact'), link: '/help-center/contact-us', color: 'hulii-hot-pink' }
      ],
      navigationLoggedOut: [
      ]
    }
  },
  methods: {
    notify (title) {
      if (title === 'My loyalty card' || title === 'My product reviews') {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: this.$t('This feature is not implemented yet! Please take a look at https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!'),
          action1: { label: this.$t('OK') }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

.dropdown--icon {

  svg {
    width: 25px;
    fill: #fff;
  }

  button {
    pointer-events: none;
  }

  .dropdown-content {
    @apply p-0 absolute list-reset;
    margin-top: 3px;
    background: #fff;
    min-width: 200px;
    z-index: 9999;
    visibility: hidden;
    opacity: 0;
    transition: all 0.25s;
    top: 100%;
    box-shadow: rgba(0, 0, 0, 0.13) 0px 7px 15px, rgba(0, 0, 0, 0.05) 0px 0px 3px;
    transform: scale(0.9);
    max-height: 525px;
    border-radius: 5px;
    transition: all 0.2s cubic-bezier(0.4, 0, 1, 1) 0s;
    right: -5px;

    &:before {
      @apply block border-solid;
      content: "";
      display: block;
      position: absolute;
      bottom: 100%;
      right: 15px;
      border-width: 8px;
      border-color: transparent transparent config('colors.grey-light') transparent;
    }

    .content--sign-in {
      @apply px-3 pt-2 pb-1;
      .btn {
        @apply flex justify-center items-center text-white border-hulii-purple border;
        font-family: 'HuliiSans',sans-serif;
        font-weight: 600;
        font-size: 1rem;
        line-height: 1;
        text-transform: uppercase;
        border-radius: 5px;
        padding: 0;
        box-shadow: inset 0 -3px 0 rgba(0,0,0,0.15);
        transition: transform .1s ease-out;
        min-width: 250px;
        min-height: 48px;

        &:hover {
          box-shadow: inset 0 -100px 0 rgba(0,0,0,0.15);
        }

        &:active {
          box-shadow: inset 0 -100px 0 rgba(0,0,0,0.2);
          transform: scale(0.98);
          transition: transform .1s ease-out;
        }

        a {
          @apply flex justify-center items-center text-white;
        }
      }
    }

    .content--create-account {
      @apply px-3 pt-1 mb-4 border-none;
      .btn {
        @apply flex justify-center items-center cursor-pointer border-hulii-purple;
        font-family: 'HuliiSans',sans-serif;
        font-weight: 600;
        font-size: 1rem;
        line-height: 1;
        text-transform: uppercase;
        border-radius: 5px;
        padding: 0;
        margin-bottom: 10px;
        box-shadow: inset 0 -3px 0 rgba(0,0,0,0.15);
        transition: transform .1s ease-out;
        border-width: 2px;
        border-style: solid;
        min-width: 250px;
        min-height: 48px;

        &:hover {
          box-shadow: inset 0 -100px 0 rgba(0,0,0,0.15);
        }

        &:active {
          box-shadow: inset 0 -100px 0 rgba(0,0,0,0.2);
          transform: scale(0.98);
          transition: transform .1s ease-out;
        }

        a {
          @apply flex justify-center items-center text-hulii-purple;
        }
      }
    }

    li {
      &:first-child {
        .dropdown-item-link {
          @apply mt-4;
        }
      }
    }

    .dropdown-item-link {
      @apply block w-full text-left mb-4 mx-4;
      text-decoration: none;
      font-weight: 700;

      &:hover, &:focus, &.router-link-active {
        @apply font-bold;
        outline: none;
      }
    }
  }

  @media (min-width: 768px) {
    &:hover .dropdown-content {
      visibility: visible;
      opacity: 1;
    }
  }

}

.line-button__container {
  .line-button {
    border: 2px solid #35176c !important;
    color: #35176c !important;
  }
  &:hover {
    .line-button {
      color: #FFF !important;
      background: #35176c;
    }
  }
}
.full-button__container {
  &:hover {
    .full-button {
      box-shadow: rgba(0, 0, 0, .125) 0px 0px 0px 20rem inset, rgba(0, 0, 0, 0.5) 0px 2px 2px 0;
    }
  }
}
</style>
