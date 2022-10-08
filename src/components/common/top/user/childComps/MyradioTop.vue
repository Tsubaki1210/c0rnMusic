<template>
  <div>
    <nav-bar class="playlist-navbar">
      <template #left>
        <van-icon name="arrow-left" @click="playlistBack" />
      </template>
      <template #title>
        <span class="title">我的电台</span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import NavBarIcon from "components/common/navbar/NavBarIcon";

export default {
  name: "MyradioTop",
  components: {
    NavBar,
    NavBarIcon,
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