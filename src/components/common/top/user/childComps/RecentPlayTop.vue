<template>
  <div>
    <nav-bar class="playlist-navbar">
      <template #left>
        <van-icon name="arrow-left" @click="playlistBack" />
      </template>
      <template #title>
        <span class="title">最近播放</span>
      </template>
      <template #right>
        <span class="right-text" @click="clearRecentPlay">清空</span>
      </template>
    </nav-bar>
    <recent-play-tab></recent-play-tab>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import NavBarIcon from "components/common/navbar/NavBarIcon";

import RecentPlayTab from "components/content/tab/user/RecentPlayTab";

export default {
  name: "RecentPlayTop",
  components: {
    NavBar,
    NavBarIcon,
    RecentPlayTab,
  },
  methods: {
    playlistBack() {
      this.$router.go(-1);
    },
    clearRecentPlay() {},
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

.right-text {
  color: #fff;
  float: right;
}
</style>