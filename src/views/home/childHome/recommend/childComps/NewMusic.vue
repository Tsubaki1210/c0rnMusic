<template>
  <div>
    <div class="new-music-title">
      <span>最新音乐</span>
      <van-icon name="arrow" />
    </div>
    <div class="new-music">
      <new-music-item
        v-for="(item, index) in news"
        :key="index"
        :new-music-item="item"
      ></new-music-item>
    </div>
  </div>
</template>

<script>
import NewMusicItem from "views/home/childHome/recommend/childComps/NewMusicItem";

import { getNewMusic } from "network/home.js";

export default {
  name: "NewMusic",
  components: {
    NewMusicItem,
  },
  data() {
    return {
      news: {},
    };
  },
  created() {
    this.getNewMusic();
  },
  methods: {
    //获取最新音乐近6条数据
    getNewMusic() {
      getNewMusic().then((res) => {
        this.news = res.result;
        console.log(this.news);
      });
    },
  },
};
</script>

<style scoped>
.new-music-title {
  margin: 1.25rem 0.3125rem 0.3125rem 0.3125rem;
  font-size: 0.8125rem;
  font-weight: bolder;
}

.new-music {
  margin: 0.3125rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>