<template>
  <van-grid :border="false">
    <van-grid-item icon="bag-o" text="私人FM" />
    <van-grid-item icon="calendar-o" text="每日推荐" />
    <van-grid-item icon="music-o" text="歌单" />
    <van-grid-item icon="bar-chart-o" text="排行榜" />
  </van-grid>
</template>

<script>
export default {
  name: "RecommendGrid",
  data() {
    return {};
  },
};
</script>

<style scoped>
.van-grid {
  margin: 0.9375rem 0rem;
}

.van-grid .van-grid-item {
  width: 50px;
  height: 50px;
}
</style>