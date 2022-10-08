<template>
  <van-tabs
    background="var(--color-tint)"
    v-model="activeName"
    @rendered="titleId"
    @change="titleId"
    title-active-color="#fff"
    title-inactive-color="#a7a3a3"
    color="#fff"
  >
    <van-tab title="推荐" name="video-recommend"></van-tab>
    <van-tab
      v-for="(item, index) in videotabs"
      :key="index"
      :title="item.name"
      :name="item.id"
    >
    </van-tab>
  </van-tabs>
</template>

<script>
import { getVideoTab } from "network/video.js";
import { debounce } from "common/js/utils.js";

export default {
  name: "VideoTab",
  data() {
    return {
      videotabs: [],
      activeName: "video-recommend",
    };
  },
  created() {
    this.getVideoTab();
  },
  computed: {},
  methods: {
    //获取视频页面的标签
    getVideoTab() {
      getVideoTab().then((res) => {
        this.videotabs = res.data.slice(0, 7);
        console.log(this.videotabs);
      });
    },
    //获取当前标签页的id值,且发送到ViedeoTop组件
    titleId: debounce(function () {
      this.$emit("getId1", this.activeName);
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