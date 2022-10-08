<template>
  <div>
    <van-tabs
      v-model="activeName"
      animated
      :border="false"
      @rendered="recentPlayTabName"
      @change="recentPlayTabName"
      background="var(--color-tint)"
      title-active-color="#fff"
      title-inactive-color="#a7a3a3"
      color="#fff"
    >
      <van-tab title="歌曲" name="recentplaysong"></van-tab>
      <van-tab title="视频" name="recentplayvideo"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { debounce } from "common/js/utils.js";

export default {
  name: "RecentPlayTab",
  data() {
    return {
      activeName: "recentplaysong",
    };
  },
  methods: {
    recentPlayTabName: debounce(function () {
      setTimeout(() => {
        this.$root.bus.$emit("showRecentPlayTabName", this.activeName);
      }, 20);
    }),
  },
};
</script>

<style scoped>
.van-tabs >>> .van-tabs__line {
  margin: 0 0 10px;
  width: 30px;
}
</style>