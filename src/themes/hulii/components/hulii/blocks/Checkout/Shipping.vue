<template>
  <div class="checkout--shipping" :style="!isActive ? 'display:none' : ''">
    <div class="shipping--title">
      <h2>
        {{ $t("Shipping Address") }}
      </h2>
    </div>
    <div class="shipping--form">
      <base-checkbox
        v-if="currentUser && hasShippingDetails()"
        class="col-xs-12 mb10"
        id="shipToMyAddressCheckbox"
        v-model="shipToMyAddress"
      >
        {{ $t("Ship to my default address") }}
      </base-checkbox>
      <div class="form--split-row">
        <base-input
          class="form--item"
          type="text"
          name="first-name"
          :placeholder="$t('First name *')"
          v-model.trim="shipping.firstName"
          @blur="$v.shipping.firstName.$touch()"
          autocomplete="given-name"
          :validations="[
            {
              condition:
                $v.shipping.firstName.$error && !$v.shipping.firstName.required,
              text: $t('Field is required')
            }
          ]"
        />
        <!-- ,
            {
              condition: !$v.shipping.firstName.minLength,
              text: $t('Name must have at least 2 letters.')
            } -->

        <base-input
          class="form--item"
          type="text"
          name="last-name"
          :placeholder="$t('Last name *')"
          v-model.trim="shipping.lastName"
          @blur="$v.shipping.lastName.$touch()"
          autocomplete="family-name"
          :validations="[
            {
              condition:
                $v.shipping.lastName.$error && !$v.shipping.lastName.required,
              text: $t('Field is required')
            }
          ]"
        />
      </div>
      <!-- <div>
        <base-input
          class="form--item"
          type="text"
          name="address-search"
          :placeholder="$t('Look up address')"
          v-model.trim="location"
        />
        <ul>
          <li v-for="(result, i) in searchResults" :key="i">
            <span @click="setAddress(result.place_id)"> {{ result.description }}</span>
          </li>
        </ul>
      </div> -->
      <!-- <input type="text" ref="location" v-model="location" class="form--item">
      <button @click="manualAddressEntry()">
        Enter Manually
      </button> -->
      <!-- <div v-show="manualAddress"> -->
      <!-- <div class="relative base-input form--item">
        <vue-google-autocomplete
          id="map"
          classname="form--item"
          @placechanged="setAddress"
          :country="['au', 'nz']"
          types="address"
        />
        <label class="input--label">Shipping Address</label>
      </div> -->

      <!-- <div v-show="manualAddress"> -->
      <base-input
        class="form--item"
        type="text"
        name="street-address"
        :placeholder="$t('Address Line 1')"
        v-model.trim="shipping.streetAddress"
        autocomplete="address-line1"
      />

      <base-input
        class="form--item"
        type="text"
        name="apartment-number"
        :placeholder="$t('Address Line 2')"
        v-model.trim="shipping.apartmentNumber"
        autocomplete="address-line2"
      />

      <div class="form--split-row">
        <base-input
          class="form--item"
          type="text"
          name="city"
          :placeholder="$t('City *')"
          v-model.trim="shipping.city"
          @blur="$v.shipping.city.$touch()"
          autocomplete="address-level2"
          :validations="[
            {
              condition: $v.shipping.city.$error && !$v.shipping.city.required,
              text: $t('Field is required')
            }
          ]"
        />

        <base-input
          class="form--item"
          type="text"
          name="state"
          :placeholder="$t('State / Province *')"
          v-model.trim="shipping.state"
          autocomplete="address-level1"
          v-if="shipping.country != 'AU' || ''"
          :validations="[
            {
              condition:
                $v.shipping.state.$error && !$v.shipping.state.required,
              text: $t('Field is required')
            }
          ]"
        />
        <base-select
          class="form--item"
          name="countries"
          :options="stateOptions"
          :selected="shipping.state"
          :placeholder="$t('State *')"
          :validations="[
            {
              condition:
                $v.shipping.state.$error && !$v.shipping.state.required,
              text: $t('Field is required')
            }
          ]"
          v-model="shipping.state"
          autocomplete="address-level1"
          v-if="shipping.country == 'AU' || ''"
        />
      </div>

      <div class="form--split-row">
        <base-select
          class="form--item"
          name="countries"
          :options="countryOptions"
          :selected="shipping.country"
          :placeholder="$t('Country *')"
          :validations="[
            {
              condition:
                $v.shipping.country.$error && !$v.shipping.country.required,
              text: $t('Field is required')
            }
          ]"
          v-model="shipping.country"
          autocomplete="country-name"
          @blur="$v.shipping.country.$touch()"
          @change.native="
            $v.shipping.country.$touch();
            changeCountry();
          "
        />
        <base-input
          class="form--item"
          type="text"
          name="zip-code"
          :placeholder="$t('Postcode *')"
          v-model.trim="shipping.zipCode"
          @blur="$v.shipping.zipCode.$touch()"
          autocomplete="postal-code"
          :validations="[
            {
              condition:
                $v.shipping.zipCode.$error && !$v.shipping.zipCode.required,
              text: $t('Field is required')
            },
            {
              condition: !$v.shipping.zipCode.minLength,
              text: $t('Postcode must be 4 digits.')
            }
          ]"
        />
      </div>
      <!-- </div> -->

      <base-input
        class="form--item"
        type="text"
        name="phone-number"
        :placeholder="$t('Phone Number *')"
        v-model.trim="shipping.phoneNumber"
        autocomplete="tel"
        :validations="[
          {
            condition:
              $v.shipping.phoneNumber.$error &&
              !$v.shipping.phoneNumber.required,
            text: $t('Field is required')
          },
          {
            condition: !$v.shipping.phoneNumber.minLength,
            text: $t('Phone number must be at least 10 digits.')
          }
        ]"
      />
    </div>
    <div class="shipping--button">
      <button
        data-testid="shippingSubmit"
        @click="sendDataToCheckout"
        :disabled="$v.shipping.$invalid"
      >
        {{ $t("Continue") }}
      </button>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import {
  unicodeAlpha,
  unicodeAlphaNum
} from '@vue-storefront/core/helpers/validators';
import { Shipping } from 'src/modules/extend-checkout/components/Shipping';

import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox';
import BaseInput from 'theme/components/hulii/blocks/Form/BaseInput';
import BaseSelect from 'theme/components/hulii/blocks/Form/BaseSelect';
import ButtonFull from 'theme/components/theme/ButtonFull';
import Tooltip from 'theme/components/core/Tooltip';

// import { VueGooglePlaces } from 'vue-google-places'
// import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  components: {
    ButtonFull,
    Tooltip,
    BaseCheckbox,
    BaseInput,
    BaseSelect
    // VueGoogleAutocomplete
  },
  data () {
    return {
      stateOptions: [
        {},
        {
          value: 'ACT',
          label: 'Australian Capital Teritory'
        },
        { value: 'NSW', label: 'New South Wales' },
        { value: 'NT', label: 'Northern Teritory' },
        { value: 'QLD', label: 'Queensland' },
        { value: 'SA', label: 'South Australia' },
        { value: 'TAS', label: 'Tasmania' },
        { value: 'VIC', label: 'Victoria' },
        { value: 'WA', label: 'Western Australia' }
      ],
      location: null,
      searchResults: [],
      widget: null,
      manualAddress: false
    };
  },
  mixins: [Shipping],
  computed: {
    countryOptions () {
      return this.countries.map(item => {
        return {
          value: item.code,
          label: item.name
        };
      });
    }
  },
  validations: {
    shipping: {
      firstName: {
        required,
        unicodeAlpha
      },
      lastName: {
        required,
        unicodeAlpha
      },
      country: {
        required
      },
      state: {
        required
      },
      streetAddress: {
        required,
        unicodeAlphaNum
      },
      zipCode: {
        required,
        minLength: minLength(4),
        unicodeAlphaNum
      },
      city: {
        required,
        unicodeAlpha
      },
      phoneNumber: {
        minLength: minLength(10)
      }
    }
  },
  methods: {
    initAF () {
      let inst = this;
      this.widget = new AddressFinder.Widget(
        // Replace with the id of your search field
        document.getElementById('street-address'),
        // Replace with your license key
        'NRTV6LCA3XKHYQPU74FW',
        'AU',
        {
          address_params: {
            gnaf: '1'
          }
        }
      );
      this.widget.on('result:select', (fullAddress, metaData) => {
        // Replace each of these fields with your address field ids
        inst.shipping.streetAddress = metaData.address_line_1;
        inst.shipping.apartmentNumber = metaData.address_line_2;
        inst.shipping.city = metaData.locality_name;
        inst.shipping.state = metaData.state_territory;
        inst.shipping.zipCode = metaData.postcode;
        inst.shipping.Country = 'AU';
        // document.getElementById('gps-metadata').value = metaData.longitude + ', ' + metaData.latitude;
        // document.getElementById('meshblock-metadata').value = metaData.meshblock;
        // document.getElementById('SA1').value = metaData.sa1_id;

        // document.getElementById('street-address').value = metaData.address_line_1;
        // document.getElementById('apartment-number').value = metaData.address_line_2;
        // document.getElementById('city').value = metaData.locality_name;
      });
    }
  },
  mounted () {
    this.initAF();
    let cartItems = this.$store.state.cart.cartItems ? this.$store.state.cart.cartItems : ''
    let ga4value = 0
    let ga4Items = cartItems.map((product, index) => {
      ga4value = ga4value + product.priceInclTax
      let categories = product.url_path.split('/');
      let slug = categories.pop();
      return {
        item_id: product.sku,
        item_name: product.name,
        currency: 'AUD',
        index: index + 1,
        item_brand: product.brand,
        item_category: categories[0] ? categories[0] : null,
        item_category1: categories[1] ? categories[1] : null,
        item_category2: categories[2] ? categories[2] : null,
        item_category3: categories[3] ? categories[3] : null,
        item_category4: categories[4] ? categories[4] : null,
        item_category5: categories[5] ? categories[5] : null,
        item_category6: categories[6] ? categories[6] : null,
        price: product.priceInclTax,
        shipping_type: product.shipping_type,
        quantity: product.qty,
        seller: product.seller
      }
    });
    // console.log(ga4Items);
    window.gtag('event', 'add_shipping_info', {
      currency: 'AUD',
      value: ga4value,
      items: ga4Items
    });
  }
};
</script>
<style lang="scss" scoped>
.checkout--shipping {
  .shipping--title {
    @apply text-center;

    @screen md {
      @apply text-left;
    }
    margin-bottom: 25px;
    h2 {
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
  }
  .shipping--form {
    .form--item {
      @apply mb-4;
    }
    .form--split-row {
      @apply flex flex-col;

      .form--item {
        @apply w-full mb-4;

        @screen md {
          @apply w-1/2;
        }
      }
      @screen md {
        @apply flex-row;

        .form--item:nth-of-type(1) {
          margin-right: 8px;
        }
        .form--item:nth-of-type(2) {
          margin-left: 8px;
        }
      }
    }
  }
  .shipping--button {
    button {
      @apply bg-hulii-turquoise w-full mt-4;
      border: 0;
      color: white;
      min-height: 48px;
      font-weight: 600;
      font-size: 1rem;
      font-family: "HuliiSans", sans-serif;
      text-transform: capitalize;
      border-radius: 5px;
      box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15);
      transition: transform 0.1s ease-out;

      &:disabled {
        @apply bg-grey;
      }
    }
  }
}

@import "~theme/css/variables/colors";
@import "~theme/css/helpers/functions/color";
$color-tertiary: color(tertiary);
$color-black: color(black);
$color-puerto-rico: color(puerto-rico);
$color-hover: color(tertiary, $colors-background);

input {
  background: inherit;
  height: 53px;
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  color: #000;
  font-size: 14px;
  letter-spacing: 0;
  padding: 0 20px;
  text-transform: none;
  transition: border-color 0.4s cubic-bezier(0.39, 0.575, 0.565, 1);
  width: 100%;
  border-radius: 5px;

  &:hover,
  &:focus {
    outline: none;
    border-color: #000000;
  }

  &:disabled,
  &:disabled + label {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}
.small {
  input {
    height: 45px;
  }
  .input--label {
    top: 12px;
  }
}
label {
  line-height: 20px;
  font-size: 14px;
  color: #727373;
  position: absolute;
  left: 15px;
  top: 16px;
  text-align: left;
  box-sizing: border-box;
  padding: 0 6px;
  transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
}
input:focus ~ label,
input:not(.empty) ~ label {
  background: #fff;
  color: #000000;
  font-size: 12px;
  font-weight: 600;
  position: absolute;
  transform: translate3d(0, -25px, 0);
}

.icon {
  right: 6px;
  top: 10px;
  &:hover,
  &:focus {
    color: $color-hover;
  }
}

</style>
