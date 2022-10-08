<template>
  <div>
    <nav-bar class="playlist-navbar">
      <template #left>
        <van-icon name="arrow-left" @click="playlistBack" />
      </template>
      <template #title>
        <span class="title">本地音乐</span>
      </template>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </nav-bar>
    <div>
      <i class="iconfont icon-sangediandian"></i>
    </div>
    <local-music-tab></local-music-tab>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import NavBarIcon from "components/common/navbar/NavBarIcon";

import LocalMusicTab from "components/content/tab/user/LocalMusicTab";

export default {
  name: "LocalMusicTop",
  components: {
    NavBar,
    NavBarIcon,
    LocalMusicTab,
  },
  data() {
    return {};
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

.playlist-navbar >>> .van-nav-bar__right {
  right: 30px;
}

.icon-sangediandian {
  color: #fff;
  float: right;
  position: absolute;
  top: 14px;
  right: 8px;
  z-index: 9;
}
</style>