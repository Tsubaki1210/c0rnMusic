<template>
  <div id="singleBody">
    <scroll class="content" ref="scroll" :probe-type="3" :style="contentHeight">
      <div class="songs-block-body" v-for="(itemSongs, indexSongs) in song">
        <div class="songs-block-body-song">
          <div class="songs-block-body-song-info">
            <div class="songs-block-body-song-info-name">
              <span>{{ itemSongs.name }}</span>
            </div>
            <div class="songs-block-body-song-info-singer">
              <!-- <div class="music-sq-outer" v-if="playListMusicItem.sq == null">
                <span class="music-sq-inner">SQ</span>
              </div> -->
              <div class="singer">
                <!-- 多个歌手遍历打印且用‘/’分隔，核心在于template标签 -->
                <!-- 若在item.name的那一行按ENTER键换行的话，第一个数据后会有一个空格 -->
                <span
                  v-for="(itemSinger, indexSinger) in itemSongs.ar"
                  :key="indexSinger"
                  >{{ itemSinger.name
                  }}<template v-if="indexSinger < itemSongs.ar.length - 1">
                    <span>/</span>
                  </template>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="tubiao">
          <div class="mv">
            <i class="iconfont icon-mv"></i>
          </div>
          <div class="sangedian">
            <i class="iconfont icon-sangediandian"></i>
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

// import { Search } from "common/js/mixin";

export default {
  name: "singleBody",
  // mixins: [Search],
  components: {
    Scroll,
  },
  data() {
    return {
      keywords: "", //搜索关键词
      song: {}, //搜索的单曲结果
      type: 1, //搜索type类型
      search: true, //用来判断是否存入搜索关键词及调用搜索接口

      searchheight: "", // search的高度
      searchresulttabheight: null, // searchResultTab的高度
      miniplayerheight: "", //mini播放器的高度
    };
  },
  created() {
    //由于点击其他标签页，此组件并未销毁并一直占据$root.bus.on的数据，所以其他标签页无法获取数据
    //获取search的搜索关键字
    this.$root.bus.$on("realvalue", (data) => {
      this.keywords = data;
      this.$store.dispatch("getSearchKeyword", this.keywords);
      console.log(this.keywords);
      // this.getCloudSearch();
    });
    //获取search的高度
    this.$root.bus.$on("acceptsearchheight", (data) => {
      this.searchheight = data;
    });
    //获取searchResultTab的高度
    this.$root.bus.$on("acceptsearchtabheight", (data) => {
      this.searchresulttabheight = data;
    });
    //获取miniPlayer的高度
    this.$root.bus.$on("acceptminiplayerheight", (data) => {
      this.miniplayerheight = data;
    });
  },
  mounted() {},
  methods: {
    go() {
      if (this.search === false) {
        console.log(this.$data);
      }
    },
    getCloudSearch() {
      getCloudSearch(this.keywords, this.type).then((res) => {
        if (res.code === 200) {
          const searchResult = res.result;
          this.song = searchResult.songs;
          // this.playlist = searchResult1.playList;
          // this.video = searchResult1.new_mlog;
          // this.blog = searchResult1.song;
          // this.album = searchResult1.album;
          // this.singer = searchResult1.artist;
          // this.sound = searchResult1.voice;
          // this.user = searchResult1.user;
          //sim_query 相关搜索
          console.log(searchResult);
          console.log(this.song);
        }
      });
    },
  },
  computed: {
    ...mapState(["searchKeyword"]),
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
    this.$root.bus.$off("realvalue");
  },
};
</script>

<style scoped>
#singleBody {
  height: 100vh;
}

.songs-block-body {
  /* height: 100px; */
  /* margin: 0 20px; */
  padding: 8px 0 8px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.songs-block-body-song {
  display: flex;
  text-align: left;
}

.songs-block-body-song-info-name {
  font-size: 15px;
}

.singer span {
  font-size: 13px;
  color: #929292;
}

.tubiao {
  width: 20%;
  display: flex;
  align-items: center;
}

.mv,
.sangedian {
  flex: 1;
  text-align: center;
}

.icon-mv {
  font-size: 24px;
  /* margin: 0 10px; */
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