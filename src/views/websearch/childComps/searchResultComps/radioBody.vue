<template>
  <div>电台</div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import { mapState } from "vuex";

import { getCloudSearch } from "network/search.js";

export default {
  name: "radioBody",
  components: {
    Scroll,
  },
  data() {
    return {
      keywords: this.$store.state.searchKeyword, //搜索关键词
      playlist: {}, //搜索的歌单结果
      type: 1009, //搜索type类型

      searchheight: this.$store.state.searchHeight, // search的高度
      searchresulttabheight: this.$store.state.searchTabHeight, // searchResultTab的高度
      miniplayerheight: this.$store.state.miniPlayerHeight, //mini播放器的高度
    };
  },
  created() {},
  computed: {
    ...mapState(["searchKeyword"]),
    ...mapState(["searchHeight"]),
    ...mapState(["searchTabHeight"]),
    ...mapState(["miniPlayerHeight"]),
    contentHeight() {
      if (this.searchresulttabheight != null) {
        let bottomHeight =
          this.searchheight +
          this.searchresulttabheight +
          this.miniplayerheight;
        let Height =
          "top: " +
          this.searchresulttabheight +
          "px; bottom: " +
          bottomHeight +
          "px";
        console.log(this.searchheight);
        console.log(this.searchresulttabheight);
        console.log(this.miniplayerheight);
        return Height;
      }
    },
  },
};
</script>

<style scoped>
</style>