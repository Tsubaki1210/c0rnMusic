<template>
  <van-tabs
    v-model="activeName"
    animated
    line-height="0px"
    :border="false"
    @change="commentTabName"
    background="unset"
    title-active-color="#111"
    title-inactive-color="#a7a3a3"
    ref="CommentTabHeight"
  >
    <!-- @rendered="homeTabName"  -->
    <van-tab title="推荐" name="recommendComment"></van-tab>
    <van-tab title="最热" name="hotComment"></van-tab>
    <van-tab title="最新" name="newComment"></van-tab>
  </van-tabs>
</template>

<script>
import { debounce } from "common/js/utils.js";

export default {
  name: "CommentTab",
  data() {
    return {
      activeName: "recommendComment",
    };
  },
  methods: {
    commentTabName: debounce(function () {
      setTimeout(() => {
        this.$root.bus.$emit("emitCommentTabName", this.activeName);
      }, 20);
    }),
  },
};
</script>

<style scoped>
</style>