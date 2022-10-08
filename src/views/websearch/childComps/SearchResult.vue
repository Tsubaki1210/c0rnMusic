<template>
  <div>
    <div class="search-result-tab" ref="searchResultTabHeight">
      <van-tabs
        background="var(--color-tint)"
        title-active-color="#fff"
        title-inactive-color="#a7a3a3"
        color="#fff"
        @click="resultTabName"
      >
        <van-tab
          v-for="(item, index) in resultTab"
          :key="index"
          :title="item.name"
          :name="item.id"
        >
          <component :is="item.id" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// import syntheticalBody from "views/websearch/childComps/searchResultComps/syntheticalBody";
import singleBody from "views/websearch/childComps/searchResultComps/singleBody";
import playlistBody from "views/websearch/childComps/searchResultComps/playlistBody";
import videoBody from "views/websearch/childComps/searchResultComps/videoBody";
import singerBody from "views/websearch/childComps/searchResultComps/singerBody";
import blogBody from "views/websearch/childComps/searchResultComps/blogBody";
import lyricBody from "views/websearch/childComps/searchResultComps/lyricBody";
import albumBody from "views/websearch/childComps/searchResultComps/albumBody";
import soundBody from "views/websearch/childComps/searchResultComps/soundBody";
import cloudBody from "views/websearch/childComps/searchResultComps/cloudBody";
import userBody from "views/websearch/childComps/searchResultComps/userBody";

export default {
  name: "SearchResult",
  inject: ["reload"],
  components: {
    // syntheticalBody,
    singleBody,
    playlistBody,
    videoBody,
    singerBody,
    blogBody,
    lyricBody,
    albumBody,
    soundBody,
    cloudBody,
    userBody,
  },
  data() {
    return {
      currentTab: "",
      search: true, //用来判断是否获取searchresulttab的高度
      searchresulttabheight: "", //searchtab的高度
      resultTab: [
        // { id: "syntheticalBody", name: "综合" },
        { id: "singleBody", name: "单曲" },
        { id: "playlistBody", name: "歌单" },
        { id: "videoBody", name: "视频" },
        { id: "singerBody", name: "歌手" },
        { id: "blogBody", name: "博客" },
        { id: "lyricBody", name: "歌词" },
        { id: "albumBody", name: "专辑" },
        { id: "soundBody", name: "声音" },
        { id: "cloudBody", name: "云圈" },
        { id: "userBody", name: "用户" },
      ],
    };
  },
  created() {
    //接收隐藏热门搜索与历史搜索的信号(简单来说接收展示搜索结果页面的信号)
    this.$root.bus.$on("searchvalue", (data) => {
      this.search = data;
      this.tabheight();
    });
  },
  methods: {
    resultTabName(name, title) {
      // this.reload();
      console.log(title);
    },
    tabheight() {
      if (this.search === false) {
        this.$nextTick(() => {
          // this.searchresulttabheight = this.$refs.searchResultTabHeight.offsetHeight;
          this.searchresulttabheight =
            this.$refs.searchResultTabHeight.children[0].children[0].clientHeight;
          this.$root.bus.$emit(
            "acceptsearchtabheight",
            this.searchresulttabheight
          );
        });
      }
    },
  },
  beforeDestroy() {
    //组件销毁时解除事件绑定
    this.$root.bus.$off("acceptsearchtabheight");
  },
};
</script>

<style scoped>
.van-tabs >>> .van-tabs__line {
  margin: 0 0 10px;
  width: 30px;
}
</style>