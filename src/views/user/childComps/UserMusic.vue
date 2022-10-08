<template>
  <div>
    <component :is="topName" />
    <div>{{ this.topName }}</div>
    <div v-if="this.usertoken === null">
      <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="你还未登录，点击下方按钮登录吧！"
      >
        <button class="login" @click="login">登录</button>
      </van-empty>
    </div>
    <div v-else>
      <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="你还没有任何音乐，快去下载吧！"
      />
    </div>
  </div>
</template>

<script>
import LocalMusicTop from "components/common/top/user/childComps/LocalMusicTop";
import RecentPlayTop from "components/common/top/user/childComps/RecentPlayTop";
import DownloadTop from "components/common/top/user/childComps/DownloadTop";
import MyradioTop from "components/common/top/user/childComps/MyradioTop";
import MycollectionTop from "components/common/top/user/childComps/MycollectionTop";

import { mapState } from "vuex";

export default {
  name: "UserMusic",
  components: {
    LocalMusicTop,
    RecentPlayTop,
    DownloadTop,
    MyradioTop,
    MycollectionTop,
  },
  data() {
    return {
      topName: "",
      localmusictabName: "",
      recentplaytabName: "",
      downloadtabName: "",

      loginstatus: this.$store.state.loginStatus, //用户登录信息(简单)
      usertoken: null,
    };
  },
  computed: {
    ...mapState(["loginStatus"]),
    ...mapState(["userToken"]),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.urlname = to.query.cellname;
    });
  },
  created() {
    // 接收Top的文字;
    this.topName = this.$route.query.cellname;
    // this.$root.bus.$on("showTopName", (data) => {
    //   this.topName = data;
    //   console.log(this.topName);
    // });
    //接收localMusicTab的文字
    this.$root.bus.$on("showLocalMusicTabName", (data) => {
      this.localmusictabName = data;
      console.log(this.localmusictabName);
    });
    //接收recentPlayTopTab的文字
    this.$root.bus.$on("showRecentPlayTabName", (data) => {
      this.recentplaytabName = data;
      console.log(this.recentplaytabName);
    });
    //接收downloadTopTab的文字
    this.$root.bus.$on("showDownloadTabName", (data) => {
      this.downloadtabName = data;
      console.log(this.downloadtabName);
    });
    //用户登录信息token
    this.usertoken = this.$store.state.userToken;
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
  },
  deactivated() {
    this.$destroy("Music");
  },
  beforeDestroy() {
    //组件销毁时解除事件绑定
    // this.$root.bus.$off("showTopName");
    this.$root.bus.$off("showLocalMusicTabName");
    this.$root.bus.$off("showRecentPlayTabName");
    this.$root.bus.$off("showDownloadTabName");
  },
};
</script>

<style scoped>
.login {
  background-color: unset;
  color: var(--color-tint);
  font-size: 12px;
  width: 80px;
  padding: 6px 8px 4px;
  border: 1px solid var(--color-tint);
  border-radius: 20px;
}
</style>