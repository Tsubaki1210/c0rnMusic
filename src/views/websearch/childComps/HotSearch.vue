<template>
  <div>
    <div class="hot-search-title">
      <span>热门搜索</span>
    </div>
    <div class="hot-search-text">
      <hot-search-item
        v-for="(item, index) in hotsearch"
        :key="index"
        :hot-search-item="item"
      ></hot-search-item>
    </div>
    <van-divider />
  </div>
</template>

<script>
import HotSearchItem from "views/websearch/childComps/HotSearchItem";

import { getHotSearch } from "network/search.js";

export default {
  name: "HotSearch",
  components: {
    HotSearchItem,
  },
  data() {
    return {
      hotsearch: {},
    };
  },
  created() {
    this.getHotSearch();
  },
  methods: {
    //获取热门搜索的数据
    getHotSearch() {
      getHotSearch().then((res) => {
        this.hotsearch = res.result.hots;
        console.log(this.hotsearch);
      });
    },
  },
};
</script>

<style scoped>
.hot-search-title {
  margin: 10px 8px 5px;
}

.hot-search-title span {
  font-size: 12px;
  color: #919191;
}

.hot-search-text {
  margin: 0 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>