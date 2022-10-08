<template>
  <div>
    <van-tabs
      v-model="activeName"
      animated
      :border="false"
      @rendered="downloadTabName"
      @change="downloadTabName"
      background="var(--color-tint)"
      title-active-color="#fff"
      title-inactive-color="#a7a3a3"
      color="#fff"
    >
      <van-tab title="单曲" name="downloadsingle"></van-tab>
      <van-tab title="电台节目" name="downloadradioshow"></van-tab>
      <van-tab title="视频" name="downloadvideo"></van-tab>
      <van-tab title="下载中" name="downloading"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { debounce } from "common/js/utils.js";

export default {
  name: "DownloadTab",
  data() {
    return {
      activeName: "downloadsingle",
    };
  },
  methods: {
    downloadTabName: debounce(function () {
      setTimeout(() => {
        this.$root.bus.$emit("showDownloadTabName", this.activeName);
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