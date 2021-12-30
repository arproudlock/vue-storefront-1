<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    id="product"
    class="container"
    itemscope
    itemtype="http://schema.org/Product"
  >
    <div class="product">
      <breadcrumbs
        class="product--breadcrumb"
        :routes="breadcrumbs.routes"
        :active-route="breadcrumbs.name"
      />
      <trustpilot-micro-score class="product--trustpilot" />
      <section class="product--gallery">
        <div v-if="gallery.length > 1" class="product--thumbnails">
          <ul class="list-reset">
            <li
              v-for="(images, index) in gallery"
              :key="images.src"
              class="mb-1"
              :class="currentGalleryPage === index ? 'chosen-thumbail' : ''"
            >
              <img
                :src="images.src"
                ref="images"
                @click="navigate(index)"
                :alt="product.name"
                class="block border cursor-pointer"
              >
            </li>
          </ul>
        </div>
        <product-gallery
          ref="gallery"
          :offline="image"
          :gallery="gallery"
          :configuration="configuration"
          :product="product"
          @page-change="page => (currentGalleryPage = page)"
        />
      </section>
      <section class="product--card">
        <!-- <div> -->
        <section class="row m0 between-xs">
          <div class="col-xs-12 col-md-5 data">
            <div class="seller--details">
              <div class="seller-name">
                {{ product.seller_name }}
              </div>
              <!-- <router-link class="seller--about" :to="localizedRoute(sellerRoute)" exact>
                {{ $t("See more about this seller") }}
              </router-link> -->
              <a href="#sellerinfo" class="seller--about">{{ $t("See more about this seller") }}</a>
            </div>
            <div class="card--header">
              <h1 v-if="(product.type_id == 'configurable' || typeof product.configurable_options !== 'undefined') && !loading"
                  class="header--name"
                  data-testid="productName"
                  itemprop="name"
              >
                {{ productTitle | htmlDecode }}
                <web-share
                  :title="prodName | htmlDecode"
                  text="Check this product!"
                  class="web-share"
                />
              </h1>
              <h1 v-else
                  class="header--name"
                  data-testid="productName"
                  itemprop="name"
              >
                {{ prodName | htmlDecode }}
                <web-share
                  :title="prodName | htmlDecode"
                  text="Check this product!"
                  class="web-share"
                />
              </h1>
              <div class="grade--area" v-if="product.type_id == 'simple'">
                <h2
                  class="header--grade"
                  @click="openConditionsExplanation()"
                >
                  Grade - {{ productGrade }}
                </h2>
                <div
                  class="grade-explainer"
                  @click="openConditionsExplanation()"
                >
                  <!-- <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path id="i" d="M11.184 9.936H12.784V18H11.184V9.936ZM12.912 6.416V8.112H11.04V6.416H12.912Z" fill="#2D2D2D" fill-opacity="1" stroke="none" />
                      <circle cx="12" cy="12" r="11" stroke="#2D2D2D" stroke-width="2" fill="none" /></svg> -->
                  <div class="delivery--text">
                    <div class="more-info" style="padding-left:3px">
                      {{ $t("Grade Explainer") }}
                    </div>
                  </div>
                </div>
              </div>
            </div><!-- Current Card Header End Div -->
            <div class="card--divider" />
            <div
              class="card--variants"
              v-if="(product.type_id == 'configurable' || typeof product.configurable_options !== 'undefined') && !loading"
            >
              <div
                class="error"
                v-if="
                  product.errors && Object.keys(product.errors).length > 0
                "
              >
                {{ product.errors | formatProductMessages }}
              </div>
              <div
                v-for="(option, index) in product.configurable_options"
                v-if="
                  (!product.errors ||
                    Object.keys(product.errors).length === 0) &&
                    Object.keys(configuration).length > 0
                "
                :key="'conf'+index"
              >
                <div
                  class="variants--label"
                  data-testid="variantsLabel"
                  v-if="option.label !== 'Grade'"
                >
                  {{ option.label }}:
                  <span class="label--selected">
                    {{
                      configuration[
                        option.attribute_code
                          ? option.attribute_code
                          : option.label.toLowerCase()
                      ].label
                    }}
                  </span>
                </div>

                <div class="variants--selectors">
                  <div class="selectors--header" v-if="option.label == 'Grade'">
                    <div
                      class="selectors--label"
                      data-testid="variantsLabel"
                    >
                      {{ $t("Grade") }}:
                      <span class="label--selected">
                        {{
                          configuration[
                            option.attribute_code
                              ? option.attribute_code
                              : option.label.toLowerCase()
                          ].label
                        }}
                      </span>
                    </div>
                    <div
                      class="selectors--help"
                      @click="openConditionsExplanation()"
                    >
                      {{ $t("Which one should I get?") }}
                    </div>
                  </div>
                  <!-- <div v-if="option.label == 'Colour'">
                        <color-selector
                          v-for="(c, i) in options[option.attribute_code]"
                          v-if="isOptionAvailable(c)"
                          :key="i"
                          :id="c.id"
                          :label="c.label"
                          context="product"
                          :code="option.attribute_code"
                          :class="{
                            active:
                              c.id == configuration[option.attribute_code].id
                          }"
                        />
                      </div> -->
                  <!-- <div class="sizes" v-else-if="option.label == 'Memory'">
                        <size-selector
                          v-for="(s, i) in options[option.attribute_code]"
                          v-if="isOptionAvailable(s)"
                          :key="i"
                          :id="s.id"
                          :label="s.label"
                          context="product"
                          :code="option.attribute_code"
                          class="mr10 mb10"
                          :class="{
                            active:
                              s.id == configuration[option.attribute_code].id
                          }"
                          v-focus-clean
                        />
                      </div> -->
                  <!-- <div
                        class="conditions"
                        v-if="option.label == 'Grade'"
                      >
                        <div class="selectors--header">
                          <div
                            class="selectors--label"
                            data-testid="variantsLabel"
                          >
                            {{ $t("Aesthetic Condition") }}
                          </div>
                          <div
                            class="selectors--help"
                            @click="openConditionsExplanation()"
                          >
                            {{ $t("Which one should I get?") }}
                          </div>
                        </div>
                        <div class="selectors--options">
                          <condition-selector
                            v-for="(s, i) in options[option.attribute_code]"
                            v-if="isOptionAvailable(s)"
                            :key="i"
                            :no-of-options="options[option.attribute_code].length"
                            :id="s.id"
                            :label="s.label"
                            :highlight="highlightColor"
                            context="product"
                            :code="s.attribute_code"
                            class="mr10 mb10"
                            :class="{
                              active: s.id == configuration[option.attribute_code].id
                            }"
                            v-focus-clean
                          />
                        </div>
                      </div> -->
                  <!-- v-if="isOptionAvailable(s)" -->
                  <div :class="option.attribute_code" class="selectors--options" v-if="option.label != ('Seller' || 'Grade')">
                    <generic-selector
                      v-for="(s, i) in options[option.attribute_code]"
                      :key="i"
                      :no-of-options="options[option.attribute_code].length"
                      :id="s.id"
                      :label="s.label"
                      :highlight="highlightColor"
                      context="product"
                      :code="s.attribute_code"
                      :disabled="isOptionAvailable(s) == false"
                      :active="s.id == configuration[option.attribute_code].id"
                      :class="{disabled: isOptionAvailable(s) == false}"
                      class="mr10 mb10"

                      v-focus-clean
                    />
                  </div>
                  <div class="selectors--options" v-else-if="option.label == 'Grade'">
                    <condition-selector
                      v-for="(s, i) in options[option.attribute_code]"

                      :key="i"
                      :no-of-options="options[option.attribute_code].length"
                      :id="s.id"
                      :label="s.label"
                      :highlight="highlightColor"
                      context="product"
                      :code="s.attribute_code"
                      :disabled="isOptionAvailable(s) == false"
                      :active="s.id == configuration[option.attribute_code].id"
                      :class="{disabled: isOptionAvailable(s) == false}"
                      class="mr10 mb10"
                      v-focus-clean
                    />
                  </div>
                  <div :class="option.attribute_code" class="selectors--options" v-if="option.label == 'Seller'">
                    <generic-selector
                      v-for="(s, i) in options[option.attribute_code]"
                      :key="i"
                      :no-of-options="options[option.attribute_code].length"
                      :id="s.id"
                      :label="s.label"
                      :highlight="highlightColor"
                      context="product"
                      :code="s.attribute_code"
                      :disabled="isOptionAvailable(s) == false"
                      :active="s.id == configuration[option.attribute_code].id"
                      :class="{disabled: isOptionAvailable(s) == false}"
                      class="mr10 mb10"

                      v-focus-clean
                    />
                  </div>
                </div>
              </div>
              <!-- Put Grade Last -->
              <!-- <div
                v-for="(option, index) in product.configurable_options"
                v-if="
                  (!product.errors ||
                    Object.keys(product.errors).length === 0) &&
                    Object.keys(configuration).length > 0
                "
                :key="index"
              >
                <div class="variants--selectors">
                  <div
                    class="conditions"
                    v-if="option.label == 'Grade'"
                  >
                    <div class="selectors--header">
                      <div
                        class="selectors--label"
                        data-testid="variantsLabel"
                      >
                        {{ $t("Aesthetic Condition") }}
                      </div>
                      <div
                        class="selectors--help"
                        @click="openConditionsExplanation()"
                      >
                        {{ $t("Which one should I get?") }}
                      </div>
                    </div>
                    <div class="selectors--options">
                      <condition-selector
                        v-for="(s, i) in options[option.attribute_code]"

                        :key="i"
                        :no-of-options="options[option.attribute_code].length"
                        :id="s.id"
                        :label="s.label"
                        :highlight="highlightColor"
                        context="product"
                        :code="s.attribute_code"
                        :disabled="isOptionAvailable(s) == false"
                        :active="s.id == configuration[option.attribute_code].id"
                        :class="{disabled: isOptionAvailable(s) == false}"
                        class="mr10 mb10"
                        v-focus-clean
                      />
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
            <!-- </div> Old Card Header End Div-->
          </div>
          <div
            class="card--divider"
            v-if="(product.type_id == 'configurable' || typeof product.configurable_options !== 'undefined') && !loading"
          />
          <!-- <div class="header--brand" v-if="product.brand">
                  {{ $t("Produced by") }}
                  <router-link
                    :to="localizedRoute(brandRoute)"
                    class="brand--label"
                    :class="'text-' + highlightColor"
                  >
                    {{ product.brand }}
                  </router-link>
                </div> -->
          <!-- <div class="seller--rating" v-if="product.product_reviews.count">
                  <star-rating
                    :stars="getRating(product.product_reviews.av_stars)"
                  /><span> ( {{ product.product_reviews.count }} reviews ) </span>
                </div>
                <div class="seller--rating" v-else>
                  No reviews yet
                </div> -->
          <!-- <trustpilot-product-mini :skus="product.tp_skus" :prodid="product.id" tpstyle="position:relative; max-width:160px;" :list="true" /> -->
        </section>
        <!-- </div> -->
        <div
          itemprop="offers"
          itemscope
          itemtype="http://schema.org/Offer"
        >
          <meta
            itemprop="priceCurrency"
            :content="currentStore.i18n.currencyCode"
          >
          <meta
            itemprop="price"
            :content="parseFloat(product.priceInclTax).toFixed(2)"
          >
          <meta
            itemprop="availability"
            :content="structuredData.availability"
          >
          <meta itemprop="url" :content="product.url_path">
          <!-- <div class="card--prices" v-if="product.type_id !== 'grouped'">
            <div
              class="h2 flex flex-col"
              v-if="
                product.special_price &&
                  product.priceInclTax &&
                  product.originalPriceInclTax
              "
            >
              <span
                class="price--special"
                :class="'text-' + highlightColor"
              >
                {{ (product.priceInclTax * product.qty) | price }}
              </span>
              <div class="price--original">
                <span class="original--text">
                  {{ $t("Original Price") }}:
                </span>
                <span class="original--price">
                  {{
                    (product.originalPriceInclTax * product.qty) | price
                  }}
                </span>
              </div>
              <div class="price--savings">
                <span class="savings--text"> {{ $t("You Save") }}: </span>
                <span class="savings--amount">
                  {{
                    (product.originalPriceInclTax - product.priceInclTax)
                      | price
                  }}
                  ({{
                    (
                      ((product.originalPriceInclTax -
                      product.priceInclTax) /
                      product.originalPriceInclTax) *
                      100
                    ).toFixed(0)
                  }}%)
                </span>
              </div>
            </div>
            <div
              class="h2 cl-mine-shaft weight-700"
              v-if="!product.special_price && product.priceInclTax"
            >
              {{
                product.qty > 0
                  ? product.priceInclTax * product.qty
                  : product.priceInclTax | price
              }}
            </div>
          </div> -->
          <div class="card--freebie">
            <div class="freebie--care">
              <svg width="20" style="min-width:20px;" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.99995 18.8889C18.0409 16.2833 17.7767 11.099 17.7767 11.099V3.41643C12.9809 3.21806 9.99995 1.11111 9.99995 1.11111C9.99995 1.11111 7.02479 3.21806 2.22317 3.41643V11.099C2.22317 11.099 1.95897 16.2887 9.99995 18.8889Z" stroke="#27CBA4" stroke-width="1.5" stroke-miterlimit="10" />
                <path d="M6.11084 9.29589L8.85241 11.8827L13.2369 6.91886" stroke="#27CBA4" stroke-width="1.5" stroke-miterlimit="10" />
              </svg>
              <div class="care--text">
                <span class="text--free">
                  {{ $t("12 Month Warranty") }}
                </span>
              </div>
            </div>
            <div class="freebie--delivery">
              <svg width="24" style="min-width:20px;" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2146 3.85714H18.8574L22.4289 8.5V13.5H20.6431M13.8574 13.5H16.3574" stroke="#27CBA4" stroke-width="1.5" />
                <path d="M8.5 13.5H13.2143C13.7666 13.5 14.2143 13.0523 14.2143 12.5V2C14.2143 1.44772 13.7666 1 13.2143 1H2C1.44771 1 1 1.44772 1 2V12.5C1 13.0523 1.44772 13.5 2 13.5H4.21429" stroke="#27CBA4" stroke-width="1.5" />
                <circle cx="6.35693" cy="13.5" r="1.75" stroke="#27CBA4" stroke-width="1.5" />
                <circle cx="18.5" cy="13.5" r="1.75" stroke="#27CBA4" stroke-width="1.5" />
                <path d="M17.0713 4.21429V8.5H22.4284" stroke="#27CBA4" stroke-width="1.5" />
                <path d="M22.4286 10.2857H21V11H22.4286" stroke="#27CBA4" stroke-width="1.5" />
              </svg>
              <div class="delivery--text">
                <span class="text--free">Free {{ product.shipping_type }} shipping:
                </span>
                <span>expect delivery in {{ product.shipping_from }} -
                  {{ product.shipping_to }} working days</span>
                <!-- <span>{{ $t('delivery in ') }}{{ getDays('freeshipping', 'minDays') }}-{{ getDays('freeshipping', 'maxDays') }} {{ $t('working days') }}</span> -->
              </div>
            </div>
          </div>

          <!-- <div class="grade-explainer" @click="openConditionsExplanation()">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="i"
                    d="M11.184 9.936H12.784V18H11.184V9.936ZM12.912 6.416V8.112H11.04V6.416H12.912Z"
                    fill="#2D2D2D"
                    fill-opacity="1"
                    stroke="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="#2D2D2D"
                    stroke-width="2"
                    fill="none"
                  />
                </svg>
                <div class="delivery--text">
                  <div class="selectors--help" style="padding-left: 0.5rem">
                    {{ $t("Grade Explainer") }}
                  </div>
                </div>
              </div> -->
          <product-links
            v-if="product.type_id == 'grouped' && !loading"
            :products="product.product_links"
          />
          <product-bundle-options
            v-if="
              product.bundle_options &&
                product.bundle_options.length > 0 &&
                !loading
            "
            :product="product"
          />
          <product-custom-options
            v-else-if="
              product.custom_options &&
                product.custom_options.length > 0 &&
                !loading
            "
            :product="product"
          />
          <div class="card--atc">
            <add-to-cart
              :product="product"
              :price="product.priceInclTax"
              :disabled="$v.product.qty.$error && !$v.product.qty.minValue"
              class="atc--button"
            />
            <div class="atc--payment">
              <img
                class="apple_pay_mark"
                src="/assets/components/payment/Apple_Pay_Mark.svg"
                v-lazy="'/assets/components/payment/Apple_Pay_Mark.svg'"
                alt="Apple Pay"
              >
              <img
                src="/assets/components/payment/google-pay-mark.svg"
                v-lazy="'/assets/components/payment/google-pay-mark.svg'"
                alt="Google Pay"
              >
              <img
                class="m-1"
                src="/assets/components/payment/visa.svg"
                v-lazy="'/assets/components/payment/visa.svg'"
                alt="Visa"
              >
              <img
                class="m-1"
                src="/assets/components/payment/american-express.svg"
                v-lazy="
                  '/assets/components/payment/american-express.svg'
                "
                alt="American Express"
              >
              <!-- <img
                    src="/assets/components/payment/paypal-grey.svg"
                    v-lazy="'/assets/components/payment/paypal-grey.svg'"
                    alt="Paypal"
                  > -->
              <img
                class="m-1"
                src="/assets/components/payment/mastercard.svg"
                v-lazy="'/assets/components/payment/mastercard.svg'"
                alt="Mastercard"
              >
            </div>
          </div>
          <div class="card--divider" />

          <div class="card--imapact--location">
            <div>
              <div
                class="card--impact"
                v-if="Object.keys(specifications).length > 0"
              >
                <span class="logo" />
                <span class="info">
                  <div class="title">{{ $t("Your impact") }}</div>
                  <div class="desc">
                    {{ specifications['e-Waste Avoided'] ? specifications['e-Waste Avoided'] : '50g' }} {{ $t(" of e-waste avoided") }}
                  </div>
                </span>
              </div>
              <div class="card--location">
                <span class="info">
                  <div class="title">{{ $t("Item location") }}</div>
                  <div class="desc">
                    {{ product.shipping_location }}
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- </div> Old End class Product Div-->
      <!-- </section> -->
      <!-- </div> -->
      <!-- </section> -->
      <!-- <section class="product--benefits">
        <div class="title">
          {{ $t("Shop with confidence. Hulii guarantees") }}
        </div>
        <div class="benefits--container">

          <a href="https://www.hulii.com/au/help-center/warranty" target="_blank" style="text-decoration:none;">
            <div class="benefits--item">

              <svg
                width="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9998 22.6666C21.649 19.54 21.332 13.3188 21.332 13.3188V4.0997C15.5769 3.86166 11.9998 1.33331 11.9998 1.33331C11.9998 1.33331 8.42964 3.86166 2.66771 4.0997V13.3188C2.66771 13.3188 2.35066 19.5464 11.9998 22.6666Z"
                  stroke="#2D2D2D"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
                <path
                  d="M7.33301 11.155L10.6229 14.2592L15.8843 8.30261"
                  stroke="#2D2D2D"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
              </svg>

              <h3>{{ $t("12 Months Warranty") }}</h3>

            </div>
          </a>
          <a href="https://www.hulii.com/au/help-center/returns" target="_blank" style="text-decoration:none;">
            <div class="benefits--item">
              <svg
                width="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5599 19.3879V19.3879C18.6402 19.3879 21.9479 16.0802 21.9479 12V12C21.9479 7.9197 18.6402 4.612 14.5599 4.612H11.9741"
                  stroke="#2D2D2D"
                  stroke-width="1.5"
                />
                <path
                  d="M14.2165 1.99996L11.6045 4.612L14.2165 7.22404"
                  stroke="#2D2D2D"
                  stroke-width="1.5"
                />
                <path
                  d="M9.38784 4.61201V4.61201C5.30758 4.61201 1.99988 7.91971 1.99988 12V12C1.99988 16.0802 5.30758 19.3879 9.38785 19.3879L11.9736 19.3879"
                  stroke="#2D2D2D"
                  stroke-width="1.5"
                />
                <path
                  d="M9.73122 22L12.3433 19.3879L9.73122 16.7759"
                  stroke="#2D2D2D"
                  stroke-width="1.5"
                />
              </svg>

              <h3>{{ $t("Free Easy Returns") }}</h3>
            </div>
          </a>
          <a href="https://www.hulii.com/au/help-center/shipping-and-delivery" target="_blank" style="text-decoration:none;">
            <div class="benefits--item">
              <svg width="24" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2146 3.85714H18.8574L22.4289 8.5V13.5H20.6431M13.8574 13.5H16.3574" stroke="#2D2D2D" stroke-width="1.5" />
                <path d="M8.5 13.5H13.2143C13.7666 13.5 14.2143 13.0523 14.2143 12.5V2C14.2143 1.44772 13.7666 1 13.2143 1H2C1.44771 1 1 1.44772 1 2V12.5C1 13.0523 1.44772 13.5 2 13.5H4.21429" stroke="#2D2D2D" stroke-width="1.5" />
                <circle cx="6.35693" cy="13.5" r="1.75" stroke="#2D2D2D" stroke-width="1.5" />
                <circle cx="18.5" cy="13.5" r="1.75" stroke="#2D2D2D" stroke-width="1.5" />
                <path d="M17.0713 4.21429V8.5H22.4284" stroke="#2D2D2D" stroke-width="1.5" />
                <path d="M22.4286 10.2857H21V11H22.4286" stroke="#2D2D2D" stroke-width="1.5" />
              </svg>

              <h3>{{ $t("Free Shipping") }}</h3>
            </div>
          </a>
        </div>
      </section> -->
      <section class="product--details">
        <div class="details--container">
          <div class="details--itb">
            <h2 class="details--title" v-if="product.description">
              {{ $t("Product Description") }}
            </h2>
            <div
              class="details--description"
              itemprop="description"
              v-html="product.description"
              v-if="product.description"
            />
            <br v-if="product.description">
          </div>
        </div>
      </section>
      <section class="product--details">
        <div class="details--container">
          <div class="details--itb">
            <!-- <h2 class="details--title" v-if="product.description">
              {{ $t("Product Description") }}
            </h2>
            <div
              class="details--description"
              itemprop="description"
              v-html="product.description"
              v-if="product.description"
            />
            <br v-if="product.description"> -->
            <h2 class="details--title">
              {{ $t("What's In The Box?") }}
            </h2>

            <div class="details--itb-contents">
              <li class="" v-for="(content, index) in inTheBox" :key="index">
                {{ content }}
              </li>
            </div>
          </div>

          <div id="sellerinfo" class="product--seller--info">
            <h2 class="details--title">
              {{ $t("Seller information") }}
            </h2>
            <div class="product--seller--name-main">
              <span class="seller--name">{{ product.seller_name }}</span>
              <span class="seller--rating" v-if="product.product_reviews.count"><star-rating :stars="getRating(product.product_reviews.av_stars)" /></span>
              <!-- <span class="seller--review" v-else>No reviews yet</span> -->

              <!-- <trustpilot-product-mini :skus="product.tp_skus" :prodid="product.id + 1" tpstyle="position:relative; max-width:160px;" :list="false" /> -->
            </div>
            <div class="seller-description">
              {{ product.seller_description }}
            </div>
            <router-link class="product--seller--info" :to="localizedRoute(sellerRoute)" exact>
              <div class="store-view">
                {{ $t("View store") }}
              </div>
            </router-link>
          </div>
        </div>
      </section>
      <section class="product--quality">
        <div class="quality--container">
          <div class="details--quality">
            <h2 class="details--title">
              {{ $t("Quality Guaranteed") }}
            </h2>
            <div class="quality--contents">
              <span class="contents--intro">
                {{ $t("This item is refurbished and shipped by") }}
              </span>
              <span class="contents--renewal-partner">
                {{ product.seller || "Hulii Australia" }}.
              </span>
              <span class="contents--renewal-partner">
                {{
                  $t(
                    "The following items have been checked by this renewal partner prior to shipping the item"
                  )
                }}:
              </span>
              <div class="flex flex-row mt-2">
                <div
                  v-for="(g, groupIndex) in qaListItems"
                  :key="groupIndex"
                  class="w-1/2 flex flex-col"
                >
                  <div
                    class="flex flex-row items-center"
                    v-for="(item, index) in g"
                    :set="
                      (ictr = groupIndex * qaListItems[0].length + (index + 1))
                    "
                    :key="index"
                  >
                    √<span class="flex ml-2">{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="product--banner">
            <div class="brand--image" v-lazy:background-image="getImageUrl(productBanners[0])">
              <div class="head-image-content">
                <h3 class="title" data-testid="mainSliderTitle">
                  {{ productBanners[0].fields.title }}
                </h3>
                <p
                  class="subtitle mb0 serif"
                  data-testid="mainSliderSubtitle"
                >
                  {{ productBanners[0].fields.content }}
                </p>
                <!-- <div class="align-center inline-flex">
                <button-outline :link="currentImage.link" color="light">
                  {{ currentImage.button_text }}
                </button-outline>
              </div> -->
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        class="product--hood"
        v-if="Object.keys(specifications).length !== 0"
      >
        <div class="product--divider" />
        <div class="hood--container">
          <h2 class="hood--title">
            {{ $t("Under The Hood") }}
          </h2>
          <div class="hood--contents">
            <div
              class="contents--item"
              v-for="(value, key) in specifications"
              :key="key"
            >
              <div class="item--key font-semibold">
                {{ key }}
              </div>
              <div class="item--value">
                {{ value }}
              </div>
            </div>
          </div>
        </div>
        <div class="product--divider" />
      </section>
      <section class="product--review">
        <div class="section--divider" />
        <p class="product--review--heading">
          {{ $t("Reviews") }}
        </p>
        <product-review :product="product" :options="options" />
      </section>
    </div>
    <!-- <trustpilot-product-seo :skus="product.tp_skus" :prodid="productId" /> -->
    <!-- <related-products type="upsell" :heading="$t('You Might Also Like')" /> -->
    <!-- <SizeGuide /> -->
    <!-- <recently-shopped-box v-if="store === 'au'" /> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { minValue } from 'vuelidate/lib/validators';
import Product from '@vue-storefront/core/pages/Product';
import VueOfflineMixin from 'vue-offline/mixin';
import RelatedProducts from 'theme/components/hulii/blocks/Product/Related.vue';
import AddToCart from 'theme/components/hulii/AddToCart.vue';
// import GenericSelector from 'theme/components/core/GenericSelector';
import GenericSelector from 'theme/components/hulii/blocks/Product/GenericSelector';
import ConditionSelector from 'theme/components/hulii/blocks/Product/ConditionSelector';
import ColorSelector from 'theme/components/hulii/blocks/Product/ColorSelector.vue';
import SizeSelector from 'theme/components/core/SizeSelector.vue';
import Breadcrumbs from 'theme/components/hulii/Breadcrumbs.vue';
import ProductAttribute from 'theme/components/core/ProductAttribute.vue';
import ProductLinks from 'theme/components/core/ProductLinks.vue';
import ProductCustomOptions from 'theme/components/core/ProductCustomOptions.vue';
import ProductBundleOptions from 'theme/components/core/ProductBundleOptions.vue';
import ProductGallery from 'theme/components/hulii/ProductGallery';
// import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers';
import focusClean from 'theme/components/theme/directives/focusClean';
import WebShare from '@vue-storefront/core/modules/social-share/components/WebShare';
// import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber';
// import SizeGuide from 'theme/components/core/blocks/Product/SizeGuide';
import { mapState } from 'vuex';
import ProductMixin from 'theme/mixins/product';
import countryInformation from 'theme/resource/country-information.json';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
// import TrustpilotMicroStar from 'theme/components/hulii/blocks/Trustpilot/TrustpilotMicroStar';
import TrustpilotMicroScore from 'theme/components/hulii/blocks/Trustpilot/TrustpilotMicroScore';
import dummy from '../resource/dummy.json';
import StarRating from '../components/hulii/StarRating.vue';
import ProductReview from '../components/hulii/ProductReview.vue';
// import ViewMore from '../components/hulii/ViewMore.vue';
// import LoadMore from '../components/hulii/LoadMore.vue';
import RecentlyShoppedBox from 'src/modules/recently-shopped/components/RecentlyShoppedBox'

export default {
  components: {
    // WishlistButton: () =>
    // import(/* webpackChunkName: "wishlist" */ 'theme/components/core/blocks/Wishlist/AddToWishlist'),
    AddToCart,
    Breadcrumbs,
    // ColorSelector,
    GenericSelector,
    // ProductAttribute,
    ProductBundleOptions,
    ProductCustomOptions,
    ProductGallery,
    ProductLinks,
    // PromotedOffers,
    // RelatedProducts,
    // SizeSelector,
    WebShare,
    // BaseInputNumber,
    // SizeGuide,
    ConditionSelector,
    TrustpilotMicroScore,
    // TrustpilotMicroCount,
    StarRating,
    ProductReview,
    // ViewMore,
    // LoadMore,
    // TrustpilotProductMini,
    // TrustpilotProductSeo,
    // RecentlyShoppedBox
  },
  mixins: [Product, VueOfflineMixin, ProductMixin],
  data () {
    const storeView = currentStoreView();
    return {
      // store: currentStoreView().storeCode,
      detailsOpen: false,
      currentGalleryPage: 0,
      store: storeView.storeCode,
      // seller: dummy.seller,
      popupEnable: false,
      prodName: null
      // productGrade: null
    };
  },
  directives: { focusClean },
  computed: {
    ...mapState({
      highlightColor: state => state.ui.highlightColor
    }),
    structuredData () {
      return {
        availability: this.product.stock.is_in_stock ? 'InStock' : 'OutOfStock'
      };
    },
    sellerRoute () {
      let url;
      if (this.product.seller_id) {
        url = '/Seller/' + this.product.seller_id;
      } else {
        url = '';
      }
      return url;
    },
    shipping () {
      return this.popupEnable ? 'Express Shipping' : 'Shipping';
    },
    productBanners () {
      return this.$store.state.productpage.productBanners
    },
    productTitle () {
      let result;
      if (this.product.meta_title) {
        result = this.splitGrade(this.product.meta_title);
      } else {
        result = this.splitGrade(this.product.name);
      }
      return result.name;
    },
    productGrade () {
      let result = this.splitGrade(this.product.meta_title);
      return result.grade;
    }

  },
  beforeMount () {
    this.$bus.$on('carousel-page-change', this.selectThumbnail);
    // this.splitGrade();
  },
  mounted () {
    let categories = this.product.url_path.split('/');
    let slug = categories.pop();
    let ga4Item = {
      item_id: this.product.sku,
      item_name: this.product.name,
      currency: 'AUD',
      item_brand: this.product.brand,
      item_category: categories[0] ? categories[0] : null,
      item_category1: categories[1] ? categories[1] : null,
      item_category2: categories[2] ? categories[2] : null,
      item_category3: categories[3] ? categories[3] : null,
      item_category4: categories[4] ? categories[4] : null,
      item_category5: categories[5] ? categories[5] : null,
      item_category6: categories[6] ? categories[6] : null,
      price: this.product.priceInclTax,
      shipping_type: this.product.shipping_type,
      quantity: this.product.qty,
      seller: this.product.seller
    };
    // console.log(ga4Item);
    window.gtag('event', 'view_item', {
      currency: 'AUD',
      value: this.product.priceInclTax,
      items: ga4Item
    });
  },
  beforeDestroy () {
    this.$bus.$off('carousel-page-change', this.selectThumbnail);
  },
  async asyncData ({store, route}) {
    const productBannerResult = await store.dispatch('contentful/list', {
      limit: 1,
      contentType: 'productBanner'
    })

    if (productBannerResult.code === 200) {
      store.state.productpage.productBanners = productBannerResult.result.items
    }
  },
  methods: {
    getDays (methodCode, type) {
      let days = '';
      let country = this.store === '' ? 'us' : this.store;
      if (methodCode === 'freeshipping') {
        days = countryInformation[country]['shipping']['standard'][type] - 1;
        return days;
      } else if (methodCode === 'flatrate') {
        days = countryInformation[country]['shipping']['express'][type] - 1;
        return days;
      }
    },
    selectThumbnail (index) {
      this.currentGalleryPage = index;
    },
    navigate (index) {
      if (this.$refs.gallery.$refs.galleryCarousel.$refs.carousel) {
        this.$refs.gallery.$refs.galleryCarousel.$refs.carousel.goToPage(index);
      }
    },
    showDetails (event) {
      this.detailsOpen = true;
      event.target.classList.add('hidden');
    },
    notifyOutStock () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t(
          'The product is out of stock and cannot be added to the cart!'
        ),
        action1: { label: this.$t('OK') }
      });
    },
    notifyWrongAttributes () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t(
          'No such configuration for the product. Please do choose another combination of attributes.'
        ),
        action1: { label: this.$t('OK') }
      });
    },
    openSizeGuide () {
      this.$bus.$emit('modal-show', 'modal-sizeguide');
    },
    splitGrade (name) {
      var result = {};
      if (name.indexOf('- Pristine') > -1) {
        let gradeIndex = name.indexOf('- Pristine');
        result.name = name.replace('- Pristine', '');
        result.grade = 'Pristine';
      }
      if (name.indexOf('- Excellent') > -1) {
        let gradeIndex = name.indexOf('- Excellent');
        result.name = name.replace('- Excellent', '');
        result.grade = 'Excellent';
      }
      if (name.indexOf('- Good') > -1) {
        let gradeIndex = name.indexOf('- Good');
        result.name = name.replace('- Good', '');
        result.grade = 'Good';
      }
      if (name.indexOf('- Fair') > -1) {
        let gradeIndex = name.indexOf('- Fair');
        result.name = name.replace('- Fair', '');
        result.grade = 'Fair';
      }
      // console.log(result);
      return result;
    },
    getImageUrl (data) {
      const imageKitUrl = 'https://ik.imagekit.io/yi7qlqdvr/contentful'
      const removeUrl = '//images.ctfassets.net/i6qgzr9t1bem'
      const contentfulUrl = data ? data.fields.productBannerImage.fields.file.url.replace(removeUrl, '') : ''
      return imageKitUrl + contentfulUrl
    },
    showPopup (value) {
      // console.log('enablePOP||', value);
      this.popupEnable = value;
    }
  },
  validations: {
    product: {
      qty: {
        minValue: minValue(1)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~theme/css/variables/colors";
@import "~theme/css/helpers/functions/color";
$color-primary: color(primary);
$color-tertiary: color(tertiary);
$color-secondary: color(secondary);
$color-white: color(white);
$bg-secondary: color(secondary, $colors-background);

#product {
  margin-top: 20px;
}

.product {
  position: relative;
  grid-template-areas:
    "b b b b"
    "t t t t"
    "i i i i"
    "c c c c"
    "benefits benefits benefits benefits"
    "details details details details"
    "product-quality product-quality product-quality product-quality"
    "hood hood hood hood"
    "product-review product-review product-review product-review";
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 8px;

  .product--breadcrumb {
    justify-self: flex-start;
    margin-bottom: 18px;
    grid-area: b;
    display: flex;
    box-sizing: border-box;
    position: relative;
    flex-wrap: wrap;
  }

  .product--trustpilot {
    @apply justify-center;
    margin-bottom: 18px;
    grid-area: t;
    display: flex;
    box-sizing: border-box;
    position: relative;
    flex-wrap: wrap;
  }

  .product--gallery {
    width: auto;
    grid-area: i;
    display: flex;
    visibility: visible;
    opacity: 1;
    transition-property: opacity, visibility;
    transition-duration: 0ms;
    transition-delay: 200ms;

    .product--thumbnails {
      display: none;
      margin-right: 16px;
      max-width: 98px;
      li {
        padding: 5px;

        &.chosen-thumbail {
          border-width: 2px;
          border-style: solid;
          border-image: initial;
          border-radius: 15px;
          border-color: rgb(225, 225, 225);
        }
        img {
          @apply w-full;
        }
      }
    }
  }

  .product--card {
    grid-area: c;
    .seller--details {
      .seller-name {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 5px;
        margin-top: 30px;
      }
      .seller--about {
        color: #6c6b6b;
        text-decoration-line: underline;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .seller--rating {
      display:flex;
      gap:5px;
    }
    .card--header {
      @apply mb-6;

      .header--name {
        display: flex;
        text-align: left;
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }

      .grade--area {
        display: flex;
        flex-direction: row;
      }

      .header--grade {
        display: flex;
        text-align: left;
        font-size: 1.3rem;
        color: #56ccf2;
        cursor: pointer;
      }

      .header--brand {
        margin-bottom: 0.5rem;
        .brand--label {
          font-weight: 600;
        }
      }
    }

    .card--prices {
      @apply mb-6;
      .price--special {
        font-weight: 700;
      }
      .price--original {
        @apply text-grey;
        line-height: 12px;
        .original--text {
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-right: 5px;
        }
        .original--price {
          text-decoration: line-through;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
      }
      .price--savings {
        line-height: 12px;
        .savings--text {
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-right: 5px;
          color: black;
          line-height: 12px;
        }
        .savings--amount {
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: black;
        }
      }
      .card--misc {
        margin-top: 0.5rem;
        display: flex;
        .free--care {
          color: #2d2d2d;
          margin-right: 1rem;
          width: 20vw;
        }
        .more-info {
          color: #6c6b6b;
          text-decoration-line: underline;
          cursor: pointer;
        }
      }
    }
    .card--freebie {
      @apply flex;
      @apply flex-col;
      @apply mb-6;
      .freebie--care {
        @apply flex;
      @apply flex-row;
      @apply mb-1;

        svg {
          @apply mr-2;
        }

        .care--text {
          align-self: center;
          .text--free {
            color: #2d2d2d;
          }
        }
      }
      .freebie--delivery {
        @apply flex;
      @apply flex-row;

        svg {
          height: 24px;
          width: 24px;
          @apply mr-2;
        }

        .delivery--text {
          align-self: center;
          .text--free {
            color: #2d2d2d;
          }
        }
      }
    }
    .grade-explainer {
      display: inline-flex;
      flex-direction: row;
      // width: 100%;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      // padding-bottom: 10px;
      margin-left: 10px;

      .more-info {
        color: #6c6b6b;
        text-decoration-line: underline;
        cursor: pointer;
      }
    }
    .card--divider {
      @apply w-full;
      @apply bg-grey-light;
      @apply mb-6;
      height: 1px;
    }
    .card--variants {
      @apply mb-6;
      .variants--label {
        @apply mb-4;
        font-weight: 800;
        line-height: 12px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-size: 12px;

        .label--selected {
          font-weight: 500;
        }
      }
      .variants--selectors {
        .selectors--header {
          @apply flex;
          @apply flex-col;
          @apply mb-4;
          .selectors--label {
            display: flex;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            align-items: center;
            .label--selected {
              font-weight: 500;
            }
          }
          .selectors--help {
            @apply text-grey;
            @apply cursor-pointer;
            font-weight: 600;

            &:hover {
              text-decoration: underline;
            }
          }
        }
        .selectors--options {
          @apply flex;
          @apply flex-row;
          // @apply justify-between;
          // overflow-x: auto;
          flex-wrap: wrap;
        }
      }

      .selectors--header {
          @apply flex;
          @apply flex-col;
          @apply mb-4;
          .selectors--label {
            display: flex;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            align-items: center;
          }
          .selectors--help {
            @apply text-grey;
            @apply cursor-pointer;
            font-weight: 600;

            &:hover {
              text-decoration: underline;
            }
          }
        }
    }
    .card--atc {
      @apply w-full;
      @apply mb-4;
      .atc--button {
        @apply w-full;
        @apply mb-4;
      }
      .atc--payment {
        width: 100%;
        margin: 0px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          height: 50px;
          opacity: 0.575;
        }
        .apple_pay_mark {
          height: 30px !important;
        }
        @screen md {
          width: 80%;
        }
      }
    }
    .card--imapact--location {
      div {
        display: flex;
        .card--impact {
          border-radius: 4px;
          background-color: rgba(29, 177, 157, 0.1);
          padding: 1rem;
          margin-right: 1rem;
          width: 225px;
        }
        .card--location {
          border: 1px solid #efefef;
          box-sizing: border-box;
          border-radius: 4px;
          padding: 1rem;
          width: 225px;
        }
        .title {
          font-weight: 600;
          padding-bottom: 0.25rem;
        }
      }
    }
  }
  .product--divider {
    @apply w-full;
      @apply bg-grey-light;
      @apply mb-8;
    height: 1px;
  }
  .product--benefits {
    grid-area: benefits / benefits / benefits / benefits;
    box-sizing: border-box;
    position: relative;
    .title {
      color: #2d2d2d;
    }
    .benefits--container {
      @apply w-full;
      display: grid;
      grid-template-columns: auto;
      visibility: visible;
      opacity: 1;
      transform: scale(1);
      gap: 16px 16px;
      justify-items: start;
      transition: all 0.3s cubic-bezier(0, 0, 0.2, 1) 0s;

      @screen md {
      @apply w-full;
      display: grid;
      grid-template-columns: auto auto auto;
      visibility: visible;
      opacity: 1;
      transform: scale(1);
      gap: 16px 16px;
      justify-items: start;
      transition: all 0.3s cubic-bezier(0, 0, 0.2, 1) 0s;
      }

      .benefits--item {
        @apply items-center;
        user-select: none;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px,
          rgba(0, 0, 0, 0.13) 0px 0px 0px;
        transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
        display: flex;
        flex-direction: row-wrap;
        gap: 2px;
        text-align: center;
        border-radius: 8px;
        h3 {
          font-size: 16px;
        }

        img {
          max-width: 70px;
          height: 100px;
        }

        &.item--shipping {
          @apply text-hulii-pink;
        }
        &.item--warranty {
          @apply text-hulii-purple;
        }
        &.item--returns {
          @apply text-hulii-yellow;
        }
      }
    }
  }
  .product--details {
    padding: 2rem 0;
    grid-area: details;
    background-color: #fafafb;
    box-shadow: -20rem 0 #fafafb, 40rem 0 #fafafb;

    .details--container {
      grid-template-areas:
        "inthebox"
        "seller-info";
      grid-row-gap: 32px;
      display: grid;
      grid-column-gap: 48px;

      .details--itb {
        grid-area: inthebox;

        // .details--description {
        // }
        // .details--itb-contents {
        // }
      }
      .product--seller--info {
        grid-area: seller-info;
        // cursor: pointer;
        .product--seller--name-main {
          display: flex;
          span {
            padding-right: 8px;
          }
          .seller--review {
            font-size: 0.9rem;
            color: #6c6b6b;
            text-decoration-line: underline;
          }
        }
        .seller-description {
          color: #6c6b6b;
          margin-top: 15px;
        }
        .store-view {
          margin-top: 15px;
          color: #372768;
          font-weight: 600;
        }
      }
      .details--title {
        @apply text-h2;
      @apply mt-0;
      }
    }
  }
  .product--quality {
    @apply mb-8;
    grid-area: product-quality;
    .quality--container {
      grid-template-areas: "quality" "banner";
      grid-row-gap: 32px;
      display: grid;
      grid-column-gap: 48px;

      .details--quality {
        grid-area: quality;
        .details--title {
          font-size: 24px;
        }
        .quality--contents {
          width: 100%;
        }
      }

      .product--banner {
        grid-area: banner;
        padding: 5%;
        margin: 0 auto;
        .brand--image__container {
          @apply w-full;
          overflow: hidden;
          border-radius: 15px;
          height: 200px;

          a {
            height: 100%;
            width: 100%;

            .brand--image {
              background-repeat: no-repeat;
              background-position: 50%;
              background-size: cover;
              width: 100%;
              height: 100%;
            }
          }

          .brand--image {
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: cover;
            width: 100%;
            height: 100%;
          }
        }
        .brand--image {
          width: 280px;
          height: 158px;
          background-size: cover;
          background-position: center;

          .head-image-content {
            color: white;
            padding: 5% 15% 5% 5%;

            .title {
              font-size: 16px;
            }

            .subtitle {
              font-size: 10px;
            }
          }
        }

      }

    }

  }
  .product--review {
    @apply mb-8;
    grid-area: product-review;
    .product--review--heading {
      font-size: 24px;
      color: #2d2d2d;
      font-weight: 800;
    }
  }
  .product--hood {
    grid-area: hood;
    .hood--container {
      .hood--title {
        @apply text-h2;
      @apply mt-0;
      }
      .hood--contents {
        @apply flex;
      @apply flex-wrap;
        > .contents--item {
          @apply flex;
      @apply flex-col;
      @apply w-1/2;
      @apply mb-8;
        }
      }
    }
  }

  @screen sm {
    .product--card {
      .card--variants .variants--selectors .selectors--header {
        @apply flex-row;
      @apply justify-between;
      }
      .seller--details {
      .seller-name {
        margin-top: 30px;
      }
    }
    }
  }
  @screen md {
    .product--hood {
      .hood--container {
        .hood--contents {
          > .contents--item {
            @apply w-1/4;
          }
        }
      }
    }
  }
  @screen lg {
    grid-template-areas:
      "b b b b b b b b b t t t"
      "i i i i i i . c c c c c"
      "benefits benefits benefits benefits benefits benefits benefits . product-detail-card product-detail-card product-detail-card product-detail-card"
      "details details details details details details details details details details details details"
      "product-quality product-quality product-quality product-quality product-quality product-quality product-quality product-quality product-quality product-quality product-quality product-quality"
      "hood hood hood hood hood hood hood hood hood hood hood hood"
      "product-review product-review product-review product-review product-review product-review product-review product-review product-review product-review product-review product-review";
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 16px;

    .product--trustpilot {
      @apply justify-end;
    }
    .product--thumbnails {
      display: flex;
    }
    .product--gallery,
    .product--card {
      margin: 24px 0px;
    }
    .product--benefits {
      @apply mt-0 mb-8;

      h3 {
        // font-size: 1.5rem !important;
      }
    }
    .product--details {
      .details--container {
        grid-template-areas: "inthebox seller-info";
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .product--quality {
    .quality--container {
      grid-template-areas: "quality banner";
      grid-template-columns: repeat(2, 1fr);

      .details--quality {
        grid-area: quality;
        .details--title {
          font-size: 24px;
        }
        // .quality--contents {
        //   width: 50%;
        // }
      }

      .product--banner {
      .brand--image {
          width: 560px;
          height: 316px;
          background-size: cover;
          background-position: center;

            .head-image-content {
              color: white;
              padding: 5% 15% 5% 10%;

              .title {
                font-size: 24px;
              }

              .subtitle {
                font-size: 16px;
              }
            }
          }
      }
    }
    }

  }
}
.related-products {
  @apply mb-8;
}
.section--divider {
  @apply w-full;
      @apply bg-grey-light;
      @apply mb-8;
  height: 1px;
}

.error {
  color: red;
  font-weight: bold;
  padding-bottom: 15px;
}
.data {
  @media (max-width: 767px) {
    border-bottom: 1px solid $bg-secondary;
  }
}

.image {
  @media (max-width: 1023px) {
    margin-bottom: 20px;
  }
}

.product-name {
  @media (max-width: 767px) {
    font-size: 36px;
  }
}

.price {
  @media (max-width: 767px) {
    color: $color-primary;
  }
}

.variants-label {
  @media (max-width: 767px) {
    font-size: 14px;
  }
}

.variants-wrapper {
  @media (max-width: 767px) {
    padding-bottom: 30px;
  }

  .sizes {
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  .size-guide {
    height: 40px;
    @media (max-width: 767px) {
      width: 100%;
      margin-left: 0;
    }
  }
}

.product-top-section {
  @media (max-width: 767px) {
    padding: 0;
    background-color: $color-white;
  }
}

.add-to-buttons {
  @media (max-width: 767px) {
    padding-top: 30px;
    margin-bottom: 40px;
  }
}

.details {
  @media (max-width: 767px) {
    padding: 50px 15px 15px;
  }
}

.details-title {
  padding: 0 8px;

  @media (max-width: 767px) {
    font-size: 18px;
    margin: 0;
  }
}

.details-wrapper {
  @media (max-width: 767px) {
    position: relative;
    max-height: 140px;
    overflow: hidden;
    transition: all 0.3s ease;
    font-size: 14px;
  }

  &--open {
    max-height: none;
  }
}

.details-overlay {
  @media (max-width: 767px) {
    position: absolute;
    height: 75%;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0;
    cursor: pointer;
    background: linear-gradient(rgba($color-white, 0), rgba($color-white, 1));
    &.hidden {
      display: none;
    }
  }
}

.price-original {
  text-decoration: line-through;
}

.action {
  &:hover {
    color: $color-tertiary;
  }
}

.attributes {
  list-style-type: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.product-image {
  mix-blend-mode: multiply;
  width: 460px;
}

.web-share {
  float: right;
}

</style>
