<template>
  <div class="user-list">
    <van-cell title="本地音乐" @click="toplaylist($event, 'localMusicTop')">
      <!-- ref="localMusicTop" -->
      <template #icon>
        <i class="iconfont icon-yinle"></i>
      </template>
    </van-cell>
    <van-cell title="最近播放" @click="toplaylist($event, 'recentPlayTop')">
      <template #icon>
        <i class="iconfont icon-zuijinbofang"></i>
      </template>
    </van-cell>
    <van-cell title="下载管理" @click="toplaylist($event, 'downloadTop')">
      <template #icon>
        <i class="iconfont icon-xiazai"></i>
      </template>
    </van-cell>
    <van-cell title="我的电台" @click="toplaylist($event, 'myradioTop')">
      <template #icon>
        <i class="iconfont icon-diantai"></i>
      </template>
    </van-cell>
    <van-cell
      title="我的收藏"
      class="underline-none"
      @click="toplaylist($event, 'mycollectionTop')"
    >
      <template #icon>
        <i class="iconfont icon-wodeshoucang"></i>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "UserBody",
  data() {
    return {
      playlistTopName: "",
      recentplayTopName: "", //最近播放ID
    };
  },
  methods: {
    toplaylist(e, name) {
      // this.$router.push("music/" + name);
      this.$router.push({ name: "usermusic", query: { cellname: name } });

      // this.playlistTopName = "localMusicTop";
      this.playlistTopName = name;

      // console.log(this.playlistTopName);
      // console.log(name);

      setTimeout(() => {
        this.$root.bus.$emit("showTopName", this.playlistTopName);
      }, 20);
    },
  },
};
</script>

<style scoped>
.icon-yinle,
.icon-zuijinbofang,
.icon-xiazai,
.icon-diantai,
.icon-wodeshoucang {
  font-size: 20px;
  color: red;
  margin-right: 10px;
}

.van-cell::after {
  content: "";
  width: 70%;
  height: 1px;
  display: block;
  margin: 0 auto;
  border-bottom: 1px solid #aaaaaa;
}

.underline-none::after {
  border: 0;
}
</style>