<template>
  <div>
    <search></search>
    <div v-show="search">
      <hot-search></hot-search>
      <history-search></history-search>
    </div>
    <div v-show="!search">
      <search-result></search-result>
    </div>
  </div>
</template>

<script>
import Search from "components/common/search/Search";
import HotSearch from "views/websearch/childComps/HotSearch";
import HistorySearch from "views/websearch/childComps/HistorySearch";
import SearchResult from "views/websearch/childComps/SearchResult";

import { getSearchDefault } from "network/search.js";

export default {
  name: "WebSearch",
  components: {
    Search,
    HotSearch,
    HistorySearch,
    SearchResult,
  },
  data() {
    return {
      showsearchdefault: "",
      realsearchdefault: "",
      search: true, //搜索页面与搜索结果页面切换，true为前者，false为后者
    };
  },
  created() {
    this.getSearchDefault();

    //接收隐藏热门搜索与历史搜索的信号(简单来说接收展示搜索结果页面的信号)
    this.$root.bus.$on("searchvalue", (data) => {
      this.search = data;
      console.log(data);
    });
  },
  mounted() {
    //离开页面时恢复WebSearch初始设置
    let beginTime = 0;
    let differTime = 0;
    window.onbeforeunload = function () {
      beginTime = new Date().getTime();
    };
    window.onunload = function () {
      differTime = new Date().getTime() - beginTime;
      if (differTime <= 5) {
        this.search = true;
      }
    };
  },
  methods: {
    //获取默认搜索关键字的数据
    getSearchDefault() {
      getSearchDefault().then((res) => {
        this.showsearchdefault = res.data.showKeyword;
        this.realsearchdefault = res.data.realkeyword;

        setTimeout(() => {
          this.$root.bus.$emit("showsearchName", this.showsearchdefault);
        }, 20);

        setTimeout(() => {
          this.$root.bus.$emit("realsearchName", this.realsearchdefault);
        }, 20);
      });
    },
  },
  beforeDestroy() {
    //组件销毁时解除事件绑定
    this.$root.bus.$off("searchvalue");
  },
};
</script>

<style scoped>
</style>