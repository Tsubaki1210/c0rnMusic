<template>
  <div id="home">
    <home-top @getHomeTabName2="showHomeTabName2"></home-top>
    <scroll class="content" ref="scroll" :probe-type="3">
      <component :is="currentTab" />
    </scroll>
    <!-- <div>
      <van-button type="default" @click="btnClick">默认按钮</van-button>
    </div> -->
    <!-- @tabClick="tabClick" -->
  </div>
</template>

<script>
import HomeTop from "components/common/top/home/HomeTop";
import Scroll from "components/common/scroll/Scroll";

import Recommend from "views/home/childHome/recommend/Recommend";
import Friends from "views/home/childHome/friends/FriendsUnlogin";
import Radio from "views/home/childHome/radio/Radio";

export default {
  name: "Home",
  components: {
    HomeTop,
    Scroll,
    Recommend,
    Friends,
    Radio,
  },
  data() {
    return {
      showdot: "",
      currentTab: "",
      path: "/home/recommend",
    };
  },
  activated() {
    this.$router.push(this.path);
  },
  beforeRouteLeave(to, from, next) {
    this.path = this.$route.path;
    next();
  },
  computed: {},
  methods: {
    showHomeTabName2(name) {
      //左为data内的，右name是HomeTop中data的name
      this.currentTab = name;
      console.log(name);
    },

    // 左上角图标dot显示切换
    btnClick() {
      this.showdot = !this.showdot;
    },
  },
};
</script>
<style scoped>
#home {
  position: relative;
  height: 100vh;
}

.van-icon {
  color: #fff;
}

.content {
  overflow: auto;
  position: absolute;
  top: 90px;
  bottom: 60px;
  /* bottom: 0; */
  left: 0;
  right: 0;
}

.content::-webkit-scrollbar {
  display: none;
}
</style>