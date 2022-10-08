<template>
  <van-tabs
    v-model="activeName"
    animated
    :border="false"
    @rendered="profileTabName"
    @change="profileTabName"
    background="#fff"
    title-active-color="var(--color-tint)"
    title-inactive-color="#ffa9a4"
    color="var(--color-tint)"
    sticky
    offset-top="44px"
  >
    <!-- sticky="44px" -->
    <van-tab title="主页" name="homepage" to="/profile/homepage"></van-tab>
    <van-tab title="动态" name="dynamics"></van-tab>
    <van-tab title="博客" name="blog" to="/profile/blog"></van-tab>
  </van-tabs>
</template>

<script>
import { debounce } from "common/js/utils.js";

export default {
  name: "ProfileTab",
  data() {
    return {
      activeName: "homepage",
    };
  },
  props: {
    path: String,
  },
  methods: {
    //由于van-tabs的事件名没有符合我需求的，
    //所以引入debounce函数为了使每次传出去activeName的值为一次
    profileTabName: debounce(function () {
      this.$emit("getProfileTabName", this.activeName);
    }),
  },
};
</script>

<style scoped>
.van-tabs >>> .van-tabs__line {
  margin: 0 0 10px;
  width: 30px;
}
</style>