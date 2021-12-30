<template>
  <section class="your-device">
    <div class="pb35">
      <form>
        <h4>Find your phone</h4>
        <p>Search for your model and storage</p>
        <!-- <input type="text" placeholder=""><i class="after-input material-icons">search</i> -->
        <vue-autosuggest
          :suggestions="filteredSuggestions"
          ref="autocomplete"
          :input-props="inputProps"
          :get-suggestion-value="getSuggestionValue"
          :section-configs="sectionConfigs"

          v-model="query"
        >
          <template slot-scope="{ suggestion }">
            <div>
              <b>{{ suggestion.item.name }}</b>
            </div>
          </template>
        </vue-autosuggest>
        <!-- :onSelected="onSelected" -->
        <!-- :renderSuggestion="renderSuggestion" -->
        <!-- :getSuggestionValue="getSuggestionValue" -->
        <!-- @input="onInputChange" -->
        <!-- @click="clickHandler" -->
      </form>
    </div>
    <div class="pb35">
      <form>
        <h4>Select phone condition</h4>
        <p>Please provide accurate information. Condition will be verified upon receipt</p>
        <div class="form-element pb10 flex flex-row">
          <div class="radio-label flex-8">
            <div class="elipse">
              <span>1</span>
            </div>
            <span class="label">Does the phone power on?</span>
          </div>
          <div class="yes-no">
            <input type="radio" v-model="power" id="power-true" :value="true"><label for="power-true"><span>Yes</span></label>
          </div>
          <div class="yes-no">
            <input type="radio" v-model="power" id="power-false" :value="false"><label for="power-false"><span>No</span></label>
          </div>
        </div>

        <div class="form-element pb10 flex flex-row">
          <div class="radio-label">
            <div class="elipse">
              <span>2</span>
            </div>
            <span class="label">Is your device bent, water-damaged, has LCD bleeding or a shattered screen/rear glass?</span>
          </div>
          <div class="yes-no">
            <input type="radio" v-model="screen" id="touch-true" :value="true"><label for="touch-true"><span>Yes</span></label>
          </div>
          <div class="yes-no">
            <input type="radio" v-model="screen" id="touch-false" :value="false"><label for="touch-false"><span>No</span></label>
          </div>
        </div>

        <div class="form-element pb10 flex flex-row">
          <div class="radio-label">
            <div class="elipse">
              <span>3</span>
            </div>
            <span class="label">Does your device have any chips or cracks on the screen?</span>
          </div>
          <div class="yes-no">
            <input type="radio" v-model="chips" id="functional-true" :value="true"><label for="functional-true"><span>Yes</span></label>
          </div>
          <div class="yes-no">
            <input type="radio" v-model="chips" id="functional-false" :value="false"><label for="functional-false"><span>No</span></label>
          </div>
        </div>

        <div style="clear:both" />
        <base-checkbox
          class="col-xs-12 mb10"
          id="shipToMyAddressCheckbox"
          v-model="unlocked"
        >
          {{ $t("Please confirm your device is not locked in anyway, otherwise we can only recycle it for free") }}
        </base-checkbox>
      </form>
    </div>
    <div style="float:clear" />

    <div class="align-center w-100">
      <h3>{{ deviceValue }}</h3>
    </div>
    <div class="align-center w-100">
      <div class="contents--button--container inline-block">
        <div>
          <router-link
            class="contents--button"
            :to="localizedRoute('/buyback/your-details/'+ id + '/' + grade)"
            :style="'color: #372767 ;background: #F4F4F4'"
            :disabled="btnDisabled"
          >
            {{ $t('Continue') }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest';
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox';

export default {
  data () {
    return {
      power: '',
      screen: '',
      chips: '',
      unlocked: false,
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
      ],
      // deviceValue: 0,
      suggestions: [],
      query: '',
      inputProps: {
        id: 'autosuggest__input',
        placeholder: 'Search for your phone',
        class: 'ddd'
      },
      sectionConfigs: {
        'default': {
          limit: 10,
          onSelected: selected => {
            this.selected = selected.item;
          }
        }
      },
      selected: '',
      id: '',
      grade: '',
      btnDisabled: true
    }
  },
  components: {
    BaseCheckbox,
    VueAutosuggest
  },
  computed: {
    filteredSuggestions () {
      return [
        {
          data: this.phones.filter(item => {
            return (
              item.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
            );
          })
        }
      ];
    },
    deviceValue () {
      if (this.selected) {
        if (this.power && !this.screen && !this.chips && this.unlocked) {
          this.btnDisabled = false;
          this.grade = 1;
          this.id = this.selected.id;
          return 'Your device is valued at: $' + this.selected.Good;
        }

        if (this.power && this.screen && !this.chips && this.unlocked) {
          this.btnDisabled = false;
          this.grade = 4;
          this.id = this.selected.id;
          return 'Your device does not have any economical value however we can still recycle it for free';
        }

        if (this.power && this.screen && this.chips && this.unlocked) {
          this.btnDisabled = false;
          this.grade = 4;
          this.id = this.selected.id;
          return 'Your device does not have any economical value however we can still recycle it for free';
        }

        if (!this.power && this.unlocked) {
          this.btnDisabled = false;
          this.grade = 4;
          this.id = this.selected.id;
          return 'Your device does not have any economical value however we can still recycle it for free';
        }

        if (this.power && !this.screen && this.chips && this.unlocked) {
          this.btnDisabled = false;
          this.grade = 2;
          this.id = this.selected.id;
          return 'Your device is valued at: $' + this.selected.Fair;
        }

        if (!this.unlocked) {
          this.btnDisabled = false;
          this.grade = 4;
          this.id = this.selected.id;
          return 'Your device has a lock applied to it and can only be recycled for free';
        }
      }
    }
  },
  methods: {
    clickHandler (item) {
      // event fired when clicking on the input
    },
    onSelected (item) {
      this.selected = item.name;
    },
    onInputChange (query) {
      // event fired when the input changes
      this.suggestions = [];
      const users = this.filterResults(this.phones, query, 'name');
      if (users.length) {
        this.suggestions = users;
      }

      console.log(this.suggestions)
    },
    /**
     * This is what the <input/> value is set to when you are selecting a suggestion.
     */
    getSuggestionValue (suggestion) {
      this.selected = suggestion.item;
      return suggestion.item.name;
    },
    renderSuggestion (suggestion) {
      console.log('hello');
      return suggestion.item.name;
    },
    focusMe (e) {
      console.log(e) // FocusEvent
    },
    filterResults (data, text, field) {
      return data
        .filter(item => {
          if (item[field].toLowerCase().indexOf(text.toLowerCase()) > -1) {
            return item[field];
          }
        })
        .sort();
    }
  }
}
</script>

<style lang="scss" scoped>
.your-device input[type=text] {
  background: #F4F4F4;
  border: none;
  border-radius: 15px;
  width: 95%;
  float: left;
  line-height: 56px;
  font-size: 32px;
  padding-left: 10px;
  height:56px;
}

.your-device {
  padding: 5% 10%;
}
.after-input {
  left: -44px;
  position: relative;
  line-height: 56px;
  color: #372767;
  font-size:32px;
  font-weight: bold;
}
.form-element {
  width:100%;
}
.radio-label {
  flex: 8;
  float:left;
  background-color: #F4F4F4;
  border-radius:5px;
  line-height: 56px;
  border: #F4F4F4 solid;
}
.form-element input[type=radio]{
    display:none;
}

.form-element input[type=radio] + label span{
    display:inline-block;
    background-color: #F4F4F4;
    width: 98%;
    line-height: 59px;
    border-radius: 5px;
    color: #372767;
    text-align: center;
    margin-left: 5px;
    // top:5px;
    border: #F4F4F4 solid;
}
.form-element input[type=radio]:checked + label span{
    border:#372767 solid;
}

.elipse {
// position: relative;
  float: left;
  width: 44px;
  height: 44px;
  left: 5px;
  top: 5px;
  border-radius: 22px;
  color: #FFFFFF;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
  line-height: 44px;
  background: #372767;
  position: relative;
}

.elipse > span {
  line-height: 48px;
  font-weight: bold;
  color: #FFFFFF;
  font-size: 24px;
  text-align: center;
}

.label {
  position:relative;
  left:10px;
  line-height: 56px;
  font-size: 24px;
  color: #372767;
  top:5px;
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

.yes-no {
  flex: 1;
  margin-left: 5px;
}

//       #autosuggest__input {
//   outline: none;
//   position: relative;
//   display: block;
//   border: 1px solid #616161;
//   padding: 10px;
//   width: 100%;
//   box-sizing: border-box;
//   -webkit-box-sizing: border-box;
//   -moz-box-sizing: border-box;
// }

// #autosuggest__input.autosuggest__input-open {
//   border-bottom-left-radius: 0;
//   border-bottom-right-radius: 0;
// }

// .autosuggest__results-container {
//   position: relative;
//   width: 100%;
// }

// .autosuggest__results {
//   font-weight: 300;
//   margin: 0;
//   position: absolute;
//   z-index: 10000001;
//   width: 100%;
//   border: 1px solid #e0e0e0;
//   border-bottom-left-radius: 4px;
//   border-bottom-right-radius: 4px;
//   background: white;
//   padding: 0px;
// }

// .autosuggest__results ul {
//   list-style: none;
//   padding-left: 0;
//   margin: 0;
// }

// .autosuggest__results .autosuggest__results-item {
//   cursor: pointer;
//   padding: 15px;
// }

// #autosuggest ul:nth-child(1) > .autosuggest__results_title {
//   border-top: none;
// }

// .autosuggest__results .autosuggest__results_title {
//   color: gray;
//   font-size: 11px;
//   margin-left: 0;
//   padding: 15px 13px 5px;
//   border-top: 1px solid lightgray;
// }

// .autosuggest__results .autosuggest__results-item:active,
// .autosuggest__results .autosuggest__results-item:hover,
// .autosuggest__results .autosuggest__results-item:focus,
// .autosuggest__results
//   .autosuggest__results-item.autosuggest__results-item--highlighted {
//   background-color: #F6F6F6;
// }

</style>
