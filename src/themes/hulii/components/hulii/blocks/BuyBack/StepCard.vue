<template>
  <div class="card-container">
    <!-- :step="key+1" :title="card.title" :description="card.description" -->
    <div class="elipse">
      <span class="elipse-text">{{ cardDetail.step }}</span>
    </div>
    <div class="card-body">
      <div class="card-text">
        <h3>{{ cardDetail.title }}</h3>
        <p>{{ cardDetail.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepCard',
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
position:relative;
width: 44px;
height: 44px;
left: 22px;
top: 22px;
background: #372767;
border-radius: 22px;
line-height: 44px;
text-align: center;
color:#ffffff;
z-index: 100;
}

.elipse-text {
  font-weight: bold;
}

.card-container {
 /* background: #F8F8F8; */
 width: 100%;
 height:100%;
}

.card-body {
  position:relative;
  top:-20px;
  background: #F4F4F4;
  border-radius: 15px;
  height:80%;
}

.card-text {
  position: relative;
  top: 25px;
  padding-left: 22px;
  padding-bottom: 30px;

}
.card-text h3 {
    color: #372767;
  };

</style>
