<template>
  <div id="checkout">
    <section class="checkout--container">
      <div class="checkout--contents">
        <div class="checkout--shipping">
          <div class="shipping--title">
            <h2>
              {{ $t("Next steps") }}
            </h2>
          </div>
          <div class="nextsteps">
            <p>
              Upon completion of your request we will email you a return slip that you can take to the post office (either as a printout or just on your phone).  They will scan the return slip and place the phone in a padded mailer to send to us.  If you don't have an Australia Post Office or Outlet near you or otherwise cannot visit one please check the box below and we will send you a return bag that you can place the phone in and drop in any post box.
            </p>
          </div>
          <div class="shipping--title">
            <h2>
              {{ $t("Your Details") }}
            </h2>
          </div>
          <div class="shipping--form">
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
          </div>
          <base-input
            class="form--item"
            type="text"
            name="email"
            :placeholder="$t('Email Address')"
            v-model.trim="shipping.email"
            autocomplete="email"
          />

          <div class="shipping--title" v-if="account">
            <h2>
              {{ $t("Bank Account Information") }}
            </h2>
            <p>We need this to transfer your reward to you</p>
          </div>
          <div class="shipping--form" v-if="account">
            <div class="form--split-row">
              <base-input
                class="form--item"
                type="text"
                name="bsb"
                :placeholder="$t('BSB *')"
                v-model.trim="shipping.bsb"
                @blur="$v.shipping.bsb.$touch()"
                autocomplete=""
                :validations="[
                  {
                    condition:
                      $v.shipping.bsb.$error && !$v.shipping.bsb.required,
                    text: $t('Field is required')
                  },
                  {
                    condition:
                      $v.shipping.bsb.$error,
                    text: $t('BSB needs to be a 6 digit number')
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
                name="account"
                :placeholder="$t('Account Number *')"
                v-model.trim="shipping.account"
                @blur="$v.shipping.account.$touch()"
                autocomplete=""
                :validations="[
                  {
                    condition:
                      $v.shipping.account.$error && !$v.shipping.account.required,
                    text: $t('Field is required')
                  },
                  {
                    condition:
                      $v.shipping.account.$error,
                    text: $t('Account number must be at least 7 digits')
                  }
                ]"
              />
            </div>
          </div>
          <base-checkbox
            class="col-xs-12 mb10"
            id="returnBagRequired"
            v-model="returnBagRequired"
          >
            {{ $t("I cannot attend a local post office.  Please send me a return bag.") }}
          </base-checkbox>
          <div :class="!returnBagRequired ? 'hidden' : ''">
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
          </div>
          <div class="align-center w-100">
            <div class="contents--button--container inline-block">
              <div>
                <router-link
                  class="contents--button"
                  :to="localizedRoute('/buyback/thankyou')"
                  :style="'color: #372767 ;background: #F4F4F4'"
                >
                  {{ $t('Submit Buyback') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="checkout--summary">
      <div class="summary--container">
        <div class="summary--box">
          <h2>{{ deviceName }}</h2>
          <h4>{{ deviceCondition }}</h4>
          <p class="conditionDescription">
            {{ conditionDescription }}
          </p>
          <h4>${{ deviceValue }}</h4>
        </div>
      </div>
    </section>
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
        { value: 'ACT', label: 'Australian Capital Teritory' },
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
      manualAddress: false,
      deviceName: '',
      deviceCondition: '',
      conditionDescription: '',
      deviceValue: null,
      selected: null,
      account: true,
      returnBagRequired: false,
      phones: [
        { name: 'Alcatel 1C  8GB', Good: '0', Fair: '0', BER: '0', id: '1' },
        { name: 'Alcatel 2001', Good: '0', Fair: '0', BER: '0', id: '2' },
        { name: 'Alcatel OT-S210', Good: '0', Fair: '0', BER: '0', id: '3' },
        { name: 'Alcatel U3 (3G) 8GB', Good: '0', Fair: '0', BER: '0', id: '4' },
        { name: 'Apple iPad 1 WiFI 16GB', Good: '10', Fair: '0', BER: '0', id: '5' },
        { name: 'Apple iPad 1 WiFI 32GB', Good: '10', Fair: '0', BER: '0', id: '6' },
        { name: 'Apple iPad 1 WiFI 64GB', Good: '10', Fair: '0', BER: '0', id: '7' },
        { name: 'Apple iPad 1 WiFI + Cell 16GB', Good: '10', Fair: '5', BER: '0', id: '8' },
        { name: 'Apple iPad 1 WiFI + Cell 32GB', Good: '10', Fair: '5', BER: '0', id: '9' },
        { name: 'Apple iPad 1 WiFI + Cell 64GB', Good: '10', Fair: '5', BER: '0', id: '10' },
        { name: 'Apple iPad 2 WiFi 16GB', Good: '10', Fair: '5', BER: '0', id: '11' },
        { name: 'Apple iPad 2 WiFi 32GB', Good: '10', Fair: '5', BER: '0', id: '12' },
        { name: 'Apple iPad 2 WiFi 64GB', Good: '10', Fair: '5', BER: '0', id: '13' },
        { name: 'Apple iPad 2 WiFi + Cell 16GB', Good: '15', Fair: '5', BER: '0', id: '14' },
        { name: 'Apple iPad 2 WiFi + Cell 32GB', Good: '15', Fair: '5', BER: '0', id: '15' },
        { name: 'Apple iPad 2 WiFi + Cell 64GB', Good: '15', Fair: '5', BER: '0', id: '16' },
        { name: 'Apple iPhone 3G 8GB', Good: '10', Fair: '5', BER: '0', id: '17' },
        { name: 'Apple iPhone 3G 16GB', Good: '10', Fair: '5', BER: '0', id: '18' },
        { name: 'Apple iPhone 3GS 8GB', Good: '10', Fair: '5', BER: '0', id: '19' },
        { name: 'Apple iPhone 3GS 16GB', Good: '10', Fair: '5', BER: '0', id: '20' },
        { name: 'Apple iPhone 3GS 32GB', Good: '10', Fair: '5', BER: '0', id: '21' },
        { name: 'Apple iPhone 4 8GB', Good: '10', Fair: '5', BER: '0', id: '22' },
        { name: 'Apple iPhone 4 16GB', Good: '10', Fair: '5', BER: '0', id: '23' },
        { name: 'Apple iPhone 4 32GB', Good: '10', Fair: '5', BER: '0', id: '24' },
        { name: 'Apple iPhone 4 64GB', Good: '10', Fair: '5', BER: '0', id: '25' },
        { name: 'Apple iPhone 4S 8GB', Good: '10', Fair: '5', BER: '0', id: '26' },
        { name: 'Apple iPhone 4S 16GB', Good: '10', Fair: '5', BER: '0', id: '27' },
        { name: 'Apple iPhone 4S 32GB', Good: '10', Fair: '5', BER: '0', id: '28' },
        { name: 'Apple iPhone 4S 64GB', Good: '10', Fair: '5', BER: '0', id: '29' },
        { name: 'Apple iPhone 5 16GB', Good: '10', Fair: '5', BER: '0', id: '30' },
        { name: 'Apple iPhone 5 32GB', Good: '10', Fair: '5', BER: '0', id: '31' },
        { name: 'Apple iPhone 5 64GB', Good: '10', Fair: '5', BER: '0', id: '32' },
        { name: 'Apple iPhone 5c 8GB', Good: '10', Fair: '5', BER: '0', id: '33' },
        { name: 'Apple iPhone 5c 16GB', Good: '10', Fair: '5', BER: '0', id: '34' },
        { name: 'Apple iPhone 5c 32GB', Good: '10', Fair: '5', BER: '0', id: '35' },
        { name: 'Apple iPhone 5s  16GB', Good: '15', Fair: '10', BER: '5', id: '36' },
        { name: 'Apple iPhone 5s  32GB', Good: '20', Fair: '10', BER: '5', id: '37' },
        { name: 'Apple iPhone 5s  64GB', Good: '20', Fair: '10', BER: '5', id: '38' },
        { name: 'Blackberry BB9800 1GB', Good: '0', Fair: '0', BER: '0', id: '39' },
        { name: 'Blackberry Bold 9700 1GB', Good: '0', Fair: '0', BER: '0', id: '40' },
        { name: 'Blackberry Bold Touch 9780 1GB', Good: '0', Fair: '0', BER: '0', id: '41' },
        { name: 'Blackberry Bold Touch 9900 (RDY71UW) 8GB', Good: '0', Fair: '0', BER: '0', id: '42' },
        { name: 'Blackberry Curve 8300 1GB', Good: '0', Fair: '0', BER: '0', id: '43' },
        { name: 'Blackberry Pearl 8100 1GB', Good: '0', Fair: '0', BER: '0', id: '44' },
        { name: 'HTC 10  32GB', Good: '9.9', Fair: '5', BER: '5', id: '45' },
        { name: 'HTC 10  64GB', Good: '15', Fair: '5', BER: '5', id: '46' },
        { name: 'HTC Desire C 4GB', Good: '0', Fair: '0', BER: '0', id: '47' },
        { name: 'HTC Desire S 1GB', Good: '0', Fair: '0', BER: '0', id: '48' },
        { name: 'HTC HD2 16GB', Good: '0', Fair: '0', BER: '0', id: '49' },
        { name: 'HTC HTC Touch Diamond2 1GB', Good: '0', Fair: '0', BER: '0', id: '50' },
        { name: 'HTC HTC Touch Pro 2 1GB', Good: '0', Fair: '0', BER: '0', id: '51' },
        { name: 'HTC One S 16GB', Good: '0', Fair: '0', BER: '0', id: '52' },
        { name: 'HTC One X9 32GB', Good: '10', Fair: '5', BER: '0', id: '53' },
        { name: 'HTC Sensation 1GB', Good: '0', Fair: '0', BER: '0', id: '54' },
        { name: 'HTC Telstra HTC Wildfire', Good: '0', Fair: '0', BER: '0', id: '55' },
        { name: 'HTC Telstra HTC Wildfire S', Good: '0', Fair: '0', BER: '0', id: '56' },
        { name: 'HTC U11 64GB', Good: '35', Fair: '20', BER: '5', id: '57' },
        { name: 'HTC U11 128GB', Good: '40', Fair: '20', BER: '5', id: '58' },
        { name: 'Huawei Ascend Y300 4GB', Good: '0', Fair: '0', BER: '0', id: '59' },
        { name: 'Huawei Ascend Y520 4GB', Good: '0', Fair: '0', BER: '0', id: '60' },
        { name: 'Huawei P30 Pro 64GB', Good: '45', Fair: '25', BER: '5', id: '61' },
        { name: 'Huawei P30 Pro 128GB', Good: '50', Fair: '30', BER: '5', id: '62' },
        { name: 'Huawei P30 Pro 256GB', Good: '65', Fair: '35', BER: '5', id: '63' },
        { name: 'Huawei U8180', Good: '0', Fair: '0', BER: '0', id: '64' },
        { name: 'LG G5 32GB', Good: '19.8', Fair: '10', BER: '0', id: '65' },
        { name: 'LG G6 32GB', Good: '25', Fair: '10', BER: '0', id: '66' },
        { name: 'LG G6 64GB', Good: '30', Fair: '10', BER: '0', id: '67' },
        { name: 'LG G6 128GB', Good: '35', Fair: '10', BER: '0', id: '68' },
        { name: 'LG K11 Plus 16GB', Good: '15', Fair: '5', BER: '0', id: '69' },
        { name: 'LG K9 16GB', Good: '15', Fair: '5', BER: '0', id: '70' },
        { name: 'LG Telstra Signature Enhanced 16GB', Good: '10', Fair: '5', BER: '0', id: '71' },
        { name: 'LG V30 64GB', Good: '35', Fair: '15', BER: '0', id: '72' },
        { name: 'Microsoft Lumia 435 16GB', Good: '5', Fair: '5', BER: '0', id: '73' },
        { name: 'Microsoft Lumia 435 (Dual SIM) 16GB', Good: '5', Fair: '5', BER: '0', id: '74' },
        { name: 'Microsoft Lumia 520 8GB', Good: '0', Fair: '0', BER: '0', id: '75' },
        { name: 'Microsoft Lumia 520 512GB', Good: '0', Fair: '0', BER: '0', id: '76' },
        { name: 'Microsoft Lumia 530 4GB', Good: '0', Fair: '0', BER: '0', id: '77' },
        { name: 'Microsoft Lumia 530 4GB', Good: '0', Fair: '0', BER: '0', id: '78' },
        { name: 'Microsoft Lumia 532 8GB', Good: '0', Fair: '0', BER: '0', id: '79' },
        { name: 'Microsoft Lumia 610 8GB', Good: '0', Fair: '0', BER: '0', id: '80' },
        { name: 'Microsoft Lumia 630 8GB', Good: '0', Fair: '0', BER: '0', id: '81' },
        { name: 'Microsoft Lumia 710 8GB', Good: '0', Fair: '0', BER: '0', id: '82' },
        { name: 'Microsoft Lumia 800 8GB', Good: '0', Fair: '0', BER: '0', id: '83' },
        { name: 'Microsoft Microsoft-957', Good: '0', Fair: '0', BER: '0', id: '84' },
        { name: 'Microsoft Nokia 301', Good: '0', Fair: '0', BER: '0', id: '85' },
        { name: 'Motorola BRAVO 2GB', Good: '0', Fair: '0', BER: '0', id: '86' },
        { name: 'Motorola DEFY 2GB', Good: '0', Fair: '0', BER: '0', id: '87' },
        { name: 'Motorola DEFY 2GB', Good: '0', Fair: '0', BER: '0', id: '88' },
        { name: 'Motorola Moto E 8GB', Good: '0', Fair: '0', BER: '0', id: '89' },
        { name: 'Motorola Moto G 8GB', Good: '0', Fair: '0', BER: '0', id: '90' },
        { name: 'Motorola Moto G (2nd Gen) 8GB', Good: '0', Fair: '0', BER: '0', id: '91' },
        { name: 'Motorola Moto G Dual SIM 8GB', Good: '0', Fair: '0', BER: '0', id: '92' },
        { name: 'Motorola Moto G Dual SIM 16GB', Good: '0', Fair: '0', BER: '0', id: '93' },
        { name: 'Motorola Razr V3xx 1GB', Good: '0', Fair: '0', BER: '0', id: '94' },
        { name: 'Oppo A5 (2020) 64GB', Good: '105', Fair: '40', BER: '15', id: '95' },
        { name: 'Oppo A5 (2020) 128GB', Good: '140', Fair: '45', BER: '20', id: '96' },
        { name: 'Oppo A5 (AX5) 32GB', Good: '20', Fair: '10', BER: '0', id: '97' },
        { name: 'Oppo A5 (AX5) 64GB', Good: '30', Fair: '15', BER: '0', id: '98' },
        { name: 'Oppo A7 32GB', Good: '25', Fair: '10', BER: '0', id: '99' },
        { name: 'Oppo A7 64GB', Good: '35', Fair: '15', BER: '0', id: '100' },
        { name: 'Samsung Galaxy A11 32GB', Good: '75', Fair: '35', BER: '15', id: '101' },
        { name: 'Samsung Galaxy A20 32GB', Good: '60', Fair: '25', BER: '10', id: '102' },
        { name: 'Samsung Galaxy A21 32GB', Good: '135', Fair: '65', BER: '25', id: '103' },
        { name: 'Samsung Galaxy A21 64GB', Good: '155', Fair: '75', BER: '30', id: '104' },
        { name: 'Samsung Galaxy A30 32GB', Good: '110', Fair: '50', BER: '20', id: '105' },
        { name: 'Samsung Galaxy A30 64GB', Good: '120', Fair: '60', BER: '25', id: '106' },
        { name: 'Samsung Galaxy A5 (2014) 16GB', Good: '20', Fair: '10', BER: '5', id: '107' },
        { name: 'Samsung Galaxy A5 (2016) 16GB', Good: '35', Fair: '15', BER: '5', id: '108' },
        { name: 'Samsung Galaxy A5 (2017) 32GB', Good: '45', Fair: '20', BER: '5', id: '109' },
        { name: 'Samsung Galaxy A5 (2017) 64GB', Good: '65', Fair: '30', BER: '15', id: '110' },
        { name: 'Samsung Galaxy A70 128GB', Good: '185', Fair: '80', BER: '35', id: '111' },
        { name: 'Samsung Galaxy A90 128GB', Good: '190', Fair: '85', BER: '40', id: '112' },
        { name: 'Samsung Galaxy J1 (2015) 4GB', Good: '5', Fair: '5', BER: '0', id: '113' },
        { name: 'Samsung Galaxy J1 (2016) 8GB', Good: '5', Fair: '5', BER: '0', id: '114' },
        { name: 'Samsung Galaxy J1 Mini  8GB', Good: '5', Fair: '5', BER: '0', id: '115' },
        { name: 'Samsung Galaxy J2  8GB', Good: '5', Fair: '5', BER: '0', id: '116' },
        { name: 'Samsung Galaxy J3 (2016) 8GB', Good: '5', Fair: '5', BER: '0', id: '117' },
        { name: 'Samsung Galaxy J3 (2016) 16GB', Good: '5', Fair: '5', BER: '0', id: '118' },
        { name: 'Samsung Galaxy Note 5  32GB', Good: '50', Fair: '20', BER: '10', id: '119' },
        { name: 'Samsung Galaxy Note 5  64GB', Good: '50', Fair: '20', BER: '10', id: '120' },
        { name: 'Samsung Galaxy Note 5  128GB', Good: '50', Fair: '20', BER: '10', id: '121' },
        { name: 'Samsung Galaxy Note 8  64GB', Good: '200', Fair: '90', BER: '25', id: '122' },
        { name: 'Samsung Galaxy Note 8  128GB', Good: '250', Fair: '100', BER: '25', id: '123' },
        { name: 'Samsung Galaxy Note 8  256GB', Good: '280', Fair: '120', BER: '25', id: '124' },
        { name: 'Samsung Galaxy Note 9  128GB', Good: '300', Fair: '140', BER: '35', id: '125' },
        { name: 'Samsung Galaxy Note 9  512GB', Good: '350', Fair: '150', BER: '35', id: '126' },
        { name: 'Samsung Galaxy Note 10+ 5G 256GB', Good: '450', Fair: '180', BER: '75', id: '127' },
        { name: 'Samsung Galaxy Note 10+ 5G 512GB', Good: '500', Fair: '200', BER: '90', id: '128' },
        { name: 'Samsung Galaxy S6  32GB', Good: '35', Fair: '15', BER: '5', id: '129' },
        { name: 'Samsung Galaxy S6  64GB', Good: '40', Fair: '15', BER: '5', id: '130' },
        { name: 'Samsung Galaxy S6  128GB', Good: '40', Fair: '15', BER: '5', id: '131' },
        { name: 'Samsung Galaxy S6 edge  32GB', Good: '45', Fair: '20', BER: '5', id: '132' },
        { name: 'Samsung Galaxy S6 edge  64GB', Good: '50', Fair: '20', BER: '5', id: '133' },
        { name: 'Samsung Galaxy S6 edge  128GB', Good: '60', Fair: '25', BER: '5', id: '134' },
        { name: 'Samsung Galaxy S6 edge+  32GB', Good: '55', Fair: '20', BER: '5', id: '135' },
        { name: 'Samsung Galaxy S6 edge+  64GB', Good: '60', Fair: '25', BER: '5', id: '136' },
        { name: 'Samsung Galaxy S7  32GB', Good: '65', Fair: '30', BER: '10', id: '137' },
        { name: 'Samsung Galaxy S7 edge  32GB', Good: '80', Fair: '35', BER: '10', id: '138' },
        { name: 'Samsung Galaxy S8  64GB', Good: '140', Fair: '60', BER: '20', id: '139' },
        { name: 'Samsung Galaxy S8+  64GB', Good: '170', Fair: '80', BER: '30', id: '140' },
        { name: 'Samsung Galaxy S9  64GB', Good: '220', Fair: '100', BER: '40', id: '141' },
        { name: 'Samsung Galaxy S9  128GB', Good: '240', Fair: '120', BER: '50', id: '142' },
        { name: 'Samsung Galaxy S9+  64GB', Good: '240', Fair: '120', BER: '50', id: '143' },
        { name: 'Samsung Galaxy S9+  256GB', Good: '280', Fair: '130', BER: '60', id: '144' },
        { name: 'Samsung Galaxy S10  128GB', Good: '350', Fair: '150', BER: '50', id: '145' },
        { name: 'Samsung Galaxy S10  512GB', Good: '380', Fair: '160', BER: '60', id: '146' },
        { name: 'Samsung Galaxy S10 5G 256GB', Good: '390', Fair: '160', BER: '70', id: '147' },
        { name: 'Samsung Galaxy S10 5G 512GB', Good: '420', Fair: '180', BER: '80', id: '148' },
        { name: 'Samsung Galaxy S10E 128GB', Good: '300', Fair: '120', BER: '40', id: '149' },
        { name: 'Samsung Galaxy S10E 256GB', Good: '320', Fair: '130', BER: '50', id: '150' },
        { name: 'Samsung Galaxy S20 128GB', Good: '480', Fair: '200', BER: '80', id: '151' },
        { name: 'Samsung Galaxy S20 5G 128GB', Good: '540', Fair: '220', BER: '90', id: '152' },
        { name: 'Samsung Galaxy S20 Ultra 5G 128GB', Good: '620', Fair: '280', BER: '100', id: '153' },
        { name: 'Samsung Galaxy S20 Ultra 5G 256GB', Good: '660', Fair: '300', BER: '110', id: '154' },
        { name: 'Samsung Galaxy S20 Ultra 5G 512GB', Good: '700', Fair: '320', BER: '120', id: '155' },
        { name: 'Samsung Galaxy S20+ 128GB', Good: '550', Fair: '200', BER: '80', id: '156' },
        { name: 'Samsung Galaxy S20+ 256GB', Good: '580', Fair: '220', BER: '90', id: '157' },
        { name: 'Samsung Galaxy S20+ 512GB', Good: '610', Fair: '230', BER: '100', id: '158' },
        { name: 'Samsung Galaxy S20+ 5G 128GB', Good: '580', Fair: '240', BER: '100', id: '159' },
        { name: 'Samsung Galaxy S20+ 5G 256GB', Good: '620', Fair: '250', BER: '110', id: '160' },
        { name: 'Samsung Galaxy S20+ 5G 512GB', Good: '660', Fair: '260', BER: '120', id: '161' },
        { name: 'Samsung Galaxy Tab A 8.0 (2017) 16GB', Good: '30', Fair: '10', BER: '5', id: '162' },
        { name: 'Samsung Galaxy Tab S6 10.5 4G 128GB', Good: '450', Fair: '200', BER: '50', id: '163' },
        { name: 'Samsung Galaxy Tab S6 10.5 4G 256GB', Good: '480', Fair: '220', BER: '50', id: '164' },
        { name: 'Sony Xperia Active 1GB', Good: '0', Fair: '0', BER: '0', id: '165' },
        { name: 'Sony Xperia arc S 1GB', Good: '0', Fair: '0', BER: '0', id: '166' },
        { name: 'Sony Xperia X Performance 32GB', Good: '40', Fair: '15', BER: '5', id: '167' },
        { name: 'Sony Xperia XA2 32GB', Good: '95', Fair: '30', BER: '10', id: '168' },
        { name: 'Sony Xperia XZ 32GB', Good: '35', Fair: '15', BER: '5', id: '169' },
        { name: 'Sony Xperia XZ 64GB', Good: '40', Fair: '15', BER: '5', id: '170' },
        { name: 'Sony Xperia XZ Premium 64GB', Good: '50', Fair: '20', BER: '5', id: '171' },
        { name: 'Sony Xperia XZ2 64GB', Good: '100', Fair: '40', BER: '10', id: '172' },
        { name: 'Sony Xperia Z5 32GB', Good: '15', Fair: '5', BER: '0', id: '173' },
        { name: 'ZTE Telstra Easy Call 2', Good: '0', Fair: '0', BER: '0', id: '174' },
        { name: 'ZTE Telstra Easy Call 3', Good: '0', Fair: '0', BER: '0', id: '175' },
        { name: 'ZTE Telstra Easy Call 4', Good: '0', Fair: '0', BER: '0', id: '176' },
        { name: 'ZTE Telstra Easy Discovery 3 20GB', Good: '0', Fair: '0', BER: '0', id: '177' },
        { name: 'ZTE Telstra Easy Discovery 4 20GB', Good: '0', Fair: '0', BER: '0', id: '178' },
        { name: 'ZTE Telstra Easy Discovery 7 20GB', Good: '0', Fair: '0', BER: '0', id: '179' },
        { name: 'ZTE Telstra Essential Pro 16GB', Good: '5', Fair: '5', BER: '0', id: '180' },
        { name: 'ZTE Telstra Essential Smart 8GB', Good: '4.5', Fair: '5', BER: '0', id: '181' },
        { name: 'ZTE Telstra Essential Smart 2 16GB', Good: '10', Fair: '5', BER: '0', id: '182' },
        { name: 'ZTE Telstra Explorer', Good: '0', Fair: '0', BER: '0', id: '183' },
        { name: 'ZTE Telstra Flip 3', Good: '5', Fair: '5', BER: '0', id: '184' },
        { name: 'ZTE Telstra Lite 4GB', Good: '5', Fair: '5', BER: '0', id: '185' },
        { name: 'ZTE Telstra Lite 8GB', Good: '5', Fair: '5', BER: '0', id: '186' },
        { name: 'ZTE Telstra Lite Smart 4GB', Good: '5', Fair: '5', BER: '0', id: '187' },
        { name: 'ZTE Telstra Pulse 1GB', Good: '0', Fair: '0', BER: '0', id: '188' },
        { name: 'ZTE Telstra Querty Touch', Good: '0', Fair: '0', BER: '0', id: '189' },
        { name: 'ZTE Telstra Roamer 128GB', Good: '0', Fair: '0', BER: '0', id: '190' },
        { name: 'ZTE Telstra Rush 4GB', Good: '0', Fair: '0', BER: '0', id: '191' },
        { name: 'ZTE Telstra Slim Plus - Blade L5 8GB', Good: '0', Fair: '0', BER: '0', id: '192' },
        { name: 'ZTE Telstra Smart Plus', Good: '0', Fair: '0', BER: '0', id: '193' },
        { name: 'ZTE Telstra Smart Touch', Good: '0', Fair: '0', BER: '0', id: '194' },
        { name: 'ZTE Telstra t100 40GB', Good: '0', Fair: '0', BER: '0', id: '195' },
        { name: 'ZTE Telstra T165i', Good: '0', Fair: '0', BER: '0', id: '196' },
        { name: 'ZTE Telstra T95 64GB', Good: '0', Fair: '0', BER: '0', id: '197' },
        { name: 'ZTE Telstra T96 30GB', Good: '0', Fair: '0', BER: '0', id: '198' },
        { name: 'ZTE Telstra Tempo', Good: '0', Fair: '0', BER: '0', id: '199' },
        { name: 'ZTE Telstra Tempo 4GB', Good: '0', Fair: '0', BER: '0', id: '200' },
        { name: 'ZTE Telstra Tough', Good: '0', Fair: '0', BER: '0', id: '201' },
        { name: 'ZTE Telstra Tough 3 130GB', Good: '0', Fair: '0', BER: '0', id: '202' },
        { name: 'ZTE Telstra Tough 4 1GB', Good: '0', Fair: '0', BER: '0', id: '203' },
        { name: 'ZTE Telstra Tough 5 8GB', Good: '15', Fair: '5', BER: '0', id: '204' },
        { name: 'ZTE Telstra Tough Max 2GB', Good: '0', Fair: '0', BER: '0', id: '205' },
        { name: 'ZTE Telstra Tough Max 2 32GB', Good: '25', Fair: '10', BER: '0', id: '206' }
      ]
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
      },
      bsb: {
        required,
        minLength: minLength(6),
        maxLength: 6
      },
      account: {
        required,
        minLength: minLength(7)
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
    },
    submitBuyback () {

    }
  },
  mounted () {
    this.initAF();
    this.shipping.account = '';
    this.shipping.bsb = ''
    this.shipping.country = 'AU';
    console.log('device id:' + this.$route.params.id + ', grade: ' + this.$route.params.grade);
    this.selected = this.phones.filter(phone => {
      return phone.id == this.$route.params.id
    })
    console.log(this.selected[0].name);
    switch (this.$route.params.grade) {
      case '1':
        this.deviceName = this.selected[0].name;
        this.deviceCondition = 'Good Condition';
        this.conditionDescription = 'The device is in good overall condition with little to no wear and tear';
        this.deviceValue = this.selected[0].Good;
        break;

      case '2':
        this.deviceName = this.selected[0].name;
        this.deviceCondition = 'Fair Condition';
        this.conditionDescription = 'The device is in fair overall condition with chips and/or scratches and other signs of wear and tear';
        this.deviceValue = this.selected[0].Fair;
        break;

      case '3':
        this.deviceName = this.selected[0].name;
        this.deviceCondition = 'Poor Condition';
        this.conditionDescription = 'The device is in poor overall condition with significant signs of wear and tear';
        this.deviceValue = this.selected[0].Poor;
        break;

      case '4':
        this.deviceName = this.selected[0].name;
        this.deviceCondition = 'No economical value';
        this.conditionDescription = 'The device is either iCloud/Google Account Locked or damaged beyond economical repair and will be recycled free of charge';
        this.deviceValue = this.selected[0].BER;
        this.account = false;
        break;
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~theme/css/base/text';
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $bg-secondary: color(secondary, $colors-background);
  $color-tertiary: color(tertiary);
  $color-secondary: color(secondary);
  $color-error: color(error);
  $color-white: color(white);
  $color-black: color(black);

  #checkout {
    @apply flex;
    .checkout--container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-left: 32px;
      margin-right: 32px;

      .checkout--contents {
        @apply mt-8;
        width: 100%;
        display: flex;
        justify-content: center;
        padding-bottom: 100px;
        .checkout--registration {
          @apply w-full;
          max-width: 400px;
        }
        .checkout--shipping, .checkout--delivery, .checkout--payment {
          @apply w-full;
          max-width: 572px;
          margin-top: 20px;

          @screen md {
            @apply mt-0;
          }

          @screen lg {
            padding: 0;
          }
        }
      }
    }
    .checkout--summary {
      @apply bg-grey-lighter hidden;
      // border-left: 5px solid #18b9a1;
      padding: 20px;
      min-height: 100vh;
      width: 400px;

      @screen md {
        @apply flex flex-col;
      }

      .summary--container {
        @apply h-full;
        margin-top: 5px;
        position: relative;

        .summary--header {
          @apply flex justify-center;
          color: #000;
          border-bottom: 1px solid #e7e7e7;
          margin-left: 20px;
          margin-right: 20px;
          h2 {
            font-size: 1.5rem;
            margin-bottom: 10px;
          }
        }
      }
    }

    .checkout--payment {
      .radioStyled {
        @apply mb-0;
        transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
        cursor: pointer;
        user-select: none;
        border: none;
        padding: 0;

        &.options--open {
        }

        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .checkmark {
          position: absolute;
          top: 0px;
          left: -30px;
          height: 19px;
          width: 19px;
          border-radius: 50%;
          border: 1px solid #bdbdbd;

          &:after {
            @apply bg-hulii-turquoise;
            content: "";
            position: absolute;
            display: none;
            top: 2px;
            left: 2px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
          }
        }

        input:checked ~ .checkmark:after {
          display: block;
        }
      }
    }

    .number-circle {
      width: 35px;
      height: 35px;

      @media (max-width: 768px) {
        width: 25px;
        height: 25px;
        line-height: 25px;
      }
    }
    .radioStyled {
      @apply mb-4;
      display: flex;
      position: relative;
      border: 1px solid #bdbdbd;
      border-radius: 5px;
      padding: 20px 20px 20px 43px;
      line-height: 18px;
      transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
      cursor: pointer;
      user-select: none;

      &.options--open {
      }

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }

      .checkmark {
        position: absolute;
        top: 30px;
        left: 9px;
        height: 19px;
        width: 19px;
        border-radius: 50%;
        border: 1px solid #bdbdbd;

        &:after {
          @apply bg-hulii-turquoise;
          content: "";
          position: absolute;
          display: none;
          top: 2px;
          left: 2px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
        }
      }

      input:checked ~ .checkmark:after {
        display: block;
      }
    }
  }

  .line {
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 37px;
      z-index: -1;
      width: 1px;
      height: 100%;
      background-color: $bg-secondary;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .checkout-title {
    @media (max-width: 767px) {
      background-color: $bg-secondary;
      margin-bottom: 25px;

      h1 {
        font-size: 36px;
      }
    }
  }

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

.contents--button--container {
        .contents--button {
          display: flex;
          justify-content: center;
          align-items: center;
          border-width: 1px;
          font-weight: 600;
          font-size: 1rem;
          line-height: 1;
          border-radius: 5px;
          padding: 0;
          box-shadow: inset 0 -3px 0 rgba(0, 0, 0, .15);
          transition: transform .1s ease-out;
          width: 250px;
          min-height: 48px;
          text-transform: capitalize;

          &:hover {
            box-shadow: inset 0 -100px 0 rgba(0,0,0,0.15);
          }

          &:active {
            box-shadow: inset 0 -100px 0 rgba(0,0,0,0.2);
            transform: scale(0.98);
            transition: transform .1s ease-out;
          }
        }
}

.hidden {
  display: none;
}

</style>
