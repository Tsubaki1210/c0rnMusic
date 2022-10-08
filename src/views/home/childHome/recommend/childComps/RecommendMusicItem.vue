<template>
  <!--  @click="itemClick" -->
  <div class="recommend-music-item" @click="torecommendplaylist">
    <img v-lazy="showImage" alt="" />
    <div class="img-right">
      <van-icon name="service" color="white" />
      <span>{{
        recommendMusicItem.playCount >= 100000000
          ? (recommendMusicItem.playCount / 100000000).toFixed(0) + "亿"
          : recommendMusicItem.playCount >= 10000 &&
            recommendMusicItem.playCount < 100000000
          ? (recommendMusicItem.playCount / 10000).toFixed(0) + "万"
          : recommendMusicItem.playCount
      }}</span>
    </div>
    <div class="re-music-name">
      <span>{{ recommendMusicItem.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendMusicItem",
  data() {
    return {
      lazyimgheight: "102px",
    };
  },
  props: {
    recommendMusicItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return this.recommendMusicItem.picUrl;
    },
  },
  methods: {
    torecommendplaylist() {
      this.$router.push("/playlist/" + this.recommendMusicItem.id);
    },
  },
};
</script>

<style scoped>
.recommend-music-item {
  padding-bottom: 5px;
  position: relative;
  width: 33%;
}

.recommend-music-item img {
  margin-top: 5px;
  width: 100%;

  border-radius: 0.25rem;
}

img[lazy="loading"] {
  height: 102px;
}

.img-right {
  font-size: 10px;
  position: absolute;
  top: 0.5rem;
  right: 0.25rem;
}

.img-right span {
  color: #fff;

  padding-left: 0.125rem;
}

.re-music-name {
  font-size: 12px;
  margin: auto;
  margin-left: 2px;
  margin-right: 2px;
  text-align: left;
}
</style>