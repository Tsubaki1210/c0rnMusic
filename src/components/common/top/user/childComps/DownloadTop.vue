<template>
  <div>
    <nav-bar class="playlist-navbar">
      <template #left>
        <van-icon name="arrow-left" @click="playlistBack" />
      </template>
      <template #title>
        <span class="title">下载管理</span>
      </template>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </nav-bar>
    <download-tab></download-tab>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import NavBarIcon from "components/common/navbar/NavBarIcon";

import DownloadTab from "components/content/tab/user/DownloadTab";

export default {
  name: "DownloadTop",
  components: {
    NavBar,
    NavBarIcon,
    DownloadTab,
  },
  methods: {
    playlistBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.playlist-navbar >>> .van-nav-bar__title {
  /* width: 180px; */
  margin: 0 50px;
  /* text-align: left; */
}
.title {
  color: #fff;
  float: left;
}
</style>