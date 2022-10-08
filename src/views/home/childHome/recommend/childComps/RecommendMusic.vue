<template>
  <div>
    <div class="re-music-title">
      <span>推荐歌单</span>
      <van-icon name="arrow" />
    </div>
    <div class="recommend-music">
      <recommend-music-item
        v-for="(item, index) in recommends"
        :key="index"
        :recommend-music-item="item"
      ></recommend-music-item>
    </div>
  </div>
</template>

<script>
import RecommendMusicItem from "views/home/childHome/recommend/childComps/RecommendMusicItem";

import { getRecommendMusic } from "network/home.js";

export default {
  name: "RecommendMusic",
  data() {
    return {
      recommends: {},
    };
  },
  components: {
    RecommendMusicItem,
  },
  created() {
    this.getRecommendMusic();
  },
  methods: {
    //获取推荐音乐近6条数据
    getRecommendMusic() {
      getRecommendMusic().then((res) => {
        this.recommends = res.result;
        console.log(this.recommends);
      });
    },
  },
};
</script>

<style scoped>
.re-music-title {
  margin: 0.3125rem;
  font-size: 0.8125rem;
  font-weight: bolder;
}

.recommend-music {
  margin: 0.3125rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>