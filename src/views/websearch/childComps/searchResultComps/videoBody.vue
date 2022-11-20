<template>
  <div id="videobody">
    <scroll class="content" ref="scroll" :probe-type="3" :style="contentHeight">
      <div class="video" v-for="(item, index) in video" :key="index">
        <div class="video-left">
          <img :src="item.coverUrl" alt="" />
        </div>
        <div class="video-right">
          <div class="video-right-title">{{ item.title }}</div>
          <div class="video-right-info">
            <span
              class="video-right-info-artist"
              v-for="(itemArtist, indexArtist) in item.creator"
              :key="indexArtist"
              >{{ itemArtist.userName
              }}<template v-if="indexArtist < item.creator.length - 1"
                ><span>/</span>
              </template>
            </span>
            <div class="video-right-info-views">
              {{
                item.playTime >= 100000000
                  ? (item.playTime / 100000000).toFixed(1) + "亿"
                  : item.playTime >= 10000 && item.playTime < 100000000
                  ? (item.playTime / 10000).toFixed(1) + "万"
                  : item.playTime
              }}播放
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import { mapState } from "vuex";

import { getCloudSearch } from "network/search.js";

export default {
  name: "videoBody",
  components: {
    Scroll,
  },
  data() {
    return {
      keywords: this.$store.state.searchKeyword, //搜索关键词
      video: {}, //搜索的歌单结果
      type: 1014, //搜索type类型

      searchheight: this.$store.state.searchHeight, // search的高度
      searchresulttabheight: this.$store.state.searchTabHeight, // searchResultTab的高度
      miniplayerheight: this.$store.state.miniPlayerHeight, //mini播放器的高度
    };
  },
  created() {
    this.getCloudSearch();
  },
  methods: {
    getCloudSearch() {
      getCloudSearch(this.keywords, this.type).then((res) => {
        if (res.code === 200) {
          const searchResult = res.result;
          this.video = searchResult.videos;
          // this.playlist = searchResult1.playList;
          // this.video = searchResult1.new_mlog;
          // this.blog = searchResult1.song;
          // this.album = searchResult1.album;
          // this.singer = searchResult1.artist;
          // this.sound = searchResult1.voice;
          // this.user = searchResult1.user;
          //sim_query 相关搜索
          console.log(this.video);
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
};
</script>

<style scoped>
#videobody {
  height: 100vh;
}

.video {
  padding: 5px 15px;
  display: flex;
  align-items: center;
}

.video-left img {
  /* width: 40%; */
  /* height: 23%; */
  /* flex-shrink: 0; */
  width: 138px;
  height: 77px;
  border-radius: 5px;
  display: block;
}

.video-right {
  padding: 0 10px;
}

.video-right-title {
  /* 文本过长时显示省略号 */
  /* 不溢出当前屏幕,即会自动换行的文字的css */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;

  margin: 5px 0;
}

.video-right-info {
  font-size: 12px;
  color: #646464;
}

.video-right-info-artist {
  margin: 5px 0;
}

.video-right-info-views {
  margin: 5px 0;
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