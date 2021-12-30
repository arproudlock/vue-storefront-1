<template>
  <div class="my-shipping">
    <!-- My shipping details header -->
    <div class="my-shipping--header">
      <h3 class="header--title">
        {{ $t('My Shipping Details') }}
      </h3>
      <div class="header--edited">
        <div class="edited--contents" v-if="!isEdited">
          <a href="#" class="flex" @click.prevent="edit">
            <span class="pr5">
              {{ $t('Edit') }}
            </span>
            <i class="material-icons">edit</i>
          </a>
        </div>
      </div>
    </div>

    <!-- My shipping details body (edit mode) -->
    <div class="my-shipping--form" v-if="isEdited">
      <template>
        <base-input
          class="form--item"
          type="text"
          name="first-name"
          autocomplete="given-name"
          :placeholder="`${$t('First name')} *`"
          v-model.trim="shippingDetails.firstName"
          @input="$v.shippingDetails.firstName.$touch()"
          :validations="[
            {
              condition: !$v.shippingDetails.firstName.required && $v.shippingDetails.firstName.$error,
              text: $t('Field is required')
            },
            {
              condition: !$v.shippingDetails.firstName.minLength,
              text: $t('Name must have at least 2 letters.')
            }
          ]"
        />

        <base-input
          class="form--item"
          type="text"
          name="last-name"
          autocomplete="family-name"
          :placeholder="`${$t('Last name')} *`"
          v-model.trim="shippingDetails.lastName"
          @input="$v.shippingDetails.lastName.$touch()"
          :validations="[{
            condition: !$v.shippingDetails.lastName.required && $v.shippingDetails.lastName.$error,
            text: $t('Field is required')
          }]"
        />

        <base-checkbox
          v-if="hasBillingAddress()"
          class="form--item"
          id="addCompanyFilled"
          v-model="useCompanyAddress"
        >
          {{ $t("Use my company's address details") }}
        </base-checkbox>

        <base-input
          class="form--item"
          type="text"
          name="street-address"
          autocomplete="address-line1"
          :placeholder="`${$t('Street name')} *`"
          v-model.trim="shippingDetails.street"
          @input="$v.shippingDetails.street.$touch()"
          :validations="[{
            condition: !$v.shippingDetails.street.required && $v.shippingDetails.street.$error,
            text: $t('Field is required')
          }]"
        />

        <base-input
          class="form--item"
          type="text"
          name="apartment-number"
          autocomplete="address-line2"
          :placeholder="`${$t('House/Apartment number')} *`"
          v-model.trim="shippingDetails.house"
          @input="$v.shippingDetails.house.$touch()"
          :validations="[{
            condition: !$v.shippingDetails.house.required && $v.shippingDetails.house.$error,
            text: $t('Field is required')
          }]"
        />

        <base-input
          class="form--item"
          type="text"
          name="city"
          autocomplete="address-level2"
          :placeholder="`${$t('City')} *`"
          v-model.trim="shippingDetails.city"
          @input="$v.shippingDetails.city.$touch()"
          :validations="[{
            condition: !$v.shippingDetails.city.required && $v.shippingDetails.city.$error,
            text: $t('Field is required')
          }]"
        />

        <base-input
          class="form--item"
          type="text"
          name="state"
          autocomplete="address-level1"
          :placeholder="$t('State / Province')"
          v-model.trim="shippingDetails.region"
        />

        <base-input
          class="form--item"
          type="text"
          name="zip-code"
          autocomplete="postal-code"
          :placeholder="`${$t('Zip-code')} *`"
          v-model.trim="shippingDetails.postcode"
          @input="$v.shippingDetails.postcode.$touch()"
          :validations="[
            {
              condition: !$v.shippingDetails.postcode.required && $v.shippingDetails.postcode.$error,
              text: $t('Field is required')
            },
            {
              condition: !$v.shippingDetails.postcode.minLength,
              text: $t('Zip-code must have at least 3 letters.')
            }
          ]"
        />

        <base-select
          class="form--item"
          name="countries"
          :options="countryOptions"
          :selected="shippingDetails.country"
          :placeholder="$t('Country *')"
          :validations="[
            {
              condition: $v.shippingDetails.country.$error && !$v.shippingDetails.country.required,
              text: $t('Field is required')
            }
          ]"
          v-model="shippingDetails.country"
          autocomplete="country-name"
          @blur="$v.shippingDetails.country.$touch()"
          @change="$v.shippingDetails.country.$touch()"
        />

        <base-input
          class="form--item"
          type="text"
          name="phone-number"
          autocomplete="tel"
          :placeholder="$t('Phone Number')"
          v-model.trim="shippingDetails.phone"
        />

        <div class="my-shipping--button">
          <full-button bg-color="hulii-hot-pink" text="Update" size="large" @click.native="updateDetails" :disabled="$v.$invalid" />
        </div>
        <div class="my-shipping--cancel">
          <a href="#" @click="exitSection">
            {{ $t('Cancel') }}
          </a>
        </div>
      </template>
    </div>

    <!-- My shipping details summary -->
    <div class="my-shipping--summary" v-else>
      <div class="summary--contents">
        <p>
          {{ shippingDetails.firstName }} {{ shippingDetails.lastName }}
        </p>
        <p class="mb25">
          {{ shippingDetails.company }}
        </p>
        <p class="mb25">
          {{ shippingDetails.street }}
          <span v-if="shippingDetails.house"> {{ shippingDetails.house }}</span>
        </p>
        <p class="mb25">
          {{ shippingDetails.city }} {{ shippingDetails.postcode }}
        </p>
        <p class="mb25">
          <span v-if="shippingDetails.region">{{ shippingDetails.region }}, </span>
          {{ getCountryName() }}
        </p>
        <div class="mb25">
          {{ shippingDetails.phone }}
          <tooltip v-if="shippingDetails.phone">
            {{ $t('Phone number may be needed by carrier') }}
          </tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import MyShippingDetails from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyShippingDetails'

import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton'
import Tooltip from 'theme/components/core/Tooltip'
import BaseCheckbox from 'theme/components/hulii/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/hulii/blocks/Form/BaseInput'
import BaseSelect from 'theme/components/hulii/blocks/Form/BaseSelect'

export default {
  components: {
    FullButton,
    Tooltip,
    BaseCheckbox,
    BaseInput,
    BaseSelect
  },
  mixins: [MyShippingDetails],
  computed: {
    countryOptions () {
      return this.countries.map((item) => {
        return {
          value: item.code,
          label: item.name
        }
      })
    }
  },
  validations: {
    shippingDetails: {
      firstName: {
        required,
        minLength: minLength(2)
      },
      lastName: {
        required
      },
      country: {
        required
      },
      street: {
        required
      },
      house: {
        required
      },
      postcode: {
        required,
        minLength: minLength(3)
      },
      city: {
        required
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.my-shipping {
  @apply w-full;
  max-width: 400px;

  .my-shipping--header {
    @apply mb-8  flex flex-row justify-between;

    .header--title {
      @apply text-hulii-hot-pink;
      font-weight: 700;
      margin-top: 0;
      font-size: 1.5rem;
      margin-bottom: 0;
    }
    .header--edited {
      .edited--contents {
        @apply text-grey flex items-center;
        font-weight: 600;

        a {
          @apply text-grey flex items-center;
          .material-icons {
            font-size: 14px;
          }
        }
      }
    }
  }
  .my-shipping--form {
    .form--item {
      @apply mb-4 w-full;
    }
  }
  .my-shipping--button {
    @apply text-white mt-4 cursor-pointer;
  }
  .my-shipping--cancel {
    @apply text-grey text-center mt-4;
    font-weight: 600;

    a {
      @apply text-grey;
    }
  }
  .my-shipping--summary {
    .summary--contents {
      p {
        @apply mt-0;
        .contents--label {
          font-weight: 600;
        }
        .contents--value {
          @apply ml-1;
        }
      }
    }
  }
}
</style>
