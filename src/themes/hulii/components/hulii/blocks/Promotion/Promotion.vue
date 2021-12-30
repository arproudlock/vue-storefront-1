<template>
  <modal name="modal-promotion" :width="620">
    <div class="">
      <!-- Have a newsletter promotion & a non-newsletter promotion based on what's pulled from contentful -->
      <special-sign-up v-if="signUp" />
      <special-information v-if="info" />
    </div>
  </modal>
</template>

<script>
import { mapState } from 'vuex'
import Modal from 'theme/components/core/Modal'
import SpecialInformation from './SpecialInformation.vue'
import SpecialSignUp from './SpecialSignUp.vue'

export default {
  name: 'Promotion',
  //  only show special information
  data () {
    return {
      info: false,
      signUp: false
    }
  },
  computed: {
    ...mapState({
      activeElem: state => state.ui.authElem
    })
  },
  mounted () {
    if (!localStorage.getItem('signed-up-to-newsletter')) {
      this.signUp = true;
      this.info = false;
    } else
    {
      this.signUp = false;
      this.info = true;
    }
  },
  components: {
    Modal,
    SpecialInformation,
    SpecialSignUp
  }
}
</script>

<style scoped>
  .modal {
    font-size: 18px;
  }
</style>
