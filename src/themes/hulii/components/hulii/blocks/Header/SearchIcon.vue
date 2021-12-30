<template>
  <div

    :aria-label="$t('Open search panel')"
    class="menu-icon small--icon"
    @click="toggleSearchpanel"
    data-testid="openSearchPanel"
  >
    <!-- <i class="material-icons search-icon">search</i> -->
    <button
      type="button"
      class="bg-transparent border-0 p-0 flex"
      :aria-label="$t('Search')"
    >
      <svg class="sc-1i55vv7-0 ceYqom" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5,14 L14.71,14 L14.43,13.73 C15.41,12.59 16,11.11 16,9.5 C16,5.91 13.09,3 9.5,3 C5.91,3 3,5.91 3,9.5 C3,13.09 5.91,16 9.5,16 C11.11,16 12.59,15.41 13.73,14.43 L14,14.71 L14,15.5 L19,20.49 L20.49,19 L15.5,14 Z M9.5,14 C7.01,14 5,11.99 5,9.5 C5,7.01 7.01,5 9.5,5 C11.99,5 14,7.01 14,9.5 C14,11.99 11.99,14 9.5,14 Z" id="🔹-Primary-Color" fill="#FFFFFF" />
      </svg>
    </button>
  </div>
</template>

<script>
import SearchIcon from '@vue-storefront/core/compatibility/components/blocks/Header/SearchIcon'

export default {
  mixins: [SearchIcon]
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
    // margin-right: 20px;
    cursor: pointer;

    &.large--icon {
      display: none;
    }
    &.small--icon {
      display: flex;
      background: none;
      padding: 4px 15px;
      margin-right: 0px;
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
    width: 25px;
    fill: #fff;
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

  button {
    pointer-events: none;
  }
</style>
