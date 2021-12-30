<template>
  <div class="top-container">
    <div class="card-container" v-if="cardDetail.title || cardDetail.description">
      <div class="elipse" :style="cardDetail.elipseStyle">
        <i class="elipse-text material-icons" v-if="cardDetail.icon" :style="cardDetail.iconStyle">{{ cardDetail.icon }}</i>
        <img v-if="cardDetail.image" :src="cardDetail.image" :alt="cardDetail.alt">
      </div>
      <div class="card-body">
        <div class="card-text">
          <h3>{{ cardDetail.title }}</h3>
          <p>{{ cardDetail.description }}</p>
        </div>
      </div>
    </div>
    <div class="icon-card-container" v-if="!cardDetail.title && !cardDetail.description">
      <div class="elipse" :style="cardDetail.elipseStyle" v-if="cardDetail.icon">
        <i class="elipse-text material-icons" :style="cardDetail.iconStyle">{{ cardDetail.icon }}</i>
      </div>
      <div v-if="cardDetail.image" class="w-100 align-center mb-5 justify-center" :class="cardDetail.class">
        <img :src="cardDetail.image" :height="cardDetail.size" :alt="cardDetail.alt">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconCard',
  props: {
    cardDetail: {
      type: [Object],
      required: true
    }
  }
}
</script>

<style scoped>

.elipse {
  width: 96px;
  height: 96px;
  /* left: 22px; */
  /* top: 22px; */
  background: #E2E2E2;
  border-radius: 48px;
  line-height: 96px;
  text-align: center;
  color: #ffffff;
  /* z-index: 100; */
  float: left;

}

.elipse-text {
  font-weight: bold;
  font-size: 48px;
  line-height: 96px;
}

.card-container {
 /* background: #F8F8F8; */
 width: 100%;
 height:100%;
 flex-direction: row;
}

.card-body {
    position: relative;
    top: -20px;
    /* background: #F4F4F4; */
    border-radius: 15px;
    height: 100%;
    /* flex: auto; */
    left: 10px;
    float: left;
    max-width: 70%;

}

.card-text {
  /* position: relative;
  top: 25px;
  padding-left: 22px; */
  flex-direction: column;
  padding-bottom: 30px;
}
.card-text h3 {
  color: #000000;
};

.top-container .icon-card-container {
  width: 100%;
  height:100%;
  margin: 0 auto;
}

.icon-card-container .elipse {
  float:none;
  margin: 0 auto;
}

.top-container {
  width:100%;
}

</style>
