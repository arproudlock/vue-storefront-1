<template>
  <div class="card--main">
    <div class="close--icon--main">
      <img
        class="close-icon"
        src="../../assets/union.svg"
        alt="cancel-icon"
        @click="cancelFunc()"
      >
    </div>
    <div class="card--desc">
      <div class="info">
        {{ $t("Hulii 12-month Warranty and delivery within 2-4 days.") }}
      </div>
      <router-link class="view--more" :to="'/help-center/warranty'" exact>
        {{
          $t("View more information")
        }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewMore',
  methods: {
    cancelFunc () {
      this.$emit('close-popup', false);
    }
  }
};
</script>

<style lang="scss">
.card--main {
  position: absolute;
  background: #fafafb;
  /* Light grey */
  border: 1px solid #fafafb;
  box-sizing: border-box;
  padding: 0.5rem;
  width: 273px;
  margin-left: 11rem;
  top: 11.5rem;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  .close--icon--main {
    text-align: end;
    .close-icon {
      cursor: pointer;
    }
  }
  .card--desc {
    padding: 0px 15px 5px 15px;
    line-height: 22px;
    .view--more {
      color: #372768;
      font-weight: 700;
    }
  }
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-width: 20px;
    border-color: #fafafb transparent transparent transparent;
  }
}
</style>
