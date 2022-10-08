<template>
  <div class="host-radio-item">
    <img v-lazy="showImage" alt="" />
    <div class="img-left">
      <span>{{ hostRadioItem.name }}</span>
    </div>
    <div class="radio-text">
      <span>{{ hostRadioItem.rcmdtext }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HostRadioItem",
  props: {
    hostRadioItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return this.hostRadioItem.picUrl;
    },
  },
};
</script>

<style scoped>
.host-radio-item {
  padding-bottom: 5px;
  position: relative;
  width: 33%; /* 102px */
}

.host-radio-item img {
  margin-top: 5px;
  width: 100%;

  border-radius: 0.25rem;
}

img[lazy="loading"] {
  height: 102px;
}

.img-left {
  font-size: 10px;
  position: absolute;
  bottom: 2.5rem;
  left: 0.125rem;
}

.img-left span {
  color: #fff;

  padding-left: 0.125rem;
}

.radio-text {
  font-size: 12px;
  margin: auto;
  margin-left: 2px;
  margin-right: 2px;
  text-align: left;
}
</style>