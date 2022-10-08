<template>
  <div>
    <!-- class="top-swipe-block" -->
    <!-- <pull-refresh></pull-refresh> -->
    <home-top-swipe class="top-swipe"></home-top-swipe>

    <recommend-grid></recommend-grid>
    <van-divider />
    <recommend-music></recommend-music>
    <new-music></new-music>
    <host-radio></host-radio>
  </div>
</template>

<script>
import RecommendGrid from "components/common/grid/RecommendGrid";
import HomeTopSwipe from "components/common/swipe/HomeTopSwipe";

import PullRefresh from "components/common/pullrefresh/PullRefresh";

import RecommendMusic from "views/home/childHome/recommend/childComps/RecommendMusic";
import NewMusic from "views/home/childHome/recommend/childComps/NewMusic";
import HostRadio from "views/home/childHome/recommend/childComps/HostRadio";

export default {
  name: "Recommend",
  components: {
    RecommendGrid,
    HomeTopSwipe,
    RecommendMusic,
    NewMusic,
    HostRadio,
    PullRefresh,
  },
};
</script>

<style scoped>
/* 为了适配130px高的颜色区块 */
/* .top-swipe-block {
  height: 130px;
  margin: 0;
  padding: 0;
} */

.top-swipe {
  /* height: 160px; */
  padding: 5px 0px;
}
</style>