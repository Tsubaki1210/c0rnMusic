<template>
  <div>
    <van-tabs
      v-model="activeName"
      animated
      :border="false"
      @rendered="localMusicTabName"
      @change="localMusicTabName"
      background="var(--color-tint)"
      title-active-color="#fff"
      title-inactive-color="#a7a3a3"
      color="#fff"
    >
      <van-tab title="单曲" name="localsingle"></van-tab>
      <van-tab title="歌手" name="localsinger"></van-tab>
      <van-tab title="专辑" name="localalbum"></van-tab>
      <van-tab title="文件夹" name="localfolder"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { debounce } from "common/js/utils.js";

export default {
  name: "LocalMusicTab",
  data() {
    return {
      activeName: "localsingle",
    };
  },
  methods: {
    localMusicTabName: debounce(function () {
      setTimeout(() => {
        this.$root.bus.$emit("showLocalMusicTabName", this.activeName);
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