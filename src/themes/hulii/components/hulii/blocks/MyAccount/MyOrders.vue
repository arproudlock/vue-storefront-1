
<template>
  <div class="my-orders">
    <!-- My orders header -->
    <div class="my-orders--header">
      <h3 class="header--title">
        {{ $t('My Orders') }}
      </h3>
    </div>
    <!-- My orders body -->
    <div class="my-orders--orders">
      <div class="orders--table" v-show="!isHistoryEmpty">
        <table class="brdr-1 brdr-cl-bg-secondary">
          <thead>
            <tr>
              <th class="p20 serif lh20">
                {{ $t('Order #') }}
              </th>
              <th class="p20 serif lh20 hide-on-xs">
                {{ $t('Order Date') }}
              </th>
              <th class="p20 serif lh20 hide-on-xs">
                {{ $t('Value') }}
              </th>
              <th class="p20 serif lh20 hide-on-xs">
                {{ $t('Status') }}
              </th>
              <th class="p20 serif lh20">
&nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="brdr-top-1 brdr-cl-bg-secondary" v-for="order in ordersHistory" :key="order.entity_id">
              <td class="">
                #{{ order.increment_id }}
              </td>
              <td class="hide-on-xs">
                {{ order.created_at | date('LLL') }}
              </td>
              <td class="hide-on-xs">
                {{ order.grand_total | price }}
              </td>
              <td class="hide-on-xs">
                {{ order.status | capitalize }}
              </td>
              <td class="">
                <span class="relative dropdown">
                  <i class="material-icons cl-secondary pointer">more_horiz</i>
                  <div class="dropdown-content align-left py5">
                    <router-link class="no-underline block py10 px15" :to="localizedRoute(`/my-account/orders/${order.entity_id}`)">
                      {{ $t('View order') }}
                    </router-link>
                    <a href="#" class="no-underline block py10 px15" @click.prevent="remakeOrder(skipGrouped(order.items))">{{ $t('Reorder') }}</a>
                  </div>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-xs-12 h4" v-show="isHistoryEmpty">
        <p>{{ $t('No orders yet') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserOrder from 'src/modules/order-history/components/UserOrders'

export default {
  mixins: [UserOrder]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

table {
  border-collapse: collapse;
  width: 100%;

  th, td {
    text-align: left;
    padding: 20px;

    @media (max-width: 1199px) {
      padding: 10px;
    }

    @media (max-width: 767px) {
      text-align: center;
    }

    &.hide-on-xs {

      @media (max-width: 767px) {
        display: none;
      }

    }

  }

  i {
    vertical-align: middle;
  }

}

.dropdown {
  display: block;
  margin: -20px;
  padding: 20px;

  @media (max-width: 1199px) {
    margin: -10px;
    padding: 10px;
  }

  .dropdown-content {
    @apply cursor-pointer;
    padding: 0;
    position: absolute;
    list-style: none;
    display: none;
    padding: 0;
    margin-top: 3px;
    background: #fff;
    min-width: 200px;
    z-index: 1;
    transition: all .25s;
    top: 50px;
    right: 43px;
    box-shadow: rgba(0, 0, 0, .13) 0px 7px 15px, rgba(0, 0, 0, .05) 0px 0px 3px;
    transform: scale(.9);
    width: 160px;
    border-radius: 5px;
    transition: all .2s cubic-bezier(.4, 0, 1, 1) 0s;
    font-weight: 600;
  }

  a {
    opacity: .6;

    &:hover,
    &:focus {
      background-color: $color-icon-hover;
      opacity: 1;
    }

  }

  &:hover .dropdown-content {
    display: block;
  }

}
.my-orders {
  @apply w-full;

  .my-orders--header {
    @apply mb-8  flex flex-row justify-between;

    .header--title {
      @apply text-hulii-orange;
      font-weight: 700;
      margin-top: 0;
      font-size: 1.5rem;
      margin-bottom: 0;
    }
    .header--edited {
      .edited--contents {
        @apply text-grey flex items-center;

        a {
          @apply text-grey flex items-center;
          .material-icons {
            font-size: 14px;
          }
        }
      }
    }
  }
  .my-orders--orders {
    .orders--table {
    }
  }
}
</style>
