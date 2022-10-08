<template>
  <div class="playlistheader" ref="PlayListInfoHeight">
    <div class="background" :style="Background"></div>
    <!-- { backgroundImage: 'url(' + this.playlistImages + ')', } -->
    <div class="content">
      <play-list-top></play-list-top>
      <div class="playlistheader-cover">
        <div class="playlistheader-cover-img">
          <img :src="this.playlistImages" alt="" />
          <div class="img-right">
            <van-icon name="service" color="white" />
            <span>{{
              this.playlistPlayCount >= 100000000
                ? (this.playlistPlayCount / 100000000).toFixed(0) + "亿"
                : this.playlistPlayCount >= 10000 &&
                  this.playlistPlayCount < 100000000
                ? (this.playlistPlayCount / 10000).toFixed(0) + "万"
                : this.playlistPlayCount
            }}</span>
          </div>
        </div>
        <div class="playlistheader-info">
          <span class="playlistheader-name">{{ this.playlistName }}</span>
          <div class="playlistheader-creator">
            <div class="playlistheader-creator-avatar">
              <img :src="this.playlistCreatorAvatar" alt="" />
            </div>
            <span class="playlistheader-creator-nickname">
              {{ this.playlistCreatorNickname }}
            </span>
          </div>
        </div>
      </div>
      <playlist-grid></playlist-grid>
      <div class="playlistmusicdata">
        <div class="playinfo">
          <div class="bofang">
            <div class="icon"><i class="iconfont icon-bofang"></i></div>
            <span>播放全部</span>&nbsp;
          </div>
          <div class="privilegecount">
            (共{{ this.playlistPrivilegeCount }}首)
          </div>
        </div>
        <div class="subscribedButton">
          <div><i>+ </i>收藏 ({{ this.playlistSubscribedCount }})</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayListTop from "components/common/top/playlist/PlayListTop";
import PlaylistGrid from "components/common/grid/PlaylistGrid";

import { getPlayList } from "network/playlist";

export default {
  name: "PlayListInfo",
  components: {
    PlayListTop,
    PlaylistGrid,
  },
  data() {
    return {
      playlistid: null,
      //歌单图片
      playlistImages: [],
      //歌单收听量
      playlistPlayCount: "",
      //歌单标题
      playlistName: "",
      //歌单创建者头像
      playlistCreatorAvatar: "",
      //歌单创建者名字
      playlistCreatorNickname: "",
      //歌单收藏人数
      playlistSubscribedCount: "",
      //歌单数量
      playlistPrivilegeCount: "",
      //歌单封面高度
      coverheight: "",
    };
  },
  // activated
  created() {
    //存入传入的id(写到activated最好)
    this.playlistid = this.$route.params.playlistid;

    getPlayList(this.playlistid).then((res) => {
      console.log(res);
      const playlistData = res.playlist;
      const playlistMusic = res.privileges;
      this.playlistImages = playlistData.coverImgUrl;
      this.playlistPlayCount = playlistData.playCount;
      this.playlistName = playlistData.name;
      this.playlistCreatorAvatar = playlistData.creator.avatarUrl;
      this.playlistCreatorNickname = playlistData.creator.nickname;
      this.playlistSubscribedCount = playlistData.subscribedCount;
      this.playlistPrivilegeCount = playlistMusic.length;
    });
  },
  activated() {
    this.coverheight = this.$refs.PlayListInfoHeight.offsetHeight;
    this.$root.bus.$emit("acceptcoverheight", this.coverheight);
  },
  computed: {
    Background() {
      let backgroundInfo =
        "height: " +
        this.coverheight +
        "px; background-image: url(" +
        this.playlistImages +
        ")";
      return backgroundInfo;
      // return {
      //   "--background-height": this.coverheight + "px",
      // };
    },
  },
};
</script>

<style scoped>
.background {
  width: 100%;
  /* height: var(--background-height); */
  float: left;
  /* background-image: var(--background-img); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(50px) brightness(60%);
  transform: scale(1.8);
  position: absolute;
  z-index: -1;
}

.playlistheader {
  /* 隐藏图片超出限定高度的部分 */
  overflow: hidden;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.playlistheader-cover {
  display: flex;
}

.playlistheader-cover-img {
  width: 140px;
  height: 140px;
}

.playlistheader-cover-img img {
  width: 110px;
  height: 110px;
  border-radius: 5px;
  /* 让图片垂直居中,若大div单独包含img则用display:flex */
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.img-right {
  font-size: 10px;
  position: absolute;
  top: 4.0625rem;
  left: 5rem;
}

.img-right span {
  color: #fff;

  padding-left: 0.125rem;
}

.playlistheader-info {
  flex: 1;
  margin: auto 0;
}

.playlistheader-name {
  display: block;

  margin: 0 0 15px;
  font-weight: bolder;
}

.playlistheader-creator-avatar {
  float: left;
  width: 40px;
}

.playlistheader-creator-avatar img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.playlistheader-creator-nickname {
  flex: 1;

  /* display: block; */
  font-size: 12px;
  color: #929292;
  height: 30px;
  line-height: 30px;
}

.playlistmusicdata {
  height: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  border-bottom: 1px solid #dcdcdc;
}

.playinfo {
  display: flex;
  align-items: center;
  height: 30px;
}

.icon {
  display: inline-block;
  width: calc(375.33px * 0.14);
  text-align: center;
}

.privilegecount {
  font-size: 12px;
  color: #929292;
  /* line-height: 30px; */
}

.subscribedButton {
  height: 100%;
  line-height: 40px;
  width: 35%;
  text-align: center;
  border-radius: 0 10px 0 0;
  background-color: var(--color-tint);
  color: #fff;
}

.subscribedButton i {
  color: #929292;
}
</style>