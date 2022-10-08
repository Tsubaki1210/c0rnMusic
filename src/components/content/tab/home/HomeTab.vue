<template>
  <van-tabs
    v-model="activeName"
    animated
    :border="false"
    @rendered="homeTabName"
    @change="homeTabName"
    background="var(--color-tint)"
    title-active-color="#fff"
    title-inactive-color="#a7a3a3"
    color="#fff"
  >
    <van-tab title="推荐" name="recommend" to="/home/recommend"></van-tab>
    <van-tab title="朋友" name="friends"></van-tab>
    <van-tab title="电台" name="radio" to="/home/radio"></van-tab>
  </van-tabs>
</template>

<script>
import { debounce } from "common/js/utils.js";

export default {
  name: "HomeTab",
  data() {
    return {
      activeName: "recommend",
    };
  },
  props: {
    path: String,
  },
  methods: {
    //由于van-tabs的事件名没有符合我需求的，
    //所以引入debounce函数为了使每次传出去activeName的值为一次
    homeTabName: debounce(function () {
      this.$emit("getHomeTabName1", this.activeName);
    }),

    // tabName() {
    //   this.$emit("getName1", this.activeName);
    // },
    // tabClick() {
    //   this.$router.replace(this.path);
    // },
  },
};
</script>

<style scoped>
/* .van-tabs .van-tab--active span {
  border-bottom: 2px solid #fff;
  color: #fff;
} */
.van-tabs >>> .van-tabs__line {
  margin: 0 0 10px;
  width: 30px;
}
</style>