<template>
  <transition name="fade" appear>
    <div class="snackbar--container">
      <div
        class="snackbar--contents"
        v-for="(notification, index) in notifications"
        :key="`${notification.type}_${index}`"
        :class="notification.type"
      >
        <div class="snackbar--message">
          <h3>
            {{ notification.message }}
          </h3>
        </div>
        <div class="snackbar--button">
          <full-button
            bg-color="white"
            text-color="hulii-turquoise"
            text="Ok"
            class="btn"
            @click.native="close(index)"
            @keyup.enter="close(index)"
            data-testid="closeCookieButton"
            tabindex="0"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Notification } from '@vue-storefront/core/modules/notification/components/Notification'
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton'

export default {
  mixins: [Notification],
  components: {
    FullButton
  },
  methods: {
    execAction (action, index) {
      if (action.action) {
        // for backward compatibility
        if (action.action === 'close') {
          this.$store.dispatch('notification/removeNotification', index)
        } else {
          action.action()
        }
      }
      this.$store.dispatch('notification/removeNotification', index)
    },
    close (index) {
      this.$store.dispatch('notification/removeNotification', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.snackbar--container {
  @apply fixed w-full;
  bottom: 0;
  z-index: 999;

  .snackbar--contents {
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
}
.success {
  @apply bg-hulii-turquoise;
}
.error {
  @apply bg-hulii-hot-pink;
}
.warning {
  @apply bg-hulii-yellow;
}
.info {
  @apply bg-hulii-orange;
}
</style>
