<template>
  <div id="albumbody">
    <scroll class="content" ref="scroll" :probe-type="3" :style="contentHeight">
      <div class="album" v-for="(item, index) in album" :key="index">
        <div class="album-left">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="album-right">
          <div class="album-right-title">{{ item.name }}</div>
          <div class="album-right-info">
            <span class="album-right-info-artist">{{ item.artist.name }}</span>
            <span class="album-right-info-time">{{
              item.publishTime | showDate
            }}</span>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import { formatDate } from "common/js/utils";

import { mapState } from "vuex";

import { getCloudSearch } from "network/search.js";

export default {
  name: "albumBody",
  components: {
    Scroll,
  },
  data() {
    return {
      keywords: this.$store.state.searchKeyword, //搜索关键词
      album: {}, //搜索的歌单结果
      type: 10, //搜索type类型

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
          this.album = searchResult.albums;
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
  filters: {
    showDate(value) {
      const date = new Date(value);
      return formatDate(date, "yyyy.MM.dd");
    },
  },
};
</script>

<style scoped>
#albumbody {
  height: 100vh;
}

.album {
  padding: 5px 15px;
  display: flex;
  align-items: center;
}

.album-left img {
  width: 52px;
  height: 52px;
  border-radius: 5px;
  display: block;
}

.album-right {
  margin: auto 10px;
}

.album-right-title {
  margin: 2px 0;
}

.album-right-info-artist {
  font-size: 12px;
}

.album-right-info-time {
  margin: 0 10px;

  font-size: 12px;
  color: #646464;
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