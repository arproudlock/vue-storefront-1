<template>
  <transition name="fade" appear>
    <div class="snackbar--container" v-if="isOpen">
      <div class="snackbar--contents">
        <div class="snackbar--message">
          <h3>
            {{ message }}
          </h3>
          <router-link :to="localizedRoute('detailsLink')" :title="detailsLinkText" class="message--link">
            {{ detailsLinkText }}
          </router-link>
        </div>
        <div class="snackbar--button">
          <full-button
            bg-color="white"
            text-color="hulii-turquoise"
            text="Ok"
            class="btn"
            @click.native="accept"
            @keyup.enter="accept"
            data-testid="closeCookieButton"
            tabindex="0"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton'

export default {
  props: {
    detailsLinkText: {
      type: String,
      default: i18n.t('See details')
    },
    detailsLink: {
      type: String,
      default: '/help-center/privacy-policy'
    },
    message: {
      type: String,
      default: i18n.t('We use cookies to give you the best shopping experience.')
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  components: {
    FullButton
  },
  methods: {
    accept () {
      this.setVisited()
      this.isOpen = false
    },
    setVisited () {
      this.$store.dispatch('claims/set', {claimCode: 'cookiesAccepted', value: true})
    }
  },
  created () {
    this.$store.dispatch('claims/check', {claimCode: 'cookiesAccepted'}).then((cookieClaim) => {
      if (!cookieClaim) {
        this.isOpen = true
        this.$store.dispatch('claims/set', {claimCode: 'cookiesAccepted', value: false})
        setTimeout(() => {
          this.accept();
        }, 15000);
      } else {
        this.isOpen = !cookieClaim.value
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.snackbar--container {
  @apply fixed w-full;
  bottom: 0;
  z-index: 999;

  .snackbar--contents {
    @apply bg-hulii-turquoise;
    min-height: 64px;
    display: flex;
    align-items: center;
    padding: 0px 24px;
    margin: 8px;
    border-radius: 8px;
    overflow: hidden;

    .snackbar--message {
      flex-grow: 1;
      max-height: 2.8em;
      color: white;
      line-height: 1.4em !important;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      h3 {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
      }
      .message--link {
        @apply ml-1 text-white underline;
        font-weight: bold;
      }
    }
    .snackbar--button {
      outline: none;
      .btn {
        min-width: 100px;
        outline: none;
        user-select: none;
      }
    }
  }
  @screen lg {
    .snackbar--message {
      flex-wrap: inherit;
    }
  }
}
</style>
