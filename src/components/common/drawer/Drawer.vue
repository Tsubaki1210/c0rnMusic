<template>
  <div>
    <!-- get-container="body" -->
    <van-popup
      v-model="showuserdrawer"
      :close-on-click-overlay="false"
      @click-overlay="Overlay"
      position="left"
      :style="{ height: '100%', width: '75%' }"
    >
      <div>
        <div class="login" v-if="this.usertoken == null || undefined">
          未登录
        </div>
        <div class="login" v-else>
          <div class="login-info" @click="userdetail">
            <img :src="this.loginstatus.profile.avatarUrl" alt="" />
            <span class="user-nickname">{{
              this.loginstatus.profile.nickname
            }}</span>
          </div>
        </div>
        <div>
          <div class="text">
            <i></i>
            <span>我的消息</span>
          </div>
          <div class="text">
            <i></i>
            <span>会员中心</span>
          </div>
          <div class="text">
            <i></i>
            <span>我的好友</span>
          </div>
          <div class="text">
            <i></i>
            <span>个性换肤</span>
          </div>
        </div>
      </div>
      <button @click="logout">退出</button>
    </van-popup>
    <van-popup
      v-model="showvideodrawer"
      :close-on-click-overlay="false"
      @click-overlay="Overlay"
      position="left"
      :style="{ height: '100%', width: '75%' }"
    >
      <div>
        <div class="login" v-if="this.usertoken == null || undefined">
          未登录
        </div>
        <div class="login" v-else>
          <div class="login-info" @click="userdetail">
            <img :src="this.loginstatus.profile.avatarUrl" alt="" />
            <span class="user-nickname">{{
              this.loginstatus.profile.nickname
            }}</span>
          </div>
        </div>
        <div>
          <div class="text">
            <i></i>
            <span>我的消息</span>
          </div>
          <div class="text">
            <i></i>
            <span>会员中心</span>
          </div>
          <div class="text">
            <i></i>
            <span>我的好友</span>
          </div>
          <div class="text">
            <i></i>
            <span>个性换肤</span>
          </div>
        </div>
      </div>
      <button @click="logout">退出</button>
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";

import { mapState } from "vuex";

import { debounce } from "common/js/utils.js";

export default {
  name: "Drawer",
  data() {
    return {
      needshowdrawer: "",
      showhomedrawer: false,
      showuserdrawer: false,
      showvideodrawer: false,
      usertoken: "",

      //用户登录信息(简单)
      loginstatus: this.$store.state.loginStatus,
    };
  },
  created() {
    //接收navbar左边按钮反馈
    // this.$root.bus.$on("showDrawer", (data) => {
    //   this.showdrawer = data;
    //   console.log(this.showdrawer);
    // });
    this.isShowDrawer();

    //用户登录信息(简单)
    this.usertoken = this.loginstatus.token;
    console.log(this.$store.state);
  },
  computed: {
    ...mapState(["loginStatus"]),
  },
  methods: {
    userdetail() {},
    isShowDrawer() {
      this.$root.bus.$on("showDrawer", (data) => {
        console.log(data);
        // if (data === "home") {
        //   this.showdrawer = true;
        //   console.log("1");
        // } else if (data === "user") {
        //   this.showuserdrawer = true;
        //   this.showhomedrawer = false;
        //   this.showvideodrawer = false;
        //   console.log("2");
        // } else if (data === "video") {
        //   this.showvideodrawer = true;
        //   this.showhomedrawer = false;
        //   this.showuserdrawer = false;
        //   console.log("3");
        // }
      });
    },
    Overlay() {
      // this.showhomedrawer = false;
      // this.showuserdrawer = false;
      // this.showvideodrawer = false;
      // console.log(this.showhomedrawer);
      // console.log(this.showuserdrawer);
      // console.log(this.showvideodrawer);
    },
    logout() {
      let logout = "https://c0rn-music-api.vercel.app/logout";
      axios.get(logout).then((res) => {
        this.$toast("注销成功 !");
        localStorage.clear();
        window.location.reload();
      });
    },
  },
  beforeDestroy() {
    //组件销毁时解除事件绑定
    this.$root.bus.$off("showDrawer");
  },
};
</script>

<style scoped>
.login {
  height: 150px;
  background-color: var(--color-tint);
}

.text {
  height: 25px;
}

.login-info img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  /* color: #d6d8da; */
}

.user-nickname {
  font-size: 12px;
}
</style>