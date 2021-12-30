<template>
  <div class="my-order">
    <!-- My order header -->
    <div class="my-order--header">
      <div class="header--back">
        <return-icon class="back--icon" />
      </div>
      <h3 class="header--title">
        {{ $t('Order #') }}{{ order.increment_id }}
        <span class="brdr-1 brdr-cl-bg-secondary py5 px10 ml20 sans-serif fs-medium-small weight-400 cl-secondary">
          {{ order.status | capitalize }}
        </span>
      </h3>
    </div>
    <!-- My order body -->
    <div class="my-order--ordered">
      <div class="ordered--date">
        <p>{{ order.created_at | date('LLL') }}</p>
      </div>
      <div class="ordered--reorder">
        <a href="#" class="underline" @click.prevent="remakeOrder(skipGrouped(order.items))">{{ $t('Reorder') }}</a>
      </div>
    </div>
    <div class="my-order--information">
      <div class="information--header">
        <h4>
          {{ $t('Order Details') }}
        </h4>
      </div>
      <div class="information--contents">
        <div class="contents--shipping">
          <h5 class="contents--label">
            {{ $t('Shipping Address') }}
          </h5>
          <address>
            <p>
              {{ shippingAddress.firstname }} {{ shippingAddress.lastname }}
            </p>
            <p>
              {{ shippingAddress.street[0] }} {{ shippingAddress.street[1] }}
            </p>
            <p>
              {{ shippingAddress.postcode }} {{ shippingAddress.city }}
            </p>
            <p>
              {{ shippingAddress.country }}
            </p>
          </address>
        </div>
        <div class="contents--billing">
          <h5 class="contents--label">
            {{ $t('Billing Address') }}
          </h5>
          <address>
            <p>
              {{ billingAddress.firstname }} {{ billingAddress.lastname }}
            </p>
            <p>
              {{ billingAddress.street[0] }} {{ billingAddress.street[1] }}
            </p>
            <p>
              {{ billingAddress.postcode }} {{ billingAddress.city }}
            </p>
            <p>
              {{ billingAddress.country }}
            </p>
          </address>
        </div>
        <div class="contents-shipping-method">
          <h5 class="contents--label">
            {{ $t('Shipping Method') }}
          </h5>
          <p>
            {{ order.shipping_description }}
          </p>
        </div>
        <div class="contents--payment">
          <h5 class="contents--label">
            {{ $t('Payment Method') }}
          </h5>
          <p>{{ paymentMethod }}</p>
        </div>
      </div>
    </div>
    <div class="my-order--products">
      <div class="products--header">
        <h4>
          {{ $t('Order Items') }}
        </h4>
      </div>
      <div class="products--contents">
        <table class="brdr-1 brdr-cl-bg-secondary">
          <thead>
            <tr>
              <th class="">
                {{ $t('Product Name') }}
              </th>
              <th class="">
                {{ $t('SKU') }}
              </th>
              <th class="">
                {{ $t('Price') }}
              </th>
              <th class="">
                {{ $t('Qty') }}
              </th>
              <th class="">
                {{ $t('Subtotal') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="brdr-top-1 brdr-cl-bg-secondary" v-for="item in skipGrouped(order.items)" :key="item.item_id">
              <td class="" :data-th="$t('Product Name')">
                {{ item.name }}
              </td>
              <td class="" :data-th="$t('SKU')">
                {{ item.sku }}
              </td>
              <td class="" :data-th="$t('Price')">
                {{ item.price_incl_tax | price }}
              </td>
              <td class="align-right" :data-th="$t('Qty')">
                {{ item.qty_ordered }}
              </td>
              <td class="" :data-th="$t('Subtotal')">
                {{ item.row_total_incl_tax | price }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="brdr-top-1 brdr-cl-bg-secondary">
              <td colspan="4" class="align-right">
                {{ $t('Subtotal') }}
              </td>
              <td>{{ order.subtotal | price }}</td>
            </tr>
            <tr>
              <td colspan="4" class="align-right">
                {{ $t('Shipping') }}
              </td>
              <td>{{ order.shipping_amount | price }}</td>
            </tr>
            <tr>
              <td colspan="4" class="align-right">
                {{ $t('Tax') }}
              </td>
              <td>{{ order.tax_amount + order.discount_tax_compensation_amount | price }}</td>
            </tr>
            <tr v-if="order.discount_amount">
              <td colspan="4" class="align-right">
                {{ $t('Discount') }}
              </td>
              <td>{{ order.discount_amount | price }}</td>
            </tr>
            <tr>
              <td colspan="4" class="align-right">
                {{ $t('Grand total') }}
              </td>
              <td>{{ order.grand_total | price }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import MyOrder from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrder'
import ReturnIcon from 'theme/components/core/blocks/Header/ReturnIcon'

export default {
  mixins: [MyOrder],
  components: {
    ReturnIcon
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-tertiary: color(tertiary);
$color-white-smoke: color(white-smoke);

table {
  border-collapse: collapse;
  width: 100%;

  @media (max-width: 767px) {
    border-top: none;
  }

  th, td {
    text-align: left;
    padding: 20px;

    &.align-right {
      text-align: right;

      @media (max-width: 767px) {
        text-align: left;
      }

    }

    @media (max-width: 1199px) {
      padding: 10px;
    }

  }

  thead {
    @media (max-width: 767px) {
      display: none;
    }
  }

  tbody {

    tr {
      @media (max-width: 767px) {
        display: block
      }

      &:nth-child(even) {
        td {
          background-color: $color-white-smoke;
        }
      }

    }

    td {
      @media (max-width: 767px) {
        display: block;
        text-align: left;
        padding: 10px 20px;
        &:before {
          content: attr(data-th) ': ';
          font-weight: 700;
        }
      }

      &:first-child {
        @media (max-width: 767px) {
          padding: 20px 20px 10px 20px;
        }
      }

      &:last-child {
        @media (max-width: 767px) {
          padding: 10px 20px 20px 20px;
        }
      }
    }

  }

  tfoot {

    tr {
      @media (max-width: 767px) {
        display: block
      }

      &:last-child {
        td:last-child {
         padding-bottom: 20px
        }
      }

    }

    td {
      @media (max-width: 767px) {
        display: block
      }

      &:first-child {
        @media (max-width: 767px) {
          font-weight: 700;
          padding: 20px 20px 5px 20px;
        }
      }

      &:last-child {
        @media (max-width: 767px) {
          padding: 5px 20px 0 20px;
        }
      }

    }

  }

  i {
    vertical-align: middle;
  }

}

a {
  &:after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: $color-tertiary;
  }

  &:hover {
    &:after {
      opacity: 0;
    }
  }
}

address {
  font-style: normal;
}
.my-order {
  @apply w-full;
  .my-order--header {
    @apply flex flex-row mb-4;
    .header--back {
      @apply flex mr-2;
      .back--icon {
        @apply text-hulii-orange px-0;
      }
    }
    .header--title {
      @apply text-hulii-orange;
      font-weight: 700;
      margin-top: 0;
      font-size: 1.5rem;
      margin-bottom: 0;
    }
  }
  .my-order--ordered {
    @apply flex flex-row justify-between items-center;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    .ordered--date {

    }
    .ordered--reorder {
    }
  }
  .my-order--information {
    @apply pb-4;
    border-bottom: 1px solid #f2f2f2;
    .information--header {
      h4 {
        @apply mb-0 mt-4;
      }
    }
    .information--contents {
      @apply flex flex-wrap justify-between mt-4;
      h5 {
        @apply mt-0;
      }
      .contents--label {
        @apply text-grey mb-0;
      }
      .contents--shipping, .contents-shipping-method, .contents--billing, .contents--payment {
        @apply flex flex-col;
      }
    }
  }
  .my-order--products {
    @apply pb-4;
    .products--header {
      h4 {
        @apply mb-0 mt-4;
      }
    }
    .products--contents {
      @apply mt-4;
    }
  }
}
</style>
