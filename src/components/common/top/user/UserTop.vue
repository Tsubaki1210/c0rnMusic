<template>
  <div>
    <nav-bar>
      <template #left>
        <van-icon name="like" @click="showUserPopup" />
      </template>
      <template #title>
        <nav-bar-icon></nav-bar-icon>
      </template>
      <template #right>
        <van-icon name="search" size="18" @click="search" />
      </template>
    </nav-bar>
    <!-- <drawer></drawer> -->
    <!-- 写成组件有bug -->
    <van-popup
      v-model="showuserdrawer"
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
import axios from "axios";

import { mapState } from "vuex";

export default {
  name: "UserTop",
  components: {
    NavBar,
    NavBarIcon,
    // Drawer,
  },
  data() {
    return {
      // showuserdrawer: "",
      showuserdrawer: false,

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
    showUserPopup() {
      this.showuserdrawer = true;
      // this.showuserdrawer = "user";
      // setTimeout(() => {
      //   this.$root.bus.$emit("showDrawer", this.showuserdrawer);
      // }, 20);
    },
    Overlay() {
      this.showuserdrawer = false;
      console.log(this.showuserdrawer);
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
    search() {
      this.$router.replace("/websearch");
    },
  },
};
</script>

<style scoped>
@import "../../../../assets/css/popup.css";
</style>