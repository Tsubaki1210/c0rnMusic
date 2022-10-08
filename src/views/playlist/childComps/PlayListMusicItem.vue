<template>
  <div class="music" @click="toMusicPlayer">
    <div class="serialnumber">{{ index + 1 }}</div>
    <div class="musicbaseinfo">
      <div class="musicbaseinfo-center">
        <div class="music-name">
          <span>{{ playListMusicItem.name }}</span>
        </div>
        <div class="music-singer">
          <div class="music-sq-outer" v-if="playListMusicItem.sq == null">
            <span class="music-sq-inner">SQ</span>
          </div>
          <div class="music-singer-name">
            <!-- 多个歌手遍历打印且用‘/’分隔，核心在于template标签 -->
            <!-- 若在item.name的那一行按ENTER键换行的话，第一个数据后会有一个空格 -->
            <span v-for="(item2, index2) in playListMusicSinger" :key="index2"
              >{{ item2.name
              }}<template v-if="index2 < playListMusicSinger.length - 1">
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
</template>

<script>
import { debounce } from "common/js/utils.js";
import { mapState } from "vuex";

export default {
  name: "PlayListMusicItem",
  inject: ["reload"],
  data() {
    return {
      playListMusicSinger: {},

      //将当前所有音乐存入vuex
      savemusicplayer: {},
      //将点击的音乐详情存入vuex
      savemusicplayerDetail: {},
      //目的将vuex的当前音乐时间清空
      savemusicplayercurrentDuration: 0,
      //发送自动播放与将歌单存入vuex的信号
      emitNumber: 1,
      //存入当前歌单第几首歌
      // savemusicPlayerListCount: 0,
    };
  },
  props: {
    playListMusicItem: {
      type: Object,
      default() {
        return {};
      },
    },
    //接收index值
    index: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.playListMusicSinger = this.playListMusicItem.ar;
    console.log(this.playListMusicSinger);
  },
  computed: {
    ...mapState(["musicPlayer"]),
    ...mapState(["musicPlayerDetail"]),
    ...mapState(["musicPlayerNum"]),
    ...mapState(["musicPlayerCurrentDuration"]),
    // ...mapState(["musicPlayerTotalDuration"]),
  },
  methods: {
    toMusicPlayer() {
      this.savemusicplayerDetail = this.playListMusicItem;
      // this.savemusicPlayerListCount = this.index;
      // console.log(this.savemusicPlayerListCount);
      this.$store.dispatch("getMusicPlayerDetail", this.savemusicplayerDetail);
      this.$store.dispatch(
        "getMusicPlayerCurrentDuration",
        this.savemusicplayercurrentDuration
      );
      this.$emit("emitPlayListNum", this.emitNumber);
      this.emitNum();
      this.reload();
      console.log(this.savemusicplayerDetail);
    },
    emitNum: debounce(function () {
      setTimeout(() => {
        this.$root.bus.$emit("emitReloadNum1", this.emitNumber);
        // this.$root.bus.$emit(
        //   "emitMusicPlayerListCountNum",
        //   this.savemusicPlayerListCount
        // );
      }, 20);
    }),
  },
};
</script>

<style scoped>
.music {
  height: 50px;
  /* padding: 5px 0; */
  display: flex;
}

.serialnumber {
  /* width: 50px; */
  width: 14%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  color: #929292;
}

.musicbaseinfo {
  float: left;
  height: 50px;
  width: 60%;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
}

.musicbaseinfo-center {
  margin: auto 0;
  width: 80%;
}

.music-name {
  font-size: 15px;
  /* 文本过长时显示省略号 */
  /* 不溢出当前屏幕,即会自动换行的文字的css */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  /* 溢出屏幕的文字,让自动换行的文字变成单文本行的css */
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
}

.music-singer {
  display: flex;
}

.music-sq-outer {
  margin-right: 4px;
}

.music-sq-inner {
  padding: 0 2px;
  font-size: 10px;
  border: 1px solid var(--color-tint);
  border-radius: 2px;
  color: var(--color-tint);
}

.music-singer-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.music-singer-name span {
  font-size: 13px;
  color: #929292;
}

.tubiao {
  /* float: right; */

  color: #929292;
  display: flex;
  width: 26%;
  justify-content: space-evenly;
  align-items: center;

  border-bottom: 1px solid #dcdcdc;
}

.icon-mv {
  font-size: 24px;
}
</style>