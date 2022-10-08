<template>
  <!--  1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词,
  1009: 电台, 1014: 视频 -->
  <!-- bookCount是收藏 -->
  <div id="playlistBody">
    <div
      class="playlistBody-song-list"
      v-for="(item, index) in playlist"
      :key="index"
    >
      <div class="playlistBody-song-list-left-img">
        <img :src="item.coverImgUrl" alt="" />
      </div>
      <div class="playlistBody-song-list-text">
        <p class="playlistBody-list-title">{{ item.name }}</p>
        <p class="playlistBody-list-text">
          {{ item.trackCount }}首，By {{ item.creator.nickname }}，播放{{
            item.playCount >= 100000000
              ? (item.playCount / 100000000).toFixed(1) + "亿"
              : item.playCount >= 10000 && item.playCount < 100000000
              ? (item.playCount / 10000).toFixed(1) + "万"
              : item.playCount
          }}次
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import { getCloudSearch } from "network/search.js";

export default {
  name: "playlistBody",
  components: {
    Scroll,
  },
  data() {
    return {
      keywords: "", //搜索关键词
      playlist: {}, //搜索的歌单结果
      type: 1000, //搜索type类型

      searchheight: "", // search的高度
      searchresulttabheight: null, // searchResultTab的高度
      miniplayerheight: "", //mini播放器的高度
    };
  },
  created() {
    console.log("playlist");
    //获取search的搜索关键字
    this.$root.bus.$on("realvalue", (data) => {
      console.log("11");
      console.log(data);
      // this.keywords = data;
      // console.log(this.keywords);
      // this.getCloudSearch();
    });
    //获取search的高度
    this.$root.bus.$on("acceptsearchheight", (data) => {
      this.searchheight = data;
      console.log(this.searchheight);
    });
    //获取searchResultTab的高度
    this.$root.bus.$on("acceptsearchtabheight", (data) => {
      this.searchresulttabheight = data;
      console.log(this.searchresulttabheight);
    });
    //获取miniPlayer的高度
    this.$root.bus.$on("acceptminiplayerheight", (data) => {
      this.miniplayerheight = data;
      console.log(data);
    });
  },
  methods: {
    getCloudSearch() {
      getCloudSearch(this.keywords, this.type).then((res) => {
        if (res.code === 200) {
          const searchResult = res.result;
          this.playlist = searchResult.playlists;
          // this.playlist = searchResult1.playList;
          // this.video = searchResult1.new_mlog;
          // this.blog = searchResult1.song;
          // this.album = searchResult1.album;
          // this.singer = searchResult1.artist;
          // this.sound = searchResult1.voice;
          // this.user = searchResult1.user;
          //sim_query 相关搜索
          console.log(searchResult);
        }
      });
    },
  },
  computed: {
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
.playlistBody-song-list {
  height: 70px;
  margin: 5px 0 5px 15px;
  display: flex;
}

.playlistBody-song-list-left-img {
  float: left;
  height: 70px;
}

.playlistBody-song-list-left-img img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
}

.playlistBody-song-list-text {
  float: left;
  text-align: left;
  margin: auto 10px;
  flex: 1;
}

.playlistBody-list-title {
  margin: 6px 0;
  font-size: 16px;
}

.playlistBody-list-text {
  margin: 6px 0;
  font-size: 14px;
  color: #7c7c7c;
}
</style>