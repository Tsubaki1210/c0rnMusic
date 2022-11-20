<template>
  <!-- bookCount是收藏 -->
  <div id="playlistbody">
    <scroll class="content" ref="scroll" :probe-type="3" :style="contentHeight">
      <div
        class="playlistbody-song-list"
        v-for="(item, index) in playlist"
        :key="index"
      >
        <div class="playlistbody-song-list-left-img">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="playlistbody-song-list-text">
          <p class="playlistbody-list-title">{{ item.name }}</p>
          <p class="playlistbody-list-text">
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
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import { mapState } from "vuex";

import { getCloudSearch } from "network/search.js";

// import { Search } from "common/js/mixin";

export default {
  name: "playlistBody",
  // mixins: [Search],
  components: {
    Scroll,
  },
  data() {
    return {
      keywords: this.$store.state.searchKeyword, //搜索关键词
      playlist: {}, //搜索的歌单结果
      type: 1000, //搜索type类型

      searchheight: this.$store.state.searchHeight, // search的高度
      searchresulttabheight: this.$store.state.searchTabHeight, // searchResultTab的高度
      miniplayerheight: this.$store.state.miniPlayerHeight, //mini播放器的高度
    };
  },
  created() {
    // this.getCloudSearch();
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
  beforeDestroy() {
    //组件销毁时解除事件绑定
    this.$root.bus.$off("searchvalue");
  },
};
</script>

<style scoped>
#playlistbody {
  height: 100vh;
}

.playlistbody-song-list {
  height: 70px;
  margin: 5px 0 5px 15px;
  display: flex;
}

.playlistbody-song-list-left-img {
  float: left;
  height: 70px;
}

.playlistbody-song-list-left-img img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
}

.playlistbody-song-list-text {
  float: left;
  text-align: left;
  margin: auto 10px;
  flex: 1;
}

.playlistbody-list-title {
  margin: 6px 0;
  font-size: 16px;
}

.playlistbody-list-text {
  margin: 6px 0;
  font-size: 14px;
  color: #7c7c7c;
}

.content {
  overflow: auto;
  position: absolute;
  /* top: var(--cover-height); */
  /* top: 44px; */
  /* bottom: 159px; */
  left: 0;
  right: 0;
}

.content::-webkit-scrollbar {
  display: none;
}
</style>