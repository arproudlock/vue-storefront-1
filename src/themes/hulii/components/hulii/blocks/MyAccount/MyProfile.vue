<template>
  <div class="my-profile">
    <!-- My profile header -->
    <div class="my-profile--header">
      <h3 class="header--title">
        {{ $t('My Profile') }}
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
    <!-- My profile body (edit mode) -->
    <div class="my-profile--form" v-if="isEdited">
      <base-input
        class="form--item"
        type="text"
        name="first-name"
        autocomplete="given-name"
        :placeholder="$t('First name')"
        v-model.trim="currentUser.firstname"
        @input="$v.currentUser.firstname.$touch()"
        :validations="[
          {
            condition: !$v.currentUser.firstname.required,
            text: $t('Field is required')
          },
          {
            condition: !$v.currentUser.firstname.minLength,
            text: $t('Name must have at least 2 letters.')
          }
        ]"
      />
      <base-input
        class="form--item"
        type="text"
        name="last-name"
        autocomplete="family-name"
        :placeholder="$t('Last name')"
        v-model.trim="currentUser.lastname"
        @input="$v.currentUser.lastname.$touch()"
        :validations="[{
          condition: !$v.currentUser.lastname.required,
          text: $t('Field is required')
        }]"
      />
      <base-input
        class="form--item"
        type="email"
        name="email-address"
        autocomplete="email"
        :placeholder="$t('Email address')"
        v-model="currentUser.email"
        :validations="[
          {
            condition: !$v.currentUser.email.required,
            text: $t('Field is required')
          },
          {
            condition: !$v.currentUser.email.email,
            text: $t('Please provide valid e-mail address.')
          }
        ]"
      />
      <!-- Change password (edit mode) -->
      <base-checkbox
        class="form--item"
        id="changePassword"
        v-model="changePassword"
      >
        {{ $t('Change my password') }}
      </base-checkbox>
      <template v-if="changePassword">
        <base-input
          class="form--item"
          type="password"
          name="old-password"
          autocomplete="current-password"
          :placeholder="$t('Current password *')"
          v-model="oldPassword"
          @input="$v.oldPassword.$touch()"
          :validations="[{
            condition: !$v.oldPassword.required && $v.oldPassword.$error,
            text: $t('Field is required')
          }]"
        />

        <div class="hidden-xs hidden-sm col-md-6 mb15 mt10" />

        <base-input
          class="form--item"
          type="password"
          name="password"
          autocomplete="new-password"
          :placeholder="$t('New password *')"
          v-model="password"
          @input="$v.password.$touch()"
          :validations="[{
            condition: !$v.password.required && $v.password.$error,
            text: $t('Field is required')
          }]"
        />
        <base-input
          class="form--item"
          type="password"
          name="password-confirm"
          autocomplete="new-password"
          :placeholder="$t('Repeat new password *')"
          v-model="rPassword"
          @input="$v.rPassword.$touch()"
          :validations="[
            {
              condition: !$v.rPassword.required && $v.rPassword.$error,
              text: $t('Field is required')
            },
            {
              condition: !$v.rPassword.sameAsPassword,
              text: $t('Passwords must be identical.')
            }
          ]"
        />
      </template>
      <div class="my-profile--button">
        <full-button bg-color="hulii-turquoise" text="Update" size="large" @click.native="updateProfile" :disabled="checkValidation()" />
      </div>
      <div class="my-profile--cancel">
        <a href="#" @click="exitSection" class="">
          {{ $t('Cancel') }}
        </a>
      </div>
    </div>

    <!-- My profile summary -->
    <div class="my-profile--summary" v-else>
      <div class="summary--contents">
        <p>
          <span class="contents--label">{{ $t('Name:') }}</span>
          <span class="contents--value">{{ currentUser.firstname }} {{ currentUser.lastname }}</span>
        </p>
        <p>
          <span class="contents--label">{{ $t('Email:') }}</span>
          <span class="contents--value">{{ currentUser.email }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import MyProfile from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyProfile'

import BaseCheckbox from 'theme/components/hulii/blocks/Form/BaseCheckbox'
import BaseSelect from 'theme/components/hulii/blocks/Form/BaseSelect'
import BaseInput from 'theme/components/hulii/blocks/Form/BaseInput'
import FullButton from 'theme/components/hulii/blocks/Buttons/FullButton'
import Tooltip from 'theme/components/core/Tooltip'

export default {
  components: {
    BaseCheckbox,
    BaseSelect,
    BaseInput,
    FullButton,
    Tooltip
  },
  mixins: [MyProfile],
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
  methods: {
    checkValidation () {
      if (this.changePassword && this.addCompany) {
        return this.$v.$invalid
      } else if (this.changePassword && !this.addCompany) {
        return this.$v.currentUser.$invalid || this.$v.password.$invalid || this.$v.rPassword.$invalid
      } else if (!this.changePassword && this.addCompany) {
        return this.$v.currentUser.$invalid || this.$v.userCompany.$invalid
      } else {
        return this.$v.currentUser.$invalid
      }
    }
  },
  validations: {
    currentUser: {
      firstname: {
        required,
        minLength: minLength(2)
      },
      lastname: {
        required
      },
      email: {
        required,
        email
      }
    },
    oldPassword: {
      required
    },
    password: {
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    userCompany: {
      company: {
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
      },
      taxId: {
        required,
        minLength: minLength(3)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.my-profile {
  @apply w-full;
  max-width: 400px;

  .my-profile--header {
    @apply mb-8  flex flex-row justify-between;

    .header--title {
      @apply text-hulii-turquoise;
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
  .my-profile--form {
    .form--item {
      @apply mb-4 w-full;
    }
  }
  .my-profile--button {
    @apply text-white mt-4 cursor-pointer;
  }
  .my-profile--cancel {
    @apply text-grey text-center mt-4;
    font-weight: 600;

    a {
      @apply text-grey;
    }
  }
  .my-profile--summary {
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
