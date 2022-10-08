<template>
  <div class="video-top">
    <nav-bar>
      <template #left>
        <van-icon name="like" :dot="showdot" @click="showVideoPopup" />
      </template>
      <template #title>
        <nav-bar-icon></nav-bar-icon>
      </template>
      <template #right>
        <van-icon name="search" size="18" @click="search" />
      </template>
    </nav-bar>
    <video-tab @getId1="showId1"></video-tab>
    <!-- <drawer></drawer> -->
    <!-- 写成组件有bug -->
    <van-popup
      v-model="showvideodrawer"
      :close-on-click-overlay="false"
      @click-overlay="Overlay"
      position="left"
      :style="{ height: '100%', width: '75%' }"
    >
      <div>
        <div class="popup-login" v-if="this.usertoken === null || undefined">
          <div class="popup-login-info" @click="userdetail">
            <span class="iconfont icon-touxiang"></span>
            <span class="popup-login-info-user-nickname">未登录</span>
          </div>
        </div>
        <div class="popup-login" v-else>
          <div class="popup-login-info" @click="userdetail">
            <img :src="this.loginstatus.profile.avatarUrl" alt="" />
            <span class="popup-login-info-user-nickname">{{
              this.loginstatus.profile.nickname
            }}</span>
          </div>
        </div>
        <div class="popup-list">
          <div class="popup-list-block1">
            <div class="popup-list-text" @click="userMessage">
              <i class="iconfont icon-youxiang"></i>
              <span>我的消息</span>
            </div>
            <div class="popup-list-text" @click="userVip">
              <i class="iconfont icon-huiyuan"></i>
              <span>会员中心</span>
            </div>
          </div>
          <div class="popup-list-block2">
            <div class="popup-list-text" @click="userFriend">
              <i class="iconfont icon-biaoqing"></i>
              <span>我的好友</span>
            </div>
          </div>
          <div class="popup-list-block3">
            <div class="popup-list-text" @click="userPeeling">
              <i class="iconfont icon-huanfu"></i>
              <span>个性换肤</span>
            </div>
          </div>
          <div
            class="popup-list-block4"
            v-if="this.usertoken === null || undefined"
          ></div>
          <div class="popup-list-block4" v-else>
            <button class="button" @click="logout">退出</button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import NavBarIcon from "components/common/navbar/NavBarIcon";
// import Drawer from "components/common/drawer/Drawer";

import VideoTab from "components/content/tab/video/VideoTab";

import axios from "axios";

import { mapState } from "vuex";

export default {
  name: "VideoTop",
  components: {
    NavBar,
    NavBarIcon,
    // Drawer,
    VideoTab,
  },
  data() {
    return {
      showdot: "",
      // showvideodrawer: "",
      showvideodrawer: false,

      usertoken: null,

      //用户登录信息(简单)
      loginstatus: this.$store.state.loginStatus,
    };
  },
  created() {
    this.usertoken = this.$store.state.userToken;
  },
  computed: {
    ...mapState(["loginStatus"]),
    ...mapState(["userToken"]),
  },
  methods: {
    showVideoPopup() {
      this.showvideodrawer = true;
      // this.showvideodrawer = "video";
      // setTimeout(() => {
      //   this.$root.bus.$emit("showDrawer", this.showvideodrawer);
      // }, 20);
    },
    Overlay() {
      this.showvideodrawer = false;
      console.log(this.showvideodrawer);
    },
    userdetail() {
      this.$router.push("/login");
    },
    userMessage() {},
    userVip() {},
    userFriend() {},
    userPeeling() {},
    logout() {
      let logout = "https://c0rn-music-api.vercel.app/logout";
      axios.get(logout).then((res) => {
        this.$toast("注销成功 !");
        localStorage.removeItem("loginStatus");
        localStorage.removeItem("userDetail");
        localStorage.removeItem("userToken");
        localStorage.removeItem("userCookie");
        window.location.reload();
      });
    },
    // 左上角图标dot显示切换
    btnClick() {
      this.showdot = !this.showdot;
    },
    showId1(id) {
      this.id = id;
      console.log(this.id);
    },
    search() {
      this.$router.replace("/websearch");
    },
  },
};
</script>

<style scoped>
@import "../../../../assets/css/popup.css";

.video-top {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>