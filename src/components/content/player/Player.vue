<template>
  <div class="player" ref="PlayerHeight">
    <!-- popup中z-index设置的数值会自动+1，所以在所设置的数值基础上-1 -->
    <van-popup
      v-model="playerMini"
      :overlay="false"
      position="bottom"
      class="player-mini"
      @click="showPlayerFull"
      z-index="7"
    >
      <div class="player-mini-music-progress-bar">
        <van-slider
          v-model="musicDuration"
          :max="totalDuration"
          @change="musicDurationChange"
          button-size="0"
          active-color="var(--color-tint)"
          disabled
        />
        <!-- <span>{{ musicDuration | showSongNowtime }}</span
        >/
        <span>{{ getSongTotaltime }}</span> -->
      </div>
      <div class="player-mini-music-info">
        <div class="player-mini-music-info-img" :class="imgRotate">
          <img :src="musicplayerDetail.al.picUrl" alt="" />
        </div>
        <div class="player-mini-music-info-text">
          <div class="player-mini-music-info-text-songname">
            {{ musicplayerDetail.name }}
          </div>
          <div class="player-mini-music-info-text-tips">
            横滑可以切换上下首哦
          </div>
        </div>
        <!-- click给stop是因为阻止除法外层div的点击事件 -->
        <div class="player-mini-music-icon">
          <div
            v-show="paused"
            class="play"
            aria-hidden="true"
            @click.stop="play"
          >
            <i class="iconfont icon-bofang"></i>
          </div>
          <div
            v-show="!paused"
            class="pause"
            aria-hidden="true"
            @click.stop="play"
          >
            <i class="iconfont icon-zanting"></i>
          </div>
        </div>
        <div class="player-mini-liebiao" @click.stop="liebiao">
          <i class="iconfont icon-liebiao"></i>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="playerFull"
      :overlay="false"
      position="bottom"
      class="player-full"
      z-index="9"
    >
      <!-- :style="Background" -->
      <div class="background" :style="Background"></div>
      <div class="player-full-top" ref="PlayerFullTopHeight">
        <div class="player-full-top-left">
          <van-icon
            class="player-full-top-left-icon"
            name="arrow-down"
            color="#fff"
            @click="showPlayerMini"
          />
        </div>
        <div class="player-full-top-title">
          <div class="player-full-top-title-songname">
            {{ musicplayerDetail.name }}
          </div>
          <div class="player-full-top-title-singer">
            <!-- 多个歌手遍历打印且用‘/’分隔，核心在于template标签 -->
            <!-- 若在item.name的那一行按ENTER键换行的话，第一个数据后会有一个空格 -->
            <span v-for="(item, index) in musicplayerSinger" :key="index"
              >{{ item.name
              }}<template v-if="index < musicplayerSinger.length - 1">
                <span>/</span>
              </template>
            </span>
          </div>
        </div>
        <div class="player-full-top-right">
          <i class="iconfont icon-fenxiang_2"></i>
        </div>
      </div>
      <!-- :style="PlayerFullMiddleHeight" -->
      <div class="player-full-middle">
        <div class="player-full-middle-music-img">
          <img :class="imgRotate" :src="musicplayerDetail.al.picUrl" alt="" />
        </div>
      </div>
      <div class="player-full-bottom" ref="PlayerFullBottomHeight">
        <div class="player-full-bottom-music-info-icon">
          <div>
            <div
              v-show="like"
              class="player-full-bottom-music-info-icon-like"
              @click="musicLike"
            >
              <van-icon name="like-o" />
            </div>
            <div
              v-show="!like"
              class="player-full-bottom-music-info-icon-like"
              @click="musicLike"
            >
              <van-icon name="like" :style="{ color: '#FF0000' }" />
            </div>
          </div>
          <div
            class="player-full-bottom-music-info-icon-xiazai"
            @click="musicDownload"
          >
            <i class="iconfont icon-xiazai"></i>
          </div>
          <div
            class="player-full-bottom-music-info-icon-pinglun"
            @click="musicComment"
          >
            <van-icon name="chat-o" :badge="this.commentCount" />
          </div>
          <div class="player-full-bottom-music-info-icon-sangediandian">
            <i class="iconfont icon-sangediandian"></i>
          </div>
        </div>
        <div class="player-full-bottom-music-progress-bar">
          <span>{{ musicDuration | showSongNowtime }}</span>
          <van-slider
            v-model="musicDuration"
            :max="totalDuration"
            @change="musicDurationChange"
            @drag-start="moveStart"
            @drag-end="moveEnd"
            button-size="12px"
            active-color="var(--color-tint)"
          />
          <span>{{ getSongTotaltime }}</span>
        </div>
        <div class="player-full-bottom-music-icon">
          <div @click="changePlayerMode">
            <div v-show="this.playerMode === 0">
              <i class="iconfont icon-shunxubofang"></i>
            </div>
            <div v-show="this.playerMode === 1">
              <i class="iconfont icon-xunhuanbofang"></i>
            </div>
            <div v-show="this.playerMode === 2">
              <i class="iconfont icon-suijibofang"></i>
            </div>
          </div>
          <div @click="previousTrack">
            <i class="iconfont icon-shangyishou"></i>
          </div>
          <div>
            <div
              v-show="paused"
              class="play"
              aria-hidden="true"
              @click.stop="play"
            >
              <i
                class="iconfont icon-bofang"
                :style="{ color: '#fff', 'font-size': '50px' }"
              ></i>
            </div>
            <div
              v-show="!paused"
              class="pause"
              aria-hidden="true"
              @click.stop="play"
            >
              <i
                class="iconfont icon-zanting"
                :style="{ color: '#fff', 'font-size': '50px' }"
              ></i>
            </div>
          </div>
          <div @click="nextTrack">
            <i class="iconfont icon-xiayishou"></i>
          </div>
          <div @click="liebiao">
            <i
              class="iconfont icon-liebiao"
              :style="{ color: '#fff', 'font-size': '26px' }"
            ></i>
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="playerList"
      position="bottom"
      class="player-list"
      :style="{ height: '60%', width: '90%' }"
    >
      <div class="player-list-title" ref="PlayerListTitleHeight">
        <span>当前播放</span>
      </div>
      <div class="player-list-icon" ref="PlayerListIconHeight">
        <div class="player-list-icon-playermode" @click="changePlayerMode">
          <div
            class="player-list-icon-playermode-icon"
            v-show="this.playerMode === 0"
          >
            <i
              class="iconfont icon-shunxubofang"
              :style="{ color: '#646566', 'font-size': '16px' }"
            ></i>
            <span>列表播放</span>
          </div>
          <div
            class="player-list-icon-playermode-icon"
            v-show="this.playerMode === 1"
          >
            <i
              class="iconfont icon-xunhuanbofang"
              :style="{ color: '#646566', 'font-size': '16px' }"
            ></i>
            <span>单曲循环</span>
          </div>
          <div
            class="player-list-icon-playermode-icon"
            v-show="this.playerMode === 2"
          >
            <i
              class="iconfont icon-suijibofang"
              :style="{ color: '#646566', 'font-size': '16px' }"
            ></i>
            <span>随机播放</span>
          </div>
        </div>
      </div>
      <scroll
        class="content"
        ref="scroll"
        :probe-type="3"
        :style="PlayerListMusicHeight"
      >
        <div class="player-list-music">
          <div
            class="player-list-music-info"
            v-for="(item1, index1) in musicplayer"
            :key="index1"
            @click="listenMusic(index1)"
          >
            <div class="player-list-music-info-base">
              <span class="player-list-music-info-base-songname">{{
                item1.name
              }}</span>
              <span class="player-list-music-info-base-symbol">-</span>
              <!-- 多个歌手遍历打印且用‘/’分隔，核心在于template标签 -->
              <!-- 若在item.name的那一行按ENTER键换行的话，第一个数据后会有一个空格 -->
              <span
                class="player-list-music-info-base-singer"
                v-for="(item2, index2) in item1.ar"
                :key="index2"
                >{{ item2.name
                }}<template v-if="index2 < item1.ar.length - 1">
                  <span>/</span>
                </template>
              </span>
            </div>
            <div
              class="player-list-music-info-icon"
              @click.stop="deleteMusic(index1)"
            >
              <van-icon name="cross" />
            </div>
          </div>
        </div>
      </scroll>
    </van-popup>
    <audio
      ref="audio"
      :autoplay="isAuto"
      :loop="isLoop"
      :src="`https://music.163.com/song/media/outer/url?id=${musicplayerDetail.id}.mp3`"
    ></audio>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import { mapState } from "vuex";

import { debounce, TotaltimeFormat, NowtimeFormat } from "common/js/utils";

import {
  getRecommendSongs,
  getSongsDetail,
  getSongsCommentCount,
  getRecentSongs,
  getUserLikeSongs,
  getUserLike,
} from "network/song.js";

export default {
  name: "Player",
  inject: ["reload"],
  components: {
    Scroll,
  },
  data() {
    return {
      isDrag: false, //进度条圆点是否处于‘拖动’状态

      screenWidth: 0, //全屏宽度
      screenHeight: 0, //全屏高度
      usertoken: null, //用户token
      playerfulltopheight: 0, //全屏播放器头部高度
      playerfullbottomheight: 0, //全屏播放器底部高度
      playerlisttitleheight: 0, //播放列表标题高度
      playerlisticonheight: 0, //播放列表icon高度
      miniPlayerHeight: "", //mini播放器的高度
      playerMini: null, //迷你播放器
      playerFull: null, //全屏播放器
      playerList: false, //音乐列表
      playerMode: null, //当前播放模式 0:顺序 1:循环 2:随机
      musicDuration: 0, //音乐当前播放时间
      totalDuration: 100, //音乐总时长,先默认给100
      musicId: "", //歌曲ID
      paused: true, //播放和暂停切换
      dt: 0, //全屏模式下的歌曲总时间(分钟)
      isAuto: false, //是否为自动播放
      isLoop: false, //循环模式下为true，其余为false
      ReloadNum1: 0, //是否有新歌曲存入vuex(歌单点击的)
      ReloadNum2: 0, //是否有新歌曲存入vuex(列表点击的)
      emitOpenCommentNumber: 1, //发送打开评论的信号
      emitCommentCount: 10, //将当前歌曲的评论数发送到CommentTop
      musicplayerSinger: {}, //当前播放器音乐的歌手
      isImgDisabled: true, //false暂停时图片停止旋转，true播放时图片开始旋转
      commentCount: "", //歌曲评论数
      musicPlayerListCount: null, //当前播放器列表的第几首歌
      debace: true, //简单防抖
      userLikeSongs: null, //用户喜欢的音乐
      like: true, //喜欢icon实心和空心切换
      userid: null, //登录用户的ID

      //vuex的数据
      savemusicplayercurrentDuration: 0, //目的将vuex的当前音乐时间清空
      savemusicplayerDetail: {}, //将当前播放器音乐存入vuex
      savemusicplayerNum: {}, //将当前播放器是否有音乐的状态存入vuex
      loginstatus: this.$store.state.loginStatus, //用户登录信息(简单)
      userlikesongsId: this.$store.state.userLikeSongsId, //用户喜欢的音乐ID
      musicplayerDetail: this.$store.state.musicPlayerDetail, //当前播放器音乐详情
      musicplayer: this.$store.state.musicPlayer, //当前播放器所存放的歌曲
      musicplayerMini: this.$store.state.musicPlayerMini, //当前播放器mini
      musicplayerFull: this.$store.state.musicPlayerFull, //当前播放器全屏
      musicplayerMode: this.$store.state.musicPlayerMode, //当前播放器播放模式
      musicplayerNum: this.$store.state.musicPlayerNum, //当前播放器是否为空
      // musicplayerCount: this.$store.state.musicPlayerCount, //当前播放器的第几首歌
      musicplayercurrentDuration: this.$store.state.musicPlayerCurrentDuration, //当前音乐的播放时间
      musicplayertotalDuration: this.$store.state.musicPlayerTotalDuration, //当前音乐的总时间
    };
  },
  created() {
    //全屏的宽和高
    this.screenWidth = window.screen.width;
    this.screenHeight = window.screen.height;
    //vuex获取当前播放器Mini还是全屏(由于局部刷新[reload]会重置此组件内部所设置的Mini或全屏)
    this.playerMini = JSON.parse(this.musicplayerMini);
    this.playerFull = JSON.parse(this.musicplayerFull);
    this.playerMode = JSON.parse(this.musicplayerMode);
    if (this.playerMode === 0 && this.playerMode === 2) {
      this.isLoop = false;
    } else if (this.playerMode === 1) {
      this.isLoop = true;
    }
    //判断当前播放器是mini还是全屏，若mini发送mini播放器高度
    if (this.playerMini === true) {
      this.playerMiniHeight();
    }
    console.log(this.playerMini);
    //当前播放器时第几首歌
    this.musicPlayerListCount = parseInt(this.$store.state.musicPlayerCount);
    // if (this.musicPlayerListCount === null) {
    //   this.musicplayer.forEach((item, index) => {
    //     if (this.musicplayerDetail.id === item.id) {
    //       this.musicPlayerListCount = index;
    //     }
    //   });
    // }
    console.log(this.musicPlayerListCount);
    //用户登录信息token
    this.usertoken = this.$store.state.userToken;
    //用户ID
    if (this.usertoken !== null) {
      this.userid = this.loginstatus.profile.userId;
    }
    //保存当前播放器音乐的总时间(秒)
    this.totalDuration = this.musicplayertotalDuration;
    //保存当前播放器音乐的总时间(分钟)
    this.dt = this.musicplayerDetail.dt;
    //接收PlayListMusicItem的数据(若点击新歌曲则接收,反之无,目的是退出后重新加载完成后正确显示暂停按钮)
    this.$root.bus.$on("emitReloadNum1", (data) => {
      this.ReloadNum1 = data;
      if (this.ReloadNum1 === 1) {
        this.musicplayerLoad();
      }
    });
    //接收Player自身的数据,列表歌单的数据(若点击新歌曲则接收,反之无,目的是退出后重新加载完成后正确显示暂停按钮)
    //菜逼无法解决本组件传值的问题
    this.$root.bus.$on("emitReloadNum2", (data) => {
      this.ReloadNum2 = data;
      if (this.ReloadNum2 === 1) {
        this.musicplayerLoad();
      }
    });
    //接收PlayListMusicItem的第几首歌的数据,为了完成列表循环
    // this.$root.bus.$on("emitMusicPlayerListCountNum", (data) => {
    //   this.musicPlayerListCount = data;
    //   console.log(this.musicPlayerListCount);
    // });

    //判断是否有新歌曲存入vuex，若无则将自动播放禁止且恢复暂停键(歌单点击的)
    if (this.ReloadNum1 === 0) {
      this.isAuto = false;
      this.paused = true;
    }
    //判断是否有新歌曲存入vuex，若无则将自动播放禁止且恢复暂停键(列表点击的)
    if (this.ReloadNum2 === 0) {
      this.isAuto = false;
      this.paused = true;
    } else if (this.ReloadNum2 === 1) {
      this.musicplayerLoad();
    }
    console.log(this.$data);
    //若当前播放器无音乐则随机获取热门音乐中的一首
    if (this.musicplayerNum === 0) {
      getRecommendSongs().then((res) => {
        this.musicId = res.result[0].id;
        console.log(this.musicId);
        this.getSongsDetail(this.musicId);
      });
    }
    //获取vuex中当前播放器音乐的当前播放时间(为了退出后也能使进度条获取当前播放时间)
    if (this.musicplayercurrentDuration != 0) {
      this.musicDuration = parseInt(this.musicplayercurrentDuration);
      console.log(this.musicDuration);
    }
    //保存当前播放器音乐的歌手
    this.musicplayerSinger = this.musicplayerDetail.ar;

    //初始化歌曲评论
    this.getSongsCommentCount();

    //将推荐歌曲存入vuex
    // getRecommendSongs().then((res) => {
    //   this.$store.dispatch("getMusicPlayer", res.result);
    // });

    // getRecentSongs().then((res) => {
    //   console.log(res);
    // });

    //将当前音乐ID与用户喜欢的音乐ID做匹配,匹配前判断是否登录
    this.userLikeSongs = this.userlikesongsId;
    if (this.usertoken === null || undefined) {
      this.userLikeSongs = null;
      this.like = true;
    } else {
      if (this.userLikeSongs === null || undefined || {}) {
        getUserLikeSongs(this.userid).then((res) => {
          this.userLikeSongs = res.ids;
          this.$store.dispatch("getUserLikeSongsId", this.userLikeSongs);
          this.userLikeSongs.forEach((item) => {
            if (this.musicplayerDetail.id === item) {
              this.like = false;
            }
          });
        });
      } else {
        this.userLikeSongs.forEach((item) => {
          if (this.musicplayerDetail.id === item) {
            this.like = false;
          }
        });
      }
    }

    //初始化点击喜欢的音乐
    // this.getUserLike();
  },
  mounted() {
    //先执行一次给播放器设置 timeupdate 实时观察
    this.musicDurationChange();

    //离开页面时恢复播放器初始设置
    let beginTime = 0;
    let differTime = 0;
    window.onbeforeunload = function () {
      beginTime = new Date().getTime();
    };
    window.onunload = function () {
      differTime = new Date().getTime() - beginTime;
      if (differTime <= 5) {
        localStorage.removeItem("musicPlayerMini");
        localStorage.removeItem("musicPlayerFull");
      }
    };
    //进度条按下取消拖动原生写法(B站 老尚 Vue3)
    //获取进度条
    // let pbar = document.getElementById("progressBar");
    // // let isDrag = false;
    // //进度条圆点按下事件
    // pbar.addEventListener("mousedown", function () {
    //   this.isDrag = true;
    //   // isDrag = true;
    //   console.log(this.isDrag);
    // });
    // document.body.addEventListener("mousemove", function () {
    //   this.isDrag = true;
    //   console.log(this.isDrag);
    // });
    // //进度条圆点抬起事件(这里用document.body是为了圆点拖动时在pbar外也能拖动，也能监听到)
    // document.body.addEventListener("mouseup", function () {
    //   this.isDrag = false;
    // });
  },
  watch: {
    // $route: function () {
    //   if (this.$route.name == "LoginPhone") {
    //     this.isShowPlayer = false;
    //   } else {
    //     this.isShowPlayer = true;
    //   }
    // },
  },
  computed: {
    ...mapState(["loginStatus"]),
    ...mapState(["userToken"]),
    ...mapState(["userLikeSongsId"]),
    ...mapState(["musicPlayer"]),
    ...mapState(["musicPlayerMini"]),
    ...mapState(["musicPlayerFull"]),
    ...mapState(["musicPlayerDetail"]),
    ...mapState(["musicPlayerNum"]),
    ...mapState(["musicPlayerCurrentDuration"]),
    ...mapState(["musicPlayerTotalDuration"]),

    getSongTotaltime() {
      return TotaltimeFormat(this.dt);
    },
    //playerFull背景图
    Background() {
      const playerFullImage = this.musicplayerDetail.al.picUrl;
      const backgroundInfo = "background-image: url(" + playerFullImage + ")";
      // width : " +
      //   this.screenWidth +
      //   "px; height: " +
      //   this.screenHeight +
      //   "px;
      return backgroundInfo;
    },
    //全屏播放器中部高度
    // PlayerFullMiddleHeight() {
    //   const height =
    //     this.screenHeight -
    //     this.playerfulltopheight -
    //     this.playerfullbottomheight;
    //   const playerfullmiddleheight = "height: " + height + "px";
    //   return playerfullmiddleheight;
    // },
    //播放器当前歌曲图片判断旋转
    imgRotate() {
      return this.paused === true
        ? "player-music-img-pause"
        : "player-music-img-play";
    },
    //播放列表顶部与音乐的高度
    PlayerListMusicHeight() {
      return {
        "--cover-height":
          this.playerlisttitleheight + this.playerlisticonheight + "px",
      };
    },
  },
  methods: {
    //发送mini播放器的高度
    playerMiniHeight() {
      this.$nextTick(() => {
        this.miniPlayerHeight =
          this.$refs.PlayerHeight.children[0].clientHeight;
        console.log(this.miniPlayerHeight);
        this.$store.dispatch("getMiniPlayerHeight", this.miniPlayerHeight);
        // setTimeout(() => {
        //   this.$root.bus.$emit("acceptminiplayerheight", this.miniPlayerHeight);
        // }, 200);
      });
    },
    //获取歌曲详情
    getSongsDetail() {
      getSongsDetail(this.musicId).then((res) => {
        this.savemusicplayerDetail = res.songs[0];
        this.$store.dispatch(
          "getMusicPlayerDetail",
          this.savemusicplayerDetail
        );
        //将播放器已有音乐的状态存入vuex
        let player = 1;
        this.$store.dispatch("getMusicPlayerNum", player);

        console.log(this.musicplayerDetail);
      });
    },
    //播放和暂停切换
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.paused = false;
        // this.isImgDisabled = true;
      } else {
        this.$refs.audio.pause();
        this.paused = true;
        // this.isImgDisabled = false;
        console.log(this.$refs.audio.currentTime);
        console.log(this.$data);
        this.updateTime();
        // clearInterval(this.$store.state.id);
      }
    },
    //上一首
    previousTrack() {
      if (this.musicplayer.length === 0) {
        return false;
      } else {
        console.log(this.musicplayerDetail.id);
        this.$store.commit("subCount", this.musicplayerDetail.id);
        this.getMusicplayerCount();
      }
    },
    //下一首
    nextTrack() {
      if (this.musicplayer.length === 0) {
        return false;
      } else {
        console.log(this.musicplayerDetail.id);
        this.$store.commit("addCount", this.musicplayerDetail.id);
        this.getMusicplayerCount();
        console.log(this.musicplayer);
      }
    },
    getMusicplayerCount() {
      //当前歌单的第几首歌的数据
      this.musicPlayerListCount = parseInt(this.$store.state.musicPlayerCount);
      console.log(this.musicPlayerListCount);
      this.musicPlayer.forEach((item, index) => {
        if (this.musicPlayerListCount === index) {
          this.$store.dispatch("getMusicPlayerDetail", item);
          this.$store.dispatch(
            "getMusicPlayerCurrentDuration",
            this.savemusicplayercurrentDuration
          );
          this.emitPlayerListNum();
          this.reload();
        }
      });
    },
    //音乐列表
    liebiao() {
      console.log("liebiao");
      this.playerList = true;
      this.$nextTick(() => {
        this.playerlisttitleheight =
          this.$refs.PlayerListTitleHeight.offsetHeight;
        this.playerlisticonheight =
          this.$refs.PlayerListIconHeight.offsetHeight;
      });
    },
    //将当前歌曲的时间存入vuex
    updateTime() {
      this.$store.dispatch(
        "getMusicPlayerCurrentDuration",
        this.$refs.audio.currentTime
      );
    },
    //进度条开始拖动时
    moveStart() {
      this.isDrag = true;
    },
    //进度条结束拖动
    moveEnd() {
      this.isDrag = false;
    },
    //从audio获取当前歌曲的总时长及当前时长(未完成:自动播放下一首)
    musicDurationChange() {
      const audio = this.$refs.audio;
      audio.currentTime = this.musicDuration;
      audio.addEventListener("timeupdate", () => {
        //获取歌曲的总长度
        this.totalDuration = audio.duration;
        this.$store.dispatch(
          "getMusicPlayerTotalDuration",
          // this.$refs.audio.duration
          audio.duration
        );
        //获取当前歌曲时间
        if (!this.isDrag) {
          this.musicDuration = audio.currentTime;
          this.$store.dispatch(
            "getMusicPlayerCurrentDuration",
            // this.$refs.audio.currentTime
            audio.currentTime
          );
        }

        // 当前歌曲播放完毕自动播放下一首
        if (audio.currentTime >= audio.duration) {
          if (this.playerMode === 0) {
            console.log(this.playerMode);
            if (this.musicplayer.length > 0) {
              if (this.debace) {
                this.debace = false;
                this.nextTrack();
                setTimeout(() => {
                  this.debace = true;
                }, 500);
              }
            }
          }
          // audio有自带循环播放属性,所以下两行无效
          // else if (this.playerMode === 1) {
          // }
          else if (this.playerMode === 2) {
            if (this.debace) {
              this.debace = false;
              let length = this.musicplayer.length;
              let MusicCount = Math.floor(Math.random() * length);
              console.log(MusicCount);
              setTimeout(() => {
                this.debace = true;
              }, 500);
            }
          }
        }
      });
    },
    //点击播放器mini使播放器全屏
    showPlayerFull() {
      console.log("playerfull");
      this.playerMini = false;
      this.playerFull = true;
      this.$store.dispatch("getMusicPlayerMini", this.playerMini);
      this.$store.dispatch("getMusicPlayerFull", this.playerFull);
      // 在methods中获取Top和Bottom的高度的方法
      // this.$nextTick(() => {
      //   this.playerfulltopheight = this.$refs.PlayerFullTopHeight.offsetHeight;
      //   this.playerfullbottomheight =
      //     this.$refs.PlayerFullBottomHeight.offsetHeight;
      // });
    },
    //点击按钮恢复播放器mini
    showPlayerMini() {
      console.log("playermini");
      this.playerMini = true;
      this.playerFull = false;
      this.$store.dispatch("getMusicPlayerMini", this.playerMini);
      this.$store.dispatch("getMusicPlayerFull", this.playerFull);
    },
    //自动播放且播放按钮变换
    musicplayerLoad() {
      this.isAuto = true;
      this.paused = false;
    },
    //歌曲评论数
    getSongsCommentCount() {
      getSongsCommentCount(this.musicplayerDetail.id).then((res) => {
        const Count = res.total;
        this.emitCommentCount = res.total;
        if (Count < 10000) {
          this.commentCount = res.total;
        } else if (Count >= 10000) {
          this.commentCount = Math.floor(Count / 10000) + "w+";
        }
      });
    },
    //更改播放模式
    changePlayerMode() {
      const Mode = this.playerMode;
      if (Mode === 0) {
        this.playerMode = 1;
        this.$store.dispatch("getMusicPlayerMode", this.playerMode);
        this.isLoop = true;
        this.$toast("单曲循环");
      } else if (Mode === 1) {
        this.playerMode = 2;
        this.$store.dispatch("getMusicPlayerMode", this.playerMode);
        this.isLoop = false;
        this.$toast("随机播放");
      } else if (Mode === 2) {
        this.playerMode = 0;
        this.$store.dispatch("getMusicPlayerMode", this.playerMode);
        this.isLoop = false;
        this.$toast("列表循环");
      }
    },
    //音乐喜欢按钮
    musicLike() {
      //判断用户是否登录
      if (this.usertoken === null || undefined) {
        this.$router.push("/login");
      } else {
        if (this.like === true) {
          this.like = false;
          getUserLike(this.musicplayerDetail.id, true).then((res) => {
            console.log(res);
            if (res.code === 200) {
              getUserLikeSongs(this.userid).then((res) => {
                this.userLikeSongs = res.ids;
                this.$store.dispatch("getUserLikeSongsId", this.userLikeSongs);
              });
            }
          });
        } else if (this.like === false) {
          this.like = true;
          getUserLike(this.musicplayerDetail.id, false).then((res) => {
            if (res.code === 200) {
              getUserLikeSongs(this.userid).then((res) => {
                this.userLikeSongs = res.ids;
                this.$store.dispatch("getUserLikeSongsId", this.userLikeSongs);
              });
            }
          });
        }
      }
    },
    //音乐下载按钮
    musicDownload() {
      //判断用户是否登录
      if (this.usertoken == null || undefined) {
        this.$router.push("/login");
      } else {
      }
    },
    //音乐评论
    musicComment() {
      this.emitMusicOpenCommentNum();
      this.emitCommentNumber();
      this.emitMusicId();
      this.$router.push("/comment");
    },
    //播放列表的点击音乐
    listenMusic(index1) {
      // this.musicPlayerListCount = index1;
      // console.log(this.musicPlayerListCount);
      this.savemusicplayerDetail = this.musicplayer[index1];
      this.$store.dispatch("getMusicPlayerDetail", this.savemusicplayerDetail);
      this.$store.dispatch(
        "getMusicPlayerCurrentDuration",
        this.savemusicplayercurrentDuration
      );
      this.emitPlayerListNum();
      this.reload();
    },
    //发送此组件点击列表歌单中的任意一首歌的信号,本菜鸡暂无法解决自身组件传值
    emitPlayerListNum: debounce(function () {
      setTimeout(() => {
        this.ReloadNum2 = 1;
        this.$root.bus.$emit("emitReloadNum2", this.ReloadNum2);
      }, 20);
    }),
    //发送打开评论信号
    emitMusicOpenCommentNum: debounce(function () {
      setTimeout(() => {
        this.$root.bus.$emit("emitOpenCommentNum1", this.emitOpenCommentNumber);
      }, 20);
    }),
    //发送歌曲评论数
    emitCommentNumber: debounce(function () {
      setTimeout(() => {
        this.$root.bus.$emit("emitcommentCount", this.emitCommentCount);
      }, 20);
    }),
    //发送歌曲ID
    emitMusicId: debounce(function () {
      setTimeout(() => {
        this.$root.bus.$emit("emitmusicId", this.musicplayerDetail.id);
      }, 20);
    }),
    //播放列表音乐的删除按钮
    deleteMusic(index1) {
      this.$store.commit("delMusicPlayer", this.musicplayer[index1]);
    },
  },
  filters: {
    showSongNowtime(value) {
      return NowtimeFormat(value);
    },
  },
  beforeDestroy() {
    //组件销毁时解除事件绑定
    this.$root.bus.$off("emitReloadNum1");
    this.$root.bus.$off("emitReloadNum2");
    // this.$root.bus.$off("acceptminiplayerheight");
    // this.$root.bus.$off("emitMusicPlayerListCountNum");
  },
  destoryed() {
    this.playerMini = true;
    this.playerFull = false;
    this.$store.dispatch("getMusicPlayerMini", this.playerMini);
    this.$store.dispatch("getMusicPlayerFull", this.playerFull);
  },
};
</script>

<style scoped>
.player-music-img-play {
  animation: rotate 20s linear infinite;
  animation-play-state: running;
}

.player-music-img-pause {
  animation: rotate 20s linear infinite;
  animation-play-state: paused;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

.player-mini {
  width: 100%;
  height: 60px;
  background-color: #fff;

  /* position: fixed; */
  bottom: 0;
}

.player-mini-music-progress-bar >>> .van-slider--disabled {
  cursor: auto;
  opacity: 1;
}

.player-mini-music-info {
  height: 58px;
  display: flex;
  align-items: center;
}

.player-mini-music-info-img {
  float: left;
  margin-left: 8px;
}

.player-mini-music-info-img img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.player-mini-music-info-text {
  float: left;
  flex: 1;
  margin: 0 5px;
  /* width: 60%; */
}

.player-mini-music-info-text-songname {
  font-size: 15px;
  margin: 4px 0;
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

.player-mini-music-info-text-tips {
  color: #646566;
  font-size: 12px;
  margin: 4px 0;
}

.player-mini-music-icon {
  float: right;
  margin: 0 8px;
}

.player-mini-liebiao {
  margin: 0 8px;
}

.icon-bofang,
.icon-zanting,
.icon-liebiao {
  font-size: 30px;
  color: #4a4a4a;
}

.player-full {
  width: 100%;
  height: 100%;
}

.background {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: fixed;
  background-repeat: no-repeat;
  background-position: center;
  filter: blur(10px) brightness(60%);
  transform: scale(1.8);
  z-index: -1;
}

.player-full-top {
  height: 46px;
  display: flex;
  align-items: center;
  text-align: center;
}

.player-full-top-left {
  width: 10%;
}

.player-full-top-left-icon {
  font-size: 24px;
  /* z-index: 11; */
}

.player-full-top-title {
  flex: 1;
}

.player-full-top-title-songname {
  color: #fff;
  font-size: 15px;
  margin-bottom: 2px;
}

.player-full-top-title-singer {
  color: #4a4a4a;
  font-size: 13px;
}

.player-full-top-right {
  width: 10%;
}

.icon-fenxiang_2 {
  font-size: 24px;
  color: #fff;
}

.player-full-middle {
  width: 100%;
  height: calc(100% - 25% - 46px);

  display: flex;
  text-align: center;
  align-items: center;
}

.player-full-middle-music-img img {
  width: 70%;
  height: 70%;
  border-radius: 50%;
}

.player-full-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
}

.player-full-bottom-music-info-icon {
  width: 100%;
  padding: 15px 50px;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.player-full-bottom-music-progress-bar {
  width: 100%;
  display: flex;
  align-items: center;
}

.player-full-bottom-music-progress-bar span {
  margin: 0 10px;
}

.player-full-bottom-music-icon {
  width: 100%;
  padding: 15px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ..player-full-bottom-music-icon div {
  margin: 0 10px;
} */

.icon-xiazai,
.icon-sangediandian,
.icon-shunxubofang,
.icon-xunhuanbofang,
.icon-suijibofang,
.icon-shangyishou,
.icon-xiayishou {
  font-size: 26px;
}

.player-full-bottom-music-info-icon-pinglun >>> .van-info {
  background-color: unset;
  border: none;
}

.player-list {
  /* 让popup水平居中 popup宽度给了90%,剩下的10%,左右各自一半 */
  left: 5%;

  bottom: 10%;
  border-radius: 16px;
}

.player-list-title {
  font-size: 20px;
  font-weight: bolder;
  padding: 20px 15px 5px;
  text-align: left;
}

.player-list-icon {
  font-size: 14px;
  margin: 5px 15px;
}

.content {
  overflow: auto;
  position: absolute;
  top: var(--cover-height);
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 8px;
}

.content::-webkit-scrollbar {
  display: none;
}

.player-list-icon-playermode-icon {
  display: flex;
}

.player-list-icon-playermode-icon span {
  margin-left: 5px;
}

.player-list-music {
  margin: 15px 15px;
}

.player-list-music-info {
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.player-list-music-info-base {
  flex: 1;
  /* 文本过长时显示省略号 */
  /* 不溢出当前屏幕,即会自动换行的文字的css */
  /* display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical; */
  /* 溢出屏幕的文字,让自动换行的文字变成单行的css */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.player-list-music-info-base-symbol {
  color: #646566;
  font-size: 14px;
  margin: 0 5px;
}

.player-list-music-info-base-singer {
  color: #646566;
  font-size: 14px;
}

.player-list-music-info-icon {
  width: 45px;
  text-align: center;
}
</style>