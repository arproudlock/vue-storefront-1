<template>
  <div id="register">
    <div class="container">
      <div class="register--container">
        <div class="register--title">
          <h2 v-if="loginActive">
            {{ $t('Welcome Back!') }}
          </h2>
          <h2 v-if="!loginActive">
            {{ $t('Join the Club') }}
          </h2>
        </div>
        <div class="register--toggle">
          <ul class="toggle--container">
            <li
              class="toggle--item"
              :class="{ 'active' : loginActive}"
              @click="toggleButtons(1)"
            >
              {{ $t('Log In') }}
            </li>
            <li
              class="toggle--item"
              :class="{ 'active' : !loginActive}"
              @click="toggleButtons(0)"
            >
              {{ $t('Sign Up') }}
            </li>
          </ul>
        </div>
        <div class="register--contents">
          <div
            class="flex pt-6"
            v-if="loginActive"
          >
            <Login />
          </div>
          <div
            class="flex pt-6"
            v-if="!loginActive"
          >
            <sign-up />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignUp from 'theme/components/hulii/blocks/Register/Register'
import Login from 'theme/components/hulii/blocks/Register/Login'
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton.vue'

export default {
  name: 'Register',
  data () {
    return {
      loginActive: true
    }
  },
  components: {
    SignUp,
    FullButton,
    Login
  },
  props: {
    signIn: {
      type: Boolean,
      default: null
    }
  },
  beforeMount () {
    if (this.signIn === true) {
      this.loginActive === false
    }
  },
  methods: {
    toggleButtons (val) {
      if (val === 1) {
        this.loginActive = true
      } else {
        this.loginActive = false
      }
    }
  }
}
</script>

<style lang="scss" scope>
  .register--container {
    @apply flex flex-col;
    max-width: 365px;
    margin-left: auto;
    margin-right: auto;
    padding: 50px 0 80px;

    .register--title {
      @apply text-hulii-yellow;
      text-align: center;
      h2 {
        font-size: 1.5rem;
      }
    }
    .register--toggle {
      .toggle--container {
        @apply flex;
        margin-bottom: 4px;
        margin-top: 25px;
        box-sizing: border-box;
        padding-left: 0;
        position: relative;
        text-align: center;
        list-style: none;

        .toggle--item {
          @apply cursor-pointer;
          display: inline-block;
          width: 50%;
          box-sizing: border-box;
          text-transform: uppercase;
          font-weight: bold;
          line-height: 52px;
          border: 1px solid #bdbdbd;
          letter-spacing: 0.05em;
          display: block;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          border-width: 2px;
          user-select: none;
          color: #bdbdbd;

          &:nth-of-type(1) {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;

            &:not(.active) {
              border-right: none;
            }
          }

          &:nth-of-type(2) {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;

            &:not(.active) {
              border-left: none;
            }
          }

          &.active {
            @apply border-hulii-yellow text-hulii-yellow relative;
            border-width: 2px;
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          }
        }
      }
    }
    .register--contents {
    }
  }
</style>
