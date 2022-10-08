<template>
  <div id="syntheticalBody">
    <scroll class="content" ref="scroll" :probe-type="3" :style="contentHeight">
      <div class="songs-block">
        <div class="songs-block-title">单曲</div>
        <div
          class="songs-block-body"
          v-for="(itemSongs, indexSongs) in song.songs"
        >
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
        <div class="songs-block-more">
          <span>{{ song.moreText }}</span>
        </div>
      </div>
      <div class="playlist-block">
        <div class="playlist-block-title">歌单</div>
        <div
          class="playlist-block-body"
          v-for="(itemPlaylist, indexPlaylist) in playlist.playLists"
        >
          <div>{{ itemPlaylist.id }}</div>
          <!-- <img :src="itemPlaylist.coverImgUrl" alt="" /> -->
        </div>
        <div class="playlist-block-more">
          <span>{{ playlist.moreText }}</span>
        </div>
      </div>
      <div class="video-block">
        <div class="video-block-title">视频</div>
        <div class="video-block-body"></div>
      </div>
      <div class="blog-block">
        <div class="blog-block-title">博客</div>
        <div class="blog-block-body"></div>
      </div>
      <div class="ablum-block">
        <div class="ablum-block-title">专辑</div>
        <div class="ablum-block-body"></div>
      </div>
      <div class="singer-block">
        <div class="singer-block-title">艺人</div>
        <div class="singer-block-body"></div>
      </div>
      <div class="sound-block">
        <div class="sound-block-title">声音</div>
        <div class="sound-block-body"></div>
      </div>
      <div class="user-block">
        <div class="user-block-title">用户</div>
        <div class="user-block-body"></div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import { getSearch } from "network/search.js";

export default {
  name: "syntheticalBody",
  components: {
    Scroll,
  },
  data() {
    return {
      resultTabId: 1018, //初始搜索标签ID
      keywords: "",
      song: {}, //综合搜索的单曲结果
      playlist: {}, //综合搜索的歌单结果
      video: {}, //综合搜索的视频结果
      blog: {}, //综合搜索的博客结果
      album: {}, //综合搜索的专辑结果
      singer: {}, //综合搜索的艺人结果
      sound: {}, //综合搜索的声音结果
      user: {}, //综合搜索的用户结果

      searchheight: "", // search的高度
      searchresulttabheight: "", // searchResultTab的高度
      miniplayerheight: "", //mini播放器的高度
    };
  },
  created() {
    //获取search的搜索关键字
    this.$root.bus.$on("realvalue", (data) => {
      this.keywords = data;
      console.log(this.keywords);
      this.getSearch();
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
    getSearch() {
      getSearch(this.keywords, this.resultTabId).then((res) => {
        if (res.code === 200) {
          const searchResult1 = res.result;
          this.song = searchResult1.song;
          this.playlist = searchResult1.playList;
          this.video = searchResult1.new_mlog;
          this.blog = searchResult1.song;
          this.album = searchResult1.album;
          this.singer = searchResult1.artist;
          this.sound = searchResult1.voice;
          this.user = searchResult1.user;
          //sim_query 相关搜索
          console.log(searchResult1);
        }
      });
    },
  },
  computed: {
    contentHeight() {
      let bottomHeight =
        this.searchheight + this.searchresulttabheight + this.miniplayerheight;
      let Height =
        "top: " +
        this.searchresulttabheight +
        "px; bottom: " +
        bottomHeight +
        "px";
      return Height;
    },
  },
};
</script>

<style scoped>
#syntheticalBody {
  height: 100vh;
}

.songs-block,
.playlist-block,
.video-block,
.blog-block,
.ablum-block,
.singer-block,
.sound-block,
.user-block {
  width: 90%;
  background-color: #fdf3f2;
  border-radius: 10px;

  text-align: center;
  margin: 10px auto;
}

.songs-block-title,
.playlist-block-title,
.video-block-title,
.blog-block-title,
.ablum-block-title,
.singer-block-title,
.sound-block-title,
.user-block-title {
  font-size: 20px;
  font-weight: bolder;
  margin: 0 20px;
  padding: 20px 0 10px;
  text-align: left;

  border-bottom: 1px solid #aaaaaa;
}

.songs-block-body {
  /* height: 100px; */
  margin: 0 20px;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
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